const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = require('../config').secret

blogsRouter.get('/', async (_, response) => {
    try {
        const blogs = await Blog
            .find({})
            .populate('user', { username: 1, name: 1 })
        response.json(blogs.map(Blog.format))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong' })
    }
})

blogsRouter.post('/', async (request, response) => {
    try {
        const token = request.token

        if (!token) {
            return response.status(401).json({ error: 'Token missing' })
        }

        const decodedToken = jwt.verify(token, secret)

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Token invalid' })
        }

        const user = await User.findById(decodedToken.id)
        const blog = new Blog({ ...request.body, user: user._id })

        if (!blog.title) {
            return response.status(400).json({ error: 'title missing' })
        }

        if (!blog.url) {
            return response.status(400).json({ error: 'url missing' })
        }

        if (!blog.likes) {
            blog.likes = 0
        }

        await blog.save()
        user.blogs = user.blogs.concat(blog._id)
        await user.save()

        const savedBlog = await Blog.findById(blog._id).populate('user', { username: 1, name: 1 })
        const formattedBlog = Blog.format(savedBlog)

        response.status(201).json(formattedBlog)
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong' })
        }
    }
})

blogsRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body

        const blog = {
            author: body.author,
            title: body.title,
            likes: body.likes,
            url: body.url,
            user: body.user,
            comments: body.comments
        }

        const updatedBlog = await Blog
            .findByIdAndUpdate(request.params.id, blog, { new: true })
            .populate('user', { username: 1, name: 1 })
        response.json(Blog.format(updatedBlog))
    } catch (exception) {
        console.log(exception)
        response.status(400).json({ error: 'malformed id' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        const token = request.token

        if (!token) {
            return response.status(401).json({ error: 'Token missing' })
        }

        const decodedToken = jwt.verify(token, secret)

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Token invalid' })
        }

        const blog = await Blog.findById(request.params.id)

        if (!blog || (blog.user && blog.user.toString() !== decodedToken.id.toString())) {
            return response.status(401).json({ error: 'Deletion not allowed' })
        }

        await Blog.findByIdAndRemove(request.params.id)

        response.status(204).end()
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(400).json({ error: 'malformatted id' })
        }
    }
})

blogsRouter.post('/:id/comments', async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (!blog) {
            return response.status(400).json({ error: 'blog not found' })
        }

        const comment = request.body.comment
        if (!comment) {
            return response.status(400).json({ error: 'comment must be provided' })
        }

        blog.comments = blog.comments.concat(comment)
        await blog.save()
        const savedBlog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
        const formattedBlog = Blog.format(savedBlog)

        response.status(201).json(formattedBlog)
    } catch (exception) {
        console.log(exception)
        response.status(400).json({ error: 'malformed id' })
    }
})

module.exports = blogsRouter
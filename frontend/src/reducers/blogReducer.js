import actionTypes from './actionTypes'
import BlogService from '../services/blogs'

const blogService = new BlogService()

export const retrieveBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: actionTypes.RETRIEVE_BLOGS,
            blogs
        })
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        const liked = await blogService.like(blog)
        dispatch({
            type: actionTypes.LIKE_BLOG,
            blog: liked
        })
    }
}

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        await blogService.deleteObj(blog)
        dispatch({
            type: actionTypes.DELETE_BLOG,
            blog
        })
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        const created = await blogService.create(blog)
        dispatch({
            type: actionTypes.CREATE_BLOG,
            blog: created
        })
    }
}

export const setToken = (token) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SET_TOKEN,
            token
        })
    }
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.LIKE_BLOG:
            const blogs = state.filter(b => b.id !== action.blog.id)
            return [...blogs, action.blog]
        case actionTypes.CREATE_BLOG:
            return [...state, action.blog]
        case actionTypes.DELETE_BLOG:
            return state.filter(b => b.id !== action.blog.id)
        case actionTypes.RETRIEVE_BLOGS:
            return action.blogs
        case actionTypes.PURGE_BLOGS:
            return []
        case actionTypes.SET_TOKEN:
            blogService.setToken(action.token)
            return state
        case actionTypes.UNSET_TOKEN:
            blogService.setToken(null)
            return state
        default:
            return state
    }
}

export default blogReducer

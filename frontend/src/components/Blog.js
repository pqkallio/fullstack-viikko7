import React from 'react'
import Togglable from './Togglable'
import BlogHelpers from '../utils/BlogHelpers'
import PropTypes from 'prop-types'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { notificate } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Blog = ({ user, likeBlog, deleteBlog, notificate, blog }) => {
  const formatBlog = () => {
    return BlogHelpers.formatBlogToString(blog)
  }

  const handleLike = async () => {
    try {
      likeBlog(blog)
      notificate('confirmation', `you liked blog ${formatBlog()}.`)
    } catch (exception) {
      console.log(exception)
      notificate('error', `unable to like blog ${formatBlog()}, please try again.`)
    }
  }

  const handleDelete = async () => {
    try {
      if (window.confirm(`delete ${formatBlog()}?`)) {
        deleteBlog(blog)
        notificate('confirmation', `${BlogHelpers.formatBlogToString(blog)} deleted`)
      }
    } catch (exception) {
      console.log(exception)
      notificate('error', `unable to delete blog ${formatBlog()}, please try again`)
    }
  }

  return (
    <Togglable
      className='blog blogHeader'
      type='div'
      toggleLabel={blog.author + ': ' + blog.title}
    >
      <p className='blog blogInfo'><a href={blog.url}>{blog.url}</a><br />
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'} <button onClick={handleLike}>like</button><br />
        added by {blog.user.name}<br />
        {!blog.user || blog.user.username === user.username ?
          <button onClick={handleDelete}>delete</button> :
          null
        }
      </p>
    </Togglable>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  notificate
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)

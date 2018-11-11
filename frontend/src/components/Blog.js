import React from 'react'
import Togglable from './Togglable'
import blogs from '../services/blogs'
import BlogHelpers from '../utils/BlogHelpers'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onException: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
  }

  formatBlog() {
    return BlogHelpers.formatBlogToString(this.props.blog)
  }

  handleLike = async () => {
    try {
      const response = await blogs.like(this.props.blog)
      this.props.onUpdate(response)
    } catch (exception) {
      console.log(exception)
      this.props.onException(exception, `unable to like blog ${this.formatBlog()}, please try again.`)
    }
  }

  handleDelete = async () => {
    try {
      if (window.confirm(`delete ${this.formatBlog()}?`)) {
        await blogs.deleteBlog(this.props.blog)
        this.props.onDelete(this.props.blog)
      }
    } catch (exception) {
      console.log(exception)
      this.props.onException(exception, `unable to delete blog ${this.formatBlog()}, please try again`)
    }
  }

  render() {
    const blog = this.props.blog

    return (
      <Togglable
        className='blog blogHeader'
        type='div'
        toggleLabel={blog.author + ': ' + blog.title}
      >
        <p className='blog blogInfo'><a href={blog.url}>{blog.url}</a><br/>
          {blog.likes} {blog.likes === 1 ? 'like' : 'likes'} <button onClick={this.handleLike}>like</button><br/>
          added by {blog.user.name}<br/>
          {!blog.user || blog.user.username === this.props.username ?
            <button onClick={this.handleDelete}>delete</button> :
            null
          }
        </p>
      </Togglable>
    )
  }
}

export default Blog
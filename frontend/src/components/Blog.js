import React from 'react'
import BlogHelpers from '../utils/BlogHelpers'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { notificate } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Blog extends React.Component {
  constructor() {
    super()

    this.state = {
      comment: ''
    }
  }

  formatBlog() {
    return BlogHelpers.formatBlogToString(this.props.blog)
  }

  async handleLike() {
    try {
      await this.props.likeBlog(this.props.blog)
      this.props.notificate('confirmation', `you liked blog ${this.formatBlog()}.`)
    } catch (exception) {
      console.log(exception)
      this.props.notificate('error', `unable to like blog ${this.formatBlog()}, please try again.`)
    }
  }

  async handleDelete() {
    try {
      if (window.confirm(`delete ${this.formatBlog()}?`)) {
        this.props.deleteBlog(this.props.blog)
        this.props.history.push('/')
        this.props.notificate('confirmation', `${this.formatBlog()} deleted`)
      }
    } catch (exception) {
      console.log(exception)
      this.props.notificate('error', `unable to delete blog ${this.formatBlog()}, please try again`)
    }
  }

  handleInput(event) {
    this.setState({ comment: event.target.value })
  }

  async handleCommenting(event) {
    event.preventDefault()
    try {
      await this.props.commentBlog(this.props.blog, this.state.comment)
      this.props.notificate('confirmation', `comment '${this.state.comment}' added to blog '${this.props.blog.title}'`)
      this.setState({ comment: '' })
    } catch (exception) {
      this.props.notificate('error', 'error commenting on blog, please try again')
    }
  }

  render() {
    if (this.props.blog) {
      return (
        <div>
          <h2>{this.props.blog.author + ': ' + this.props.blog.title}</h2>
          <p className='blog blogInfo'><a href={this.props.blog.url}>{this.props.blog.url}</a><br />
            {this.props.blog.likes} {this.props.blog.likes === 1 ? 'like' : 'likes'} <button onClick={this.handleLike.bind(this)}>like</button><br />
            added by <Link to={`/users/${this.props.blog.user._id}`}>{this.props.blog.user.name}</Link><br />
            {!this.props.blog.user || this.props.blog.user.username === this.props.user.username ?
              <button onClick={this.handleDelete.bind(this)}>delete</button> :
              null
            }
          </p>
          <h3>comments</h3>
          <ul>
            {this.props.blog.comments.map((c, i) =>
              <li key={i}>{c}</li>
            )}
          </ul>
          <form onSubmit={this.handleCommenting.bind(this)}>
            <input value={this.state.comment} onChange={this.handleInput.bind(this)} type="text" />
            <button type="submit" disabled={!this.state.comment}>add comment</button>
          </form>
        </div>
      )
    }

    return <div>Loading...</div>
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  commentBlog,
  notificate
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)

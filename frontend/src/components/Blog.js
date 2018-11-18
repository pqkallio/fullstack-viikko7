import React from 'react'
import BlogHelpers from '../utils/BlogHelpers'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { notificate } from '../reducers/notificationReducer'
import { initStore } from '../reducers/controlReducer'
import { connect } from 'react-redux'

class Blog extends React.Component {
  formatBlog() {
    return BlogHelpers.formatBlogToString(this.props.blog)
  }

  async componentWillMount() {
    if (this.props.storeIsInitialized) {
      await this.props.initStore()
    }
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
        this.props.notificate('confirmation', `${this.formatBlog()} deleted`)
      }
    } catch (exception) {
      console.log(exception)
      this.props.notificate('error', `unable to delete blog ${this.formatBlog()}, please try again`)
    }
  }

  render() {
    if (this.props.blog) {
      return (
        <div>
          <h2>{this.props.blog.author + ': ' + this.props.blog.title}</h2>
          <p className='blog blogInfo'><a href={this.props.blog.url}>{this.props.blog.url}</a><br />
            {this.props.blog.likes} {this.props.blog.likes === 1 ? 'like' : 'likes'} <button onClick={this.handleLike.bind(this)}>like</button><br />
            added by {this.props.blog.user.name}<br />
            {!this.props.blog.user || this.props.blog.user.username === this.props.user.username ?
              null :
              null
            }
          </p>
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
  notificate,
  initStore
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)

import { Button, Form, List, ListItem } from 'semantic-ui-react'
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
      this.props.notificate('positive', `you liked blog ${this.formatBlog()}.`)
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
        this.props.notificate('positive', `${this.formatBlog()} deleted`)
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
      this.props.notificate('positive', `comment '${this.state.comment}' added to blog '${this.props.blog.title}'`)
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
          <div className='blog blogInfo'><a href={this.props.blog.url}>{this.props.blog.url}</a><br />
            <div className='ui labeled button' tabIndex='0'>
              <div className='ui pink button' onClick={this.handleLike.bind(this)}>
                <i className='heart icon' /> Like
            </div>
              <span className='ui basic left pointing label'>
                {this.props.blog.likes} {this.props.blog.likes === 1 ? 'like' : 'likes'}
              </span>
            </div>
            <div>
              added by <Link to={`/users/${this.props.blog.user._id}`}>{this.props.blog.user.name}</Link>
            </div>
            {!this.props.blog.user || this.props.blog.user.username === this.props.user.username ?
              <div className='ui animated fade red inverted button' tabIndex='0' onClick={this.handleDelete.bind(this)}>
                <div className='visible content'>Delete</div>
                <div className='hidden content'>!!!</div>
              </div> :
              null
            }
          </div>
          <h3>comments</h3>
          <List>
            {this.props.blog.comments.map((c, i) =>
              <ListItem key={i}>{`"${c}"`}</ListItem>
            )}
          </List>
          <Form onSubmit={this.handleCommenting.bind(this)}>
            <input value={this.state.comment} onChange={this.handleInput.bind(this)} type="text" />
            <Button type="submit" disabled={!this.state.comment}>add comment</Button>
          </Form>
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

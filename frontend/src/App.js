import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogHelpers from './utils/BlogHelpers'
import { notificate } from './reducers/notificationReducer'
import { likeBlog, retrieveBlogs, setToken } from './reducers/blogReducer'
import { login, logout } from './reducers/sessionReducer'
import { connect } from 'react-redux'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  async componentDidMount() {
    if (this.props.user) {
      this.setBlogs()
      this.props.setToken(this.props.user.token)
    }
  }

  setBlogs = async () => {
    try {
      this.props.retrieveBlogs()
    } catch (exception) {
      console.log(exception)
      this.props.notificate('error', 'unable to retrieve blogs at the time, please try again')
    }
  }

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = async (event) => {
    event.preventDefault()

    try {
      await this.props.login(this.state.username, this.state.password)

      this.setState({
        username: '',
        password: '',
      })

      this.setBlogs()
      this.props.notificate('confirmation', `logged in as ${this.props.user.username}`)
    } catch (exception) {
      console.log(exception)
      this.props.notificate('error', 'username or password invalid')
    }
  }

  handleLogout = (event) => {
    event.preventDefault()

    this.props.logout()

    this.props.notificate('confirmation', 'successfully logged out')
  }

  handleException = (_, message) => {
    this.props.notificate('error', message)
  }

  render() {
    if (this.props.user === null) {
      return (
        <div>
          <h1>Blogs Blogs Blogs</h1>
          <Notification />
          <Togglable
            type='button'
            toggleLabel='log in'
            untoggleLabel='cancel'
          >
            <Login
              username={this.state.username}
              password={this.state.password}
              handleLoginFieldChange={this.handleLoginFieldChange}
              handleSubmit={this.handleLogin}
            />
          </Togglable>
        </div>
      )
    }

    return (
      <div>
        <h1>Blogs Blogs Blogs</h1>
        <Notification />
        <h2>blogs</h2>
        <p>{this.props.user.name} logged in <button onClick={this.handleLogout}>logout</button></p>
        <NewBlogForm />
        {this.props.blogs.sort(BlogHelpers.sort).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  notificate,
  retrieveBlogs,
  likeBlog,
  login,
  logout,
  setToken
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

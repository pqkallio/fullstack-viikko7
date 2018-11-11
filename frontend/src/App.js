import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogHelpers from './utils/BlogHelpers'
import { notificate } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import './index.css'

const LOCALSTORAGE_USER_KEY = 'loggedBlogappUser'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: ''
    }
  }

  async componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem(LOCALSTORAGE_USER_KEY)

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })

      this.setBlogs()

      blogService.setToken(user.token)
    } else {
      this.setState({ blogs: [] })
    }
  }

  setBlogs = async () => {
    try {
      const blogs = await blogService.getAll()
      blogs.sort(BlogHelpers.sort)

      this.setState({ blogs })
    } catch (exception) {
      console.log(exception)
      this.props.notificate('error', 'unable to retrieve blogs at the time, please try again')

      this.setState({ blogs: [] })
    }
  }

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem(LOCALSTORAGE_USER_KEY, JSON.stringify(user))
      this.setState({
        username: '',
        password: '',
        user
      })

      blogService.setToken(user.token)
      this.setBlogs()
      this.props.notificate('confirmation', `logged in as ${user.username}`)
    } catch (exception) {
      console.log(exception)
      this.props.notificate('error', 'username or password invalid')
    }
  }

  handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem(LOCALSTORAGE_USER_KEY)
    this.setState({ user: null, blogs: [] })

    this.props.notificate('confirmation', 'successfully logged out')
  }

  handleBlogCreation = (newBlog) => {
    const blogs = this.state.blogs.concat(newBlog)
    blogs.sort(BlogHelpers.sort)

    this.setState({
      blogs
    })

    this.props.notificate('confirmation', `a new blog '${newBlog.title}' by ${newBlog.author} added`)
  }

  handleException = (exception, message) => {
    this.props.notificate('error', message)
  }

  handleLike = (likedBlog) => {
    const blogs = this.state.blogs.map(blog =>
      blog.id === likedBlog._id ? { ...blog, likes: likedBlog.likes } : blog
    )
    blogs.sort(BlogHelpers.sort)

    this.setState({
      blogs
    })
  }

  handleDelete = (blog) => {
    const blogs = this.state.blogs.filter(b => b.id !== blog.id)

    this.setState({
      blogs
    })

    this.props.notificate('confirmation', `${BlogHelpers.formatBlogToString(blog)} deleted`)
  }

  render() {
    if (this.state.user === null) {
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
        <p>{this.state.user.name} logged in <button onClick={this.handleLogout}>logout</button></p>
        <NewBlogForm
          blogService={blogService}
          blogCreationCallback={this.handleBlogCreation}
          errorCallback={this.handleException}
        />
        {this.state.blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            onUpdate={this.handleLike}
            onException={this.handleException}
            onDelete={this.handleDelete}
            username={this.state.user.username}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  notificate
}

export default connect(null, mapDispatchToProps)(App);

import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import User from './components/User'
import BlogHelpers from './utils/BlogHelpers'
import { notificate } from './reducers/notificationReducer'
import { likeBlog, retrieveBlogs, setToken } from './reducers/blogReducer'
import { login, logout } from './reducers/sessionReducer'
import { retrieveUsers } from './reducers/userReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
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
      this.setUsers()
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

  setUsers = async () => {
    try {
      this.props.retrieveUsers()
    } catch (exception) {
      console.log(exception)
      this.props.notificate('error', 'unable to retrieve users at the time, please try again')
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
      this.setUsers()
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

  userById = (id) => this.props.users.find(u => u.id === id)

  loginSection = () => (
    <div>
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

  currentUserSection = () => (
    <div>
      {this.props.user.name} logged in <button onClick={this.handleLogout}>logout</button>
    </div>
  )

  blogSection = () => (
    <div>
      <h2>blogs</h2>
      <NewBlogForm />
      {this.props.blogs.sort(BlogHelpers.sort).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )

  userSection = () => (
    <div>
      <h2>users</h2>
      <table>
        <thead>
        </thead>
        <tbody>
          <tr>
            <th>name</th>
            <th>blogs added</th>
          </tr>
          {this.props.users.map(u =>
            <tr key={u.id}>
              <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )

  render() {
    return (
      <div>
        <Router>
          <div>
            <h1>Blogs Blogs Blogs</h1>
            <Notification />
            {!this.props.user && this.loginSection()}
            {this.props.user && this.currentUserSection()}
            {this.props.user && <Route exact path="/" render={() => this.blogSection()} />}
            {this.props.user && <Route exact path="/users" render={() => this.userSection()} />}
            {this.props.user &&
              <Route exact path="/users/:id" render={({ match }) => {
                window.localStorage.setItem('userId', match.params.id)
                return <User user={this.userById(match.params.id)} />
              }
              } />
            }
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  notificate,
  retrieveBlogs,
  likeBlog,
  login,
  logout,
  setToken,
  retrieveUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

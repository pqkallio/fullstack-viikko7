import { Container, Table, Button } from 'semantic-ui-react'
import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import User from './components/User'
import BlogHelpers from './utils/BlogHelpers'
import { notificate } from './reducers/notificationReducer'
import { likeBlog, setToken, retrieveBlogs } from './reducers/blogReducer'
import { login, logout } from './reducers/sessionReducer'
import { initStore } from './reducers/controlReducer'
import { retrieveUsers } from './reducers/userReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    async componentWillMount() {
        if (this.props.user) {
            this.props.retrieveBlogs()
            this.props.retrieveUsers()
            this.props.initStore()
            this.props.setToken(this.props.user.token)
        }
    }

    setBlogs = () => {
        try {
            this.props.retrieveBlogs()
        } catch (exception) {
            console.log(exception)
            this.props.notificate('error', 'unable to retrieve blogs at the time, please try again')
        }
    }

    setUsers = () => {
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
            this.props.notificate('positive', `logged in as ${this.props.user.username}`)
        } catch (exception) {
            console.log(exception)
            this.props.notificate('error', 'username or password invalid')
        }
    }

    async handleLogout(event) {
        event.preventDefault()

        this.props.logout()

        this.props.notificate('positive', 'successfully logged out')
    }

    handleException = (_, message) => {
        this.props.notificate('error', message)
    }

    resourceById = (rGroup, rid) => this.props[rGroup].find(r => r.id === rid)

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

    navigation = () => (
        <div>
            <Link to={'/'}>blogs</Link> &nbsp;
      <Link to={'/users'}>users</Link> &nbsp;
      {this.props.user.name} logged in <Button onClick={this.handleLogout.bind(this)}>logout</Button>
        </div>
    )

    blogSection = () => (
        <div>
            <h2>Blogs</h2>
            <NewBlogForm />
            <Table>
                <Table.Body>
                    {this.props.blogs.sort(BlogHelpers.sort).map(blog =>
                        <Table.Row key={blog.id}>
                            <Table.Cell><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )

    userSection = () => (
        <div>
            <h2>Users</h2>
            <Table striped celled>
                <Table.Body>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Blogs added</Table.HeaderCell>
                    </Table.Row>
                    {this.props.users.map(u =>
                        <Table.Row key={u.id}>
                            <Table.Cell><Link to={`/users/${u.id}`}>{u.name}</Link></Table.Cell>
                            <Table.Cell>{u.blogs.length}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )

    render() {
        return (
            <Container>
                <Router>
                    <div>
                        <h1>Blogs Blogs Blogs</h1>
                        <Notification />
                        {!this.props.user && this.loginSection()}
                        {this.props.user && this.navigation()}
                        {this.props.user && <Route exact path="/" render={() => this.blogSection()} />}
                        <Route exact
                            path="/users"
                            render={() =>
                                this.props.user ?
                                    this.userSection() :
                                    <Redirect to="/" />
                            }
                        />
                        <Route exact
                            path="/users/:id"
                            render={({ match }) =>
                                this.props.user ?
                                    <User
                                        user={this.resourceById('users', match.params.id)}
                                    /> :
                                    <Redirect to="/" />
                            }
                        />
                        <Route exact
                            path="/blogs/:id"
                            render={({ match, history }) =>
                                this.props.user ?
                                    <Blog
                                        history={history}
                                        blog={this.resourceById('blogs', match.params.id)}
                                    /> :
                                    <Redirect to="/" />
                            }
                        />
                    </div>
                </Router>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user,
        users: state.users,
        storeIsInitialized: state.storeIsInitialized
    }
}

const mapDispatchToProps = {
    notificate,
    likeBlog,
    login,
    logout,
    setToken,
    initStore,
    retrieveBlogs,
    retrieveUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

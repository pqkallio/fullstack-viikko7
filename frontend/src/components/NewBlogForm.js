import { Form, Button } from 'semantic-ui-react'
import React, { Component } from 'react'
import { notificate } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import Togglable from './Togglable'

class NewBlogForm extends Component {
    constructor() {
        super()

        this.state = {
            title: '',
            author: '',
            url: ''
        }
    }

    submittingEnabled() {
        return (
            this.state.title.length > 0 &&
            this.state.author.length > 0 &&
            this.state.url.length > 0
        )
    }

    async handleBlogSubmit(event) {
        event.preventDefault()

        try {
            const blog = {
                title: this.state.title,
                author: this.state.author,
                url: this.state.url
            }

            await this.props.createBlog(blog)
            this.props.notificate('positive', `a new blog '${blog.title}' by ${blog.author} added`)

            this.setState({
                title: '',
                author: '',
                url: ''
            })
        } catch (exception) {
            this.props.notificate('error', 'unable to save new blog at the time, please try again')
        }
    }

    async handleFormFieldChange(event) {
        event.preventDefault()
        await this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        return (
            <div>
                <Togglable className='blog-creation-form' type='button' toggleLabel='Create new' untoggleLabel='Hide'>
                    <Form onSubmit={this.handleBlogSubmit.bind(this)}>
                        <Form.Field>
                            <label>title</label>
                            <input
                                type='text'
                                name='title'
                                value={this.state.title}
                                onChange={this.handleFormFieldChange.bind(this)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>author</label>
                            <input
                                type='text'
                                name='author'
                                value={this.state.author}
                                onChange={this.handleFormFieldChange.bind(this)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>url</label>
                            <input
                                type='text'
                                name='url'
                                value={this.state.url}
                                onChange={this.handleFormFieldChange.bind(this)}
                            />
                        </Form.Field>
                        <Button type='submit' disabled={!this.submittingEnabled()}>create</Button>
                    </Form>
                </Togglable>
            </div>
        )
    }
}

const mapDispatchToProps = {
    notificate,
    createBlog
}

export default connect(null, mapDispatchToProps)(NewBlogForm)
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NewBlogForm extends Component {
    static propTypes = {
        blogService: PropTypes.object.isRequired,
        blogCreationCallback: PropTypes.func.isRequired,
        errorCallback: PropTypes.func.isRequired
    }
    
    constructor(props) {
        super(props)
        
        this.state = {
            title: '',
            author: '',
            url: '',
            submittingEnabled: false
        }
    }

    handleBlogSubmit = async (event) => {
        event.preventDefault()

        try {
            const blog = {
                title: this.state.title,
                author: this.state.author,
                url: this.state.url
            }
    
            const response = await this.props.blogService.create(blog)
            this.props.blogCreationCallback(response)
    
            this.setState({
                title: '',
                author: '', 
                url: '',
                submittingEnabled: false
            })
        } catch (exception) {
            this.props.errorCallback(exception, 'unable to save new blog at the time, please try again')
        }
    }

    handleFormFieldChange = async (event) => {
        event.preventDefault()
        await this.setState({
            [event.target.name]: event.target.value,
        })

        this.setState({
            submittingEnabled: 
                this.state.title.length > 0 && 
                this.state.author.length > 0 && 
                this.state.url.length > 0
        })
    }
    
    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.handleBlogSubmit}>
                    <table>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td>title</td>
                                <td>
                                    <input 
                                        type='text'
                                        name='title'
                                        value={this.state.title}
                                        onChange={this.handleFormFieldChange} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>author</td>
                                <td>
                                    <input 
                                        type='text'
                                        name='author'
                                        value={this.state.author}
                                        onChange={this.handleFormFieldChange} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>url</td>
                                <td>
                                    <input 
                                        type='text'
                                        name='url'
                                        value={this.state.url}
                                        onChange={this.handleFormFieldChange} 
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type='submit' disabled={!this.state.submittingEnabled}>create</button>
                </form>
            </div>
        );
    }
}

export default NewBlogForm;
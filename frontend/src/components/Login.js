import { Button } from 'semantic-ui-react'
import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ username, password, handleLoginFieldChange, handleSubmit }) => (
    <div className='loginFormContainer'>
        <h2>Log in to application</h2>
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor='username'>
                                username:
                            </label>
                        </td>
                        <td>
                            <input
                                type='text'
                                name='username'
                                id='username'
                                value={username}
                                onChange={handleLoginFieldChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='password'>
                                password:
                            </label>
                        </td>
                        <td>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                value={password}
                                onChange={handleLoginFieldChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <Button type='submit'>Login</Button>
        </form>
    </div>
)

Login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleLoginFieldChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default Login
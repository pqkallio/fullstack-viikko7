import React, { Component } from 'react';
import { connect } from 'react-redux'
import { initStore } from '../reducers/controlReducer'
import { Link } from 'react-router-dom'

class User extends Component {
    render() {
        if (this.props.user) {
            return (
                <div>
                    <h2>{this.props.user.name}</h2>
                    <h3>Added blogs</h3>
                    <ul>
                        {this.props.blogs.map(b =>
                            <li key={b.id}><Link to={`/blogs/${b.id}`}>{b.author}: {b.title}</Link></li>
                        )}
                    </ul>
                </div>
            );
        }

        return <div>Loading...</div>
    }
}

const mapStateToProps = (state, ownProps) => {
    let blogs = state.blogs && ownProps.user ? state.blogs.filter(b => b.user.username === ownProps.user.username) : null;
    return {
        users: state.users,
        blogs,
        storeIsInitialized: state.storeIsInitialized
    }
}

const mapDispatchToProps = {
    initStore
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
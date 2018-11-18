import React, { Component } from 'react';
import { connect } from 'react-redux'
import { initStore } from '../reducers/controlReducer'

class User extends Component {
    async componentWillMount() {
        if (this.props.storeIsInitialized) {
            await this.props.initStore()
        }
    }

    render() {
        if (this.props.user) {
            return (
                <div>
                    <h2>{this.props.user.name}</h2>
                    <h3>Added blogs</h3>
                    <ul>
                        {this.props.user.blogs.map(b =>
                            <li key={b._id}>{b.author}: {b.title}</li>
                        )}
                    </ul>
                </div>
            );
        }

        return <div>Loading...</div>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        storeIsInitialized: state.storeIsInitialized
    }
}

const mapDispatchToProps = {
    initStore
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
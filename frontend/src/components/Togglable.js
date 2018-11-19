import { Button } from 'semantic-ui-react'
import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Togglable extends Component {
    static propTypes = {
        className: PropTypes.string,
        type: PropTypes.string.isRequired,
        toggleLabel: PropTypes.string.isRequired,
        untoggleLabel: PropTypes.string
    }

    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }

        if (this.props.type === 'button') {
            return (
                <div className={this.props.className}>
                    <div style={hideWhenVisible}>
                        <Button onClick={this.toggleVisibility}>
                            {this.props.toggleLabel}
                        </Button>
                    </div>
                    <div style={showWhenVisible}>
                        {this.props.children}
                        <Button onClick={this.toggleVisibility}>
                            {this.props.untoggleLabel}
                        </Button>
                    </div>
                </div>
            );
        } else if (this.props.type === 'div') {
            return (
                <div className={this.props.className}>
                    <div className='toggleLabel' onClick={this.toggleVisibility}>
                        {this.props.toggleLabel}
                    </div>
                    <div className='togglableContent' style={showWhenVisible}>
                        {this.props.children}
                    </div>
                </div>
            )
        }

        return null
    }
}

export default Togglable;
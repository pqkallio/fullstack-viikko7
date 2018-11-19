import { Message } from 'semantic-ui-react'
import React from 'react';
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
    if (!notification.notificationType) {
        return (
            <Message hidden>
                .
            </Message>
        )
    }

    return (
        <Message className={notification.notificationType}>
            {notification.notification}
        </Message>
    );
};

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(mapStateToProps, null)(Notification);
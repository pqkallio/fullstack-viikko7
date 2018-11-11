import React from 'react';
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
    if (!notification.notificationType) {
        return (
            <div className='notification hiddenNotification'>
                .
            </div>
        )
    }

    return (
        <div className={'notification ' + notification.notificationType}>
            {notification.notification}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(mapStateToProps, null)(Notification);
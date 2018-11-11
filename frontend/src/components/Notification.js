import React from 'react';
import PropTypes from 'prop-types'

const Notification = ({ type, notification }) => {
    if (!type) {
        return (
            <div className='notification hiddenNotification'>
                .
            </div>
        )
    }

    return (
        <div className={'notification ' + type}>
            {notification}    
        </div>
    );
};

Notification.propTypes = {
    type: PropTypes.string,
    notification: PropTypes.string
}

export default Notification;
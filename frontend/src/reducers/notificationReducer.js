const actionTypes = {
    SET_NOTIFICATION: 'SET_NOTIFICATION',
    REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION'
}

export const notificate = (notificationType, notification) => {
    return async (dispatch) => {
        dispatch(setNotification(notificationType, notification))
        setTimeout(() => { dispatch(removeNotification()) }, 5000)
    }
}

export const setNotification = (notificationType, notification) => {
    return {
        type: actionTypes.SET_NOTIFICATION,
        notification,
        notificationType
    }
}

export const removeNotification = () => {
    return {
        type: actionTypes.REMOVE_NOTIFICATION
    }
}

const initialState = {
    notification: '',
    notificationType: ''
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NOTIFICATION:
            return {
                notification: action.notification,
                notificationType: action.notificationType
            }
        case actionTypes.REMOVE_NOTIFICATION:
            return {
                notification: '',
                notificationType: ''
            }
        default:
            return state
    }
}

export default notificationReducer

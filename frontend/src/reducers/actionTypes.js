const sessionActions = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
}

const blogActions = {
    CREATE_BLOG: 'CREATE_BLOG',
    DELETE_BLOG: 'DELETE_BLOG',
    LIKE_BLOG: 'LIKE_BLOG',
    RETRIEVE_BLOGS: 'RETRIEVE_BLOGS',
    PURGE_BLOGS: 'PURGE_BLOGS',
    SET_TOKEN: 'SET_TOKEN',
    UNSET_TOKEN: 'UNSET_TOKEN'
}

const notificationActions = {
    SET_NOTIFICATION: 'SET_NOTIFICATION',
    REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION'
}

const actions = {
    ...sessionActions,
    ...blogActions,
    ...notificationActions
}

export default actions;

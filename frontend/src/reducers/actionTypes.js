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

const userActions = {
    RETRIEVE_USERS: 'RETRIEVE_USERS',
    PURGE_USERS: 'PURGE_USERS'
}

const controlActions = {
    INIT_STORE: 'INIT_STORE'
}

const actions = {
    ...sessionActions,
    ...blogActions,
    ...notificationActions,
    ...userActions,
    ...controlActions
}

export default actions;

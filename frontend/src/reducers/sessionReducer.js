import loginService from '../services/login'
import actionTypes from './actionTypes'

const LOCALSTORAGE_USER_KEY = 'loggedBlogappUser'

export const login = (username, password) => {
    return async (dispatch) => {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem(LOCALSTORAGE_USER_KEY, JSON.stringify(user))
        dispatch({
            type: actionTypes.SET_TOKEN,
            token: user.token
        })
        dispatch({
            type: actionTypes.LOGIN,
            user
        })
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.UNSET_TOKEN
        })
        dispatch({
            type: actionTypes.PURGE_BLOGS
        })
        dispatch({
            type: actionTypes.LOGOUT
        })
        window.localStorage.removeItem(LOCALSTORAGE_USER_KEY)
    }
}

const initialState = () => {
    const loggedUserJSON = window.localStorage.getItem(LOCALSTORAGE_USER_KEY)

    if (loggedUserJSON) {
        return JSON.parse(loggedUserJSON)
    }

    return null
}

const sessionReducer = (state = initialState(), action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return action.user
        case actionTypes.LOGOUT:
            return null
        default:
            return state
    }
}

export default sessionReducer

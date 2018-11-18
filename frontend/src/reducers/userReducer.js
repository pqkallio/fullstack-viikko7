import actionTypes from './actionTypes'
import UserService from '../services/users'

const userService = new UserService()

export const retrieveUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({
            type: actionTypes.RETRIEVE_USERS,
            users
        })
    }
}

export const purgeUsers = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.PURGE_USERS
        })
    }
}

const userReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.RETRIEVE_USERS:
            return action.users
        case actionTypes.PURGE_USERS:
            return []
        default:
            return state
    }
}

export default userReducer

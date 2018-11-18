import { retrieveBlogs } from './blogReducer'
import { retrieveUsers } from './userReducer'
import actionTypes from './actionTypes'

export const initStore = () => {
    return async (dispatch) => {
        retrieveBlogs()
        retrieveUsers()
        dispatch({
            type: actionTypes.INIT_STORE
        })
    }
}

const controlReducer = (state = false, action) => {
    switch (action.type) {
        case actionTypes.INIT_STORE:
            return true
        default:
            return state
    }
}

export default controlReducer
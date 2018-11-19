import actionTypes from './actionTypes'

export const initStore = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.INIT_STORE
        })
    }
}

export const purgeStore = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.PURGE_STORE
        })
    }
}

const controlReducer = (state = false, action) => {
    switch (action.type) {
        case actionTypes.INIT_STORE:
            return true
        case actionTypes.PURGE_STORE:
            return false
        default:
            return state
    }
}

export default controlReducer
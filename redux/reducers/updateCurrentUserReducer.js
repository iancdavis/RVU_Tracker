import { UPDATE_CURRENT_USERID } from '../actions'

const initialState = {
    currentUserID: null
}

const updateCurrentUserReducer = (state = initialState, action) => {
    if (action.type === UPDATE_CURRENT_USERID) { 
        const {userid} = action.payload
        return {
            ...state,
            currentUserID: userid,
        }
    }
    return state
}

export default updateCurrentUserReducer

import {UPDATE_TOTAL_RVU} from '../actions'

const initialState = {
    rvuTotal: []
}

const updateTotalRVUReducer = (state = initialState, action) => {
    if (action.type === UPDATE_TOTAL_RVU) { 
        const {update} = action.payload
        return {
            ...state,
            rvuTotal: [...state.rvuTotal, update] ,
        }
    }
    return state
}

export default updateTotalRVUReducer
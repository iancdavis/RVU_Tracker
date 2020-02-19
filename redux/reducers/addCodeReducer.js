//NOT BEING USED IN CURRENT BUILD

import {UPDATE_CODE} from '../actions'

const initialState = {
    allIds: [],
    byIds: {},
    allCodesArr: [],
}

const addCodeReducer = (state = initialState, action) => {
    if (action.type === UPDATE_CODE) { 
        const {id, update} = action.payload
        return {
            ...state,
            allIds: [...state.allIds, id],
            byIds: {
                ...state.byIds,
                id: {
                    update,
                }   
            },
            allCodesArr: [...state.allCodesArr, update] 
        }
    }
    return state
}

export default addCodeReducer
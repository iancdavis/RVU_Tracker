import {ADD_PROCEDURE, REMOVE_PROCEDURE} from '../actions'
import { _retrieveUserid } from '../../api'



const initialState = {
    allProcedures: []
}

const updateProcedureReducer = (state = initialState, action) => {
    if (action.type === ADD_PROCEDURE) { 
        const {procedure} = action.payload
        procedure.date = new Date()
        procedure.user = _retrieveUserid()
        console.log(`user value in reducer ${JSON.stringify(procedure.user)}`)
        return {
            ...state,
            allProcedures: [...state.allProcedures, procedure],
        }
    }
    else if (action.type === REMOVE_PROCEDURE) {
        const {index} = action.payload
        return {
            ...state,
            allProcedures: [
                ...state.allProcedures.slice(0, index),
                ...state.allProcedures.slice(index + 1)
            ]  
        }
    }
    return state
}

export default updateProcedureReducer



/* user: {
    procedures: {
        allProcedures: {
            allProcedures[]...
        }
    }
} */
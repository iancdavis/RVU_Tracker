import {ADD_PROCEDURE, REMOVE_PROCEDURE} from '../actions'

const initialState = {
    userid: {
        allProcedures: []
    }
    
}

const updateProcedureReducer = (state = initialState, action) => {
    if (action.type === ADD_PROCEDURE) { 
        const {procedure} = action.payload
        procedure.date = new Date()
        procedure.user = action.payload.currentUserID
        let userid = action.payload.currentUserID
        console.log(`user value in reducer ${JSON.stringify(procedure.user)}`)
        //handling exception for first use where spread of undefined was causing error
        try {
            return {
                ...state, 
                [action.payload.currentUserID]: {
                        allProcedures: [...state[userid].allProcedures, procedure] 
                    }
            }
        } catch (error) {
            return {
                ...state, 
                [action.payload.currentUserID]: {
                            allProcedures: [procedure] 
                        }
            }   
        }
    }
    else if (action.type === REMOVE_PROCEDURE) {
        const {index} = action.payload
        const userid = action.payload.currentUserID
        return {
            ...state, 
            [action.payload.currentUserID]: {
                allProcedures: [
                    ...state[userid].allProcedures.slice(0, index),
                    ...state[userid].allProcedures.slice(index + 1)
                ] 
            } 
        }
    }
    return state
}

export default updateProcedureReducer

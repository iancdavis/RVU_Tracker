
// action types
export const UPDATE_CODE = 'UPDATE_CODE'
export const ADD_PROCEDURE = 'ADD_PROCEDURE'
export const UPDATE_TOTAL_RVU = 'UPDATE_TOTAL_RVU'
export const REMOVE_PROCEDURE = 'REMOVE_PROCEDURE'

export const UPDATE_CURRENT_USERID = 'UPDATE_CURRENT_USERID'


// action creators
let nextCodeId = 0

export const updateCode = update => (
    {
        type: UPDATE_CODE,
        payload: {
            update,
            id: ++nextCodeId,
        }
    }
)

let nextProcedureId = 0

export const addProcedure = (procedure, currentUserID) => (
    {
        type: ADD_PROCEDURE,
        payload: {
            procedure,
            id: ++nextProcedureId,
            currentUserID,
        },
    } 
)

export const updateTotalRVU = update => (
    {
        type: UPDATE_TOTAL_RVU,
        payload: {
            update,
        }
    }
)

export const removeProcedure = (index, currentUserID) => (
    {
        type: REMOVE_PROCEDURE,
        payload: {
            index,
            currentUserID,
        }
    }
)

export const updateCurrentUserid = userid => (
    {
        type: UPDATE_CURRENT_USERID,
        payload: {
            userid,
        }
    }
)
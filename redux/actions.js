import { _retrieveUserid } from '../api'


// action types
export const UPDATE_CODE = 'UPDATE_CODE'
export const ADD_PROCEDURE = 'ADD_PROCEDURE'
export const UPDATE_TOTAL_RVU = 'UPDATE_TOTAL_RVU'
export const REMOVE_PROCEDURE = 'REMOVE_PROCEDURE'

//auth action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

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

export const addProcedure = procedure => async dispatch => {
    try {
        const userid = await _retrieveUserid()
        dispatch({
            type: ADD_PROCEDURE,
            payload: {
                procedure,
                id: ++nextProcedureId,
                userid,
            },

        })
    } catch (err) {
        console.log(`err in actions.js addProcedure`)
    }
}

export const updateTotalRVU = update => (
    {
        type: UPDATE_TOTAL_RVU,
        payload: {
            update,
        }
    }
)

export const removeProcedure = index => (
    {
        type: REMOVE_PROCEDURE,
        payload: {
            index,
        }
    }
)
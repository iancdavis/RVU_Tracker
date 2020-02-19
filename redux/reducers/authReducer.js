//NOT BEING USED IN CURRENT BUILD

import { LOGIN_SUCCESS, LOGIN_FAIL } from '..actions.js'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
}


export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,

            }
        case LOGIN_FAIL:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,

            }
        default:
            return state
    }
}
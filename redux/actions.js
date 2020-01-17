// action types
export const UPDATE_CODE = 'UPDATE_CODE'

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
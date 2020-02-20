import { combineReducers } from 'redux'
import addCodeReducer from './addCodeReducer'
import updateProcedureReducer from './updateProcedureReducer'
import updateTotalRVUReducer from './updateTotalRVUReducer'
import updateCurrentUserReducer from './updateCurrentUserReducer'


const reducer = combineReducers({
    codes: addCodeReducer,
    procedure: updateProcedureReducer,
    totalRVU: updateTotalRVUReducer,
    currentUser: updateCurrentUserReducer,
})

export default reducer
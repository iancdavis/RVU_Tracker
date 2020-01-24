import { combineReducers } from 'redux'
import addCodeReducer from './addCodeReducer'
import updateProcedureReducer from './updateProcedureReducer'
import updateTotalRVUReducer from './updateTotalRVUReducer'


const reducer = combineReducers({
    codes: addCodeReducer,
    procedure: updateProcedureReducer,
    totalRVU: updateTotalRVUReducer,
})

export default reducer
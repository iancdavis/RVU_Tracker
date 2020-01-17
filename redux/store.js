import {createStore} from 'redux'

//import {updateCode} from './actions'
import reducer from './reducer'

//const initialState = {}

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )

//store.dispatch(updateCode({foo: 'foo'}))

export default store
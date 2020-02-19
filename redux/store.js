import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import reducer from './reducers'


const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const persistedReducer = persistReducer(persistConfig, reducer)


const store = createStore( persistedReducer, composeEnhancer(applyMiddleware(thunk)))

const persistor = persistStore(store)

const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
    return store.getState();
};

export {
    getStore,
    getState,
    getPersistor
};

export default {
    getStore,
    getState,
    getPersistor
}




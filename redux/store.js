import {createStore} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import reducer from './reducers'


const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducer)


const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )

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
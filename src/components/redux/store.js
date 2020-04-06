import {createStore, combineReducers} from 'redux'
import AdReducer from './reducers/adReducer'
import AuthReducer from './reducers/authReducer'

let reducers = combineReducers({AdReducer, AuthReducer});

let store = createStore(reducers)

export default store;
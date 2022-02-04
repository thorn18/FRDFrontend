import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import userReducer from './userReducer';

//creates the universal store by combining reducers
const store = createStore(combineReducers({
    userState: userReducer
}), applyMiddleware(thunk, logger));
//Logger automatically logs prev state, action, next state

export default store;
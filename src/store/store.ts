import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import postsReducer from './reducer';
import userReducer from './userReducer';

//creates the universal store by combining reducers
const store = createStore(combineReducers({
    postsState: postsReducer,
    userrState: userReducer
}), applyMiddleware(thunk, logger));
//Logger automatically logs prev state, action, next state

export default store;
import {combineReducers} from 'redux';
import createFeedModalClickReducer from './createFeedModalClickReducer'
import createFeedModalResponseReducer from './createFeedModalResponseReducer'

const rootReducer = combineReducers({
   createFeedModalClickReducer,
   createFeedModalResponseReducer,
});

export default rootReducer;
import {combineReducers} from 'redux';
import createFeedModalClickReducer from './createFeedModalClickReducer';
import createFeedModalResponseReducer from './createFeedModalResponseReducer';
import feedCommentModifyBtnClickReducer from './feedCommentModifyBtnClickReducer';

const rootReducer = combineReducers({
   createFeedModalClickReducer,
   createFeedModalResponseReducer,
   feedCommentModifyBtnClickReducer,
});

export default rootReducer;

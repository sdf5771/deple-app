import {combineReducers} from 'redux';
import createFeedModalClickReducer from './createFeedModalClickReducer';
import createFeedModalResponseReducer from './createFeedModalResponseReducer';
import feedCommentModifyBtnClickReducer from './feedCommentModifyBtnClickReducer';
import feedCommentDeleteBtnClickReducer from './feedCommentDeleteBtnClickReducer';

const rootReducer = combineReducers({
   createFeedModalClickReducer,
   createFeedModalResponseReducer,
   feedCommentModifyBtnClickReducer,
   feedCommentDeleteBtnClickReducer,
});

export default rootReducer;

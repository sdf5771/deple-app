function feedCommentModifyBtnClickReducer(currentState, action){
    if(currentState === undefined){
        return {isClick : false};
    }
    const newState = {...currentState};
    if(action.type === 'feedCommentModifyBtn click'){
        newState.isClick = true;
        newState.commentData = action.data;
    }

    return newState
}

export default feedCommentModifyBtnClickReducer;

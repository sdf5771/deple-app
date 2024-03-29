function feedCommentModifyBtnClickReducer(currentState, action){
    if(currentState === undefined){
        return {isClick : false};
    }
    const newState = {...currentState};

    switch (action.type){
        case 'feedCommentModifyBtn click true' :
            newState.isClick = true;
            newState.commentData = action.data;
            break;

        case 'feedCommentModifyBtn click false' :
            newState.isClick = false;
            break;
    }

    return newState
}

export default feedCommentModifyBtnClickReducer;

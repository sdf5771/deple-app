function feedCommentDeleteBtnClickReducer(currentState, action){
    if(currentState === undefined){
        return {isClick : false};
    }
    const newState = {...currentState};

    switch (action.type){
        case 'feedCommentDeleteBtn click true' :
            newState.isClick = true;
            newState.commentData = action.data;
            break;

        case 'feedCommentDeleteBtn click false' :
            newState.isClick = false;
            break;
    }

    return newState
}

export default feedCommentDeleteBtnClickReducer;

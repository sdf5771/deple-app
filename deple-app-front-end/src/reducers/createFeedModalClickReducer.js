function createFeedModalClickReducer(currentState, action){
    if(currentState === undefined){
        return {isClick : false};
    }
    const newState = {...currentState};
    if(action.type === 'CreateFeedInput click'){
        newState.isClick = true;
    } else if(action.type === 'CreateFeedModalBackground click'){
        newState.isClick = false;
    }
    return newState
}

export default createFeedModalClickReducer;
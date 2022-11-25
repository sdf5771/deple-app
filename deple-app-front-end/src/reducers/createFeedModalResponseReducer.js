function createFeedModalResponseReducer(currentState, action){
    console.log('currentState ', currentState);
    if(currentState === undefined){
        return {response : false, feed : []};
    }
    const newState = {...currentState};
    if(action.type === 'server response'){
        console.log('action.payload ', action.payload);
        newState.response = true;
        newState.feed = action.payload;
    }

    return newState
}

export default createFeedModalResponseReducer;
//this module imports all the action types then it exports the comments reducer. It takes the comments portion of the state and  initializes it with the default function parameters syntax, then it takes the action and depending on what that action is, it creates and returns a new state, or return the state unchanged.

import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        default:
            return state;
    }
};
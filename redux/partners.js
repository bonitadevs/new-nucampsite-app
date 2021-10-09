//this module imports all the action types then it exports the partners reducer. It takes the partners portion of the state and initializes it with the default function parameters syntax, then it takes the action and depending on what that action is, it creates and returns a new state, or return the state unchanged.

import * as ActionTypes from './ActionTypes';

export const partners = (state = { isLoading: true,
                                    errMess: null,
                                    partners: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PARTNERS:
            return {...state, isLoading: false, errMess: null, partners: action.payload};

        case ActionTypes.PARTNERS_LOADING:
            return {...state, isLoading: true, errMess: null, partners: []}

        case ActionTypes.PARTNERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};
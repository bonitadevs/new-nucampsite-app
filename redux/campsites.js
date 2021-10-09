//this module imports all the action types then it exports the campsites reducer. It takes the campsite portion of the state and  initializes it with the default function parameters syntax, then it takes the action and depending on what that action is, it creates and returns a new state, or return the state unchanged.

import * as ActionTypes from './ActionTypes';

export const campsites = (state = { isLoading: true,
                                     errMess: null,
                                     campsites: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};

        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []}

        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};
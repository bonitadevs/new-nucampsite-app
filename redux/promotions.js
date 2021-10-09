//this module imports all the action types then it exports the promotions reducer. It takes the promotions portion of the state and  initializes it with the default function parameters syntax, then it takes the action and depending on what that action is, it creates and returns a new state, or return the state unchanged.


import * as ActionTypes from './ActionTypes';

export const promotions = (state = { isLoading: true,
                                        errMess: null,
                                        promotions: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOTIONS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case ActionTypes.PROMOTIONS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []}

        case ActionTypes.PROMOTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};
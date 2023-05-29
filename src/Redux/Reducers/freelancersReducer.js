import { SET_FREELANCERS, SELECTED_FREELANCERS, REMOVE_SELECTED_FREELANCER } from '../Constants/ActionTypes';

const initialState = {
    freelancers: [],
    freelancer: {}
}

export const freelancersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FREELANCERS:
            return {
                ...state,
                freelancers: action.payload
            }

        case SELECTED_FREELANCERS:
            return {
                ...state,
                freelancer: action.payload
            }

        case REMOVE_SELECTED_FREELANCER:
            return {
                ...state,
                freelancer: {}
            }

        default:
            return state;
    }
}
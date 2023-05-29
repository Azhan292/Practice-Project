import { SET_JOBS, SELECTED_JOB, REMOVE_SELECTED_JOB } from '../Constants/ActionTypes';

const initialState = {
    jobs: [],
    job: {}
}

export const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_JOBS:
            return {
                ...state,
                jobs: action.payload
            }

        case SELECTED_JOB:
            return {
                ...state,
                job: action.payload
            }

        case REMOVE_SELECTED_JOB:
            return {
                ...state,
                job: {}
            }

        default:
            return state;
    }
}

import { SET_FREELANCERS, SELECTED_FREELANCERS, REMOVE_SELECTED_FREELANCER } from '../Constants/ActionTypes';

export const setFreelancers = (freelancers) => {
    return {
        type: SET_FREELANCERS,
        payload: freelancers
    }
}

export const selectedFreelancer = (freelancer) => {
    return {
        type: SELECTED_FREELANCERS,
        payload: freelancer
    }
}

export const removeSelectedFreelancer = () => {
    return {
        type: REMOVE_SELECTED_FREELANCER
    }
}
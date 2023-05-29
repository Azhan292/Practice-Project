import { SET_JOBS, SELECTED_JOB, REMOVE_SELECTED_JOB } from '../Constants/ActionTypes';

export const setJobs = (jobs) => {
    return {
        type: SET_JOBS,
        payload: jobs
    }
}

export const selectedJob = (job) => {
    return {
        type: SELECTED_JOB,
        payload: job
    }
}

export const removeSelectedJob = () => {
    return {
        type: REMOVE_SELECTED_JOB
    }
}
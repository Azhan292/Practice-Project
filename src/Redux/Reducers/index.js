import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { freelancersReducer } from './freelancersReducer';
import { jobsReducer } from './jobsReducer';

const allReducers = combineReducers({
    userReducer: userReducer,
    freelancersReducer: freelancersReducer,
    jobsReducer: jobsReducer,
});

export default allReducers;
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

// components
import Details from '../../../Components/Home/FreelancerDetails/Details';
import SignupForm from '../../../Components/Home/FreelancerDetails/SignupForm';

import './freelancerdetails.style.css';

// redux
import { useSelector } from 'react-redux';

const FreelancerDetails = () => {
    const history = useHistory();
    const freelancer = useSelector(state => state.freelancersReducer.freelancer);

    useEffect(() => {
        if(!freelancer.name) {
            console.log('No freelancer')
            history.push('/');
        }
    }, [])

    return (
        <div className="freelancer__details__page">
            <div id="details">
                <Details />
            </div>
            <div id="signup">
                <SignupForm />
            </div>
        </div>
    )
}

export default FreelancerDetails

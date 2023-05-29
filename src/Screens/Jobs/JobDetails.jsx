import React from 'react';

import Navbar from '../../Components/Headers/Navbar'
import Footer from '../../Components/Footer/Footer';
import Details from '../../Components/Jobs/JobDetails/Details';
import RatingListing from '../../Components/Jobs/JobDetails/RatingListing';

const JobDetails = () => {
    return (
        <div className="page">
            <Navbar menu={true} />
            <div className="container">
                <Details />
                <RatingListing />
            </div>
            <Footer />
        </div>
    )
}

export default JobDetails

import React from 'react';

// components
import JobReuestsListing from '../../Components/JobRequests/JobReuestsListing';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Headers/Navbar';

const JobRequests = () => {
    return (
        <div className="page">
            <Navbar menu={true} />
            <div className="container">
                <JobReuestsListing />
            </div>
            <Footer />
        </div>
    )
}

export default JobRequests

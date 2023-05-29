import React from 'react';

// components
import MyJobsListing from '../../../Components/Client/MyJobs/MyJobsListing';
import Footer from '../../../Components/Footer/Footer';
import Navbar from '../../../Components/Headers/Navbar';


const MyJobs = () => {
    return (
        <div className="page">
            <Navbar menu={true} />
            <div className="container">
                <MyJobsListing />
            </div>
            <Footer />
        </div>
    )
}

export default MyJobs

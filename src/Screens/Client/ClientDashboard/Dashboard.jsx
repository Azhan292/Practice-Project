import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// components
import IntroSec from '../../../Components/Client/Dashboard/IntroSec';
import OrdersListing from '../../../Components/Client/Dashboard/OrdersListing';
import Footer from '../../../Components/Footer/Footer';
import Navbar from '../../../Components/Headers/Navbar';

// redux
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const history = useHistory();
    const userType = useSelector(state => state.userReducer.userType)
    useEffect(() => {
        if(userType==='Freelancer') {
            history.push('/Jobs');
        }
    }, [])
    return (
        <div className="page">
            <Navbar menu={true} />
            <div className="container padding__main">
                <IntroSec />
                <OrdersListing />
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard

import React from 'react';

// components
import Navbar from '../../Components/Headers/Navbar';
import Footer from '../../Components/Footer/Footer';
import Paypal from '../../Components/Withdraw/Paypal';

const Withdraw = () => {
    return (
        <div className="page">
            <Navbar menu={true} />
            <div className="container main__section">
                <Paypal /> 
            </div>
            <Footer />
        </div>
    )
}

export default Withdraw
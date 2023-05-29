import React from 'react';

// components
import OrderForm from '../../../Components/Client/PlaceOrder/OrderForm'
import Footer from '../../../Components/Footer/Footer'
import Navbar from '../../../Components/Headers/Navbar'

const PlaceOrder = () => {
    return (
        <div className="page">
            <Navbar menu={true} />
            <div className="container">
                <OrderForm />
            </div>
            <Footer />
        </div>
    )
}

export default PlaceOrder

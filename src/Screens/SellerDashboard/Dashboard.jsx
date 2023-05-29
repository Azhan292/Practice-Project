import React, { useState } from "react";

// components
import IntroSec from "../../Components/Dashboard/IntroSec";
import OrdersListing from "../../Components/Dashboard/OrdersListing";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Headers/Navbar";

const Dashboard = () => {
  return (
    <div className="page">
      <Navbar menu={true} />
      <div className="padding__main container">
        <IntroSec />
        <OrdersListing />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

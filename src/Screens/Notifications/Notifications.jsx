import React from "react";

// components
import NotificationListing from "../../Components/Notifications/NotificationListing";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Headers/Navbar";

const Notifications = () => {
  return (
    <div className="page">
      <Navbar menu={true} />
      <div className="container">
        <NotificationListing />
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;

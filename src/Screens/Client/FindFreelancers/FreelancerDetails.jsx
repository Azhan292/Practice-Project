import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// components
import IntroSec from "../../../Components/Client/FindFreelancers/Details/IntroSec";
import Contact from "../../../Components/Client/FindFreelancers/Details/Contact";
import Review from "../../../Components/Client/FindFreelancers/Details/Review";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Headers/Navbar";

// redux
import { useSelector } from "react-redux";

const FreelancerDetails = () => {
  const history = useHistory();
  const userType = useSelector((state) => state.userReducer.userType);
  const freelancer = useSelector(
    (state) => state.freelancersReducer.freelancer
  );
  useEffect(() => {
    if (userType === "Freelancer") {
      history.push("/Jobs");
    }
  }, []);
  return (
    <div className="page">
      <Navbar menu={true} />
      <div className="container padding__main">
        <IntroSec freelancer={freelancer} />
        <Contact />
        <Review freelancer={freelancer} />
      </div>
      <Footer />
    </div>
  );
};

export default FreelancerDetails;

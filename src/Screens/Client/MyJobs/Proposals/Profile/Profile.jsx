import React from "react";
import { useParams } from "react-router-dom";

// firebase
import useFreelancerById from "../../../../../hooks/useFreelancerById";

// components
import IntroSec from "../../../../../Components/Client/FindFreelancers/Details/IntroSec";
import Footer from "../../../../../Components/Footer/Footer";
import Navbar from "../../../../../Components/Headers/Navbar";

const Profile = () => {
  const { freelancerId } = useParams();
  const { profileData } = useFreelancerById(freelancerId);

  return (
    <div className="page">
      <Navbar menu={true} />
      <div className="padding__main container">
        <IntroSec freelancer={profileData} />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

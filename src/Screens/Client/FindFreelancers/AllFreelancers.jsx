import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// style
import "./allfreelancers.style.css";

// redux
import { useSelector } from "react-redux";

// components
import Navbar from "../../../Components/Headers/Navbar";
import Footer from "../../../Components/Footer/Footer";
import Filter from "../../../Components/Client/FindFreelancers/Filter";
import FreelancersListing from "../../../Components/Client/FindFreelancers/FreelancersListing";
import Modal from "../../../Components/Client/FindFreelancers/Modal";

const AllFreelancers = () => {
  const history = useHistory();
  const userType = useSelector((state) => state.userReducer.userType);
  const [modal, setModal] = useState("");
  //   filter states
  const [freelancerLevel, setFreelancerLevel] = useState("");
  const [freelancerCategory, setFreelancerCategory] = useState("");

  const handleModal = () => {
    if (modal == "open") {
      setModal("");
      document.body.style.overflowY = "auto";
    } else if (modal == "") {
      setModal("open");
      document.body.style.overflowY = "hidden";
    }
  };

  useEffect(() => {
    if (userType === "Freelancer") {
      history.push("/Jobs");
    }
  }, []);

  return (
    <div className="page">
      <Navbar menu={true} />
      <div className="freelancers container padding__main">
        {/* <Filter
          setFreelancerLevel={setFreelancerLevel}
          setFreelancerCategory={setFreelancerCategory}
          freelancerCategory={freelancerCategory}
        /> */}
        <FreelancersListing
          handleModal={handleModal}
          modal={modal}
          freelancerLevel={freelancerLevel}
          freelancerCategory={freelancerCategory}
          setFreelancerLevel={setFreelancerLevel}
          setFreelancerCategory={setFreelancerCategory}
        />
      </div>
      <Modal
        modal={modal}
        handleModal={handleModal}
        setFreelancerLevel={setFreelancerLevel}
        setFreelancerCategory={setFreelancerCategory}
        freelancerCategory={freelancerCategory}
      />
      <Footer />
    </div>
  );
};

export default AllFreelancers;

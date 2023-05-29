import React, { useState } from "react";

// style
import "./jobs.style.css";

// components
import Navbar from "../../Components/Headers/Navbar";
import Footer from "../../Components/Footer/Footer";
import Filter from "../../Components/Jobs/Filter";
import JobsListing from "../../Components/Jobs/JobsListing";
import Modal from "../../Components/Jobs/Modal";
import RightBar from "../../Components/Jobs/RightBar";

const Jobs = () => {
  const [modal, setModal] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");

  const handleModal = () => {
    if (modal == "open") {
      setModal("");
      document.body.style.overflowY = "auto";
    } else if (modal == "") {
      setModal("open");
      document.body.style.overflowY = "hidden";
    }
  };

  return (
    <div className="page">
      <Navbar menu={true} />
      <div className="jobs special__container padding__main">
        <Filter
          categoryFilter={category}
          setCategoryFilter={setCategory}
          duration={duration}
          setDuration={setDuration}
        />
        <JobsListing
          handleModal={handleModal}
          categoryFilter={category}
          setCategoryFilter={setCategory}
          duration={duration}
          setDuration={setDuration}
        />
        <RightBar />
      </div>
      <Modal
        modal={modal}
        handleModal={handleModal}
        categoryFilter={category}
        setCategoryFilter={setCategory}
        duration={duration}
        setDuration={setDuration}
      />
      <Footer />
    </div>
  );
};

export default Jobs;

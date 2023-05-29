import React, { useEffect } from "react";
import TopBar from "../../Components/Home/TopBar";
import GetStarted from "../../Components/Home/GetStarted";
import Working from "../../Components/Home/Working";
import Signup from "../../Components/Home/Signup";
import FreelancerSlider from "../../Components/Home/FreelancerSlider";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <div className="background__color">
      <div class="effect-wrap">
        <div class="effect effect-1"></div>
        <div class="effect effect-2">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="effect effect-3">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <TopBar />
      <GetStarted />
      <FreelancerSlider />
      <Working />
      <Signup />
      <Footer />
    </div>
  );
};

export default Home;

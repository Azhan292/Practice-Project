import React, { useState, useEffect } from "react";
import "./profilesetup.style.css";

// redux
import { useSelector } from "react-redux";

// Components
import Navbar from "../../Components/Headers/Navbar";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/ProfileSetup/Sidebar";
import Category from "../../Components/ProfileSetup/Category";
import Languages from "../../Components/ProfileSetup/Languages";
import Resume from "../../Components/ProfileSetup/Resume";
import Overview from "../../Components/ProfileSetup/Overview";
import ProfilePhoto from "../../Components/ProfileSetup/ProfilePhoto";
import Address from "../../Components/ProfileSetup/Address";
import Phone from "../../Components/ProfileSetup/Phone";
import Experience from "../../Components/ProfileSetup/Experience";
import SubmitProfile from "../../Components/ProfileSetup/SubmitProfile";
import FullPageLoading from "../Loader/FullPageLoading";

const ProfileSetup = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [loading, setLoading] = useState(false);
  const [showSec, setShowSec] = useState("category");
  const [category, setCategory] = useState({
    cat: "",
    service: "",
    skill: "",
  });
  const [experience, setExperience] = useState({
    title: "",
    company: "",
    level: "",
    location: "",
    country: "",
  });
  const [resume, setResume] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [overview, setOverview] = useState({
    title: "",
    desc: "",
  });
  const [photo, setPhoto] = useState(null);
  const [address, setAddress] = useState({
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      if (user.personalInfo) {
        setCategory({ ...category, cat: user.personalInfo.developmentCate });
      }
      if (user.personalInfo) {
        setAddress({
          ...address,
          city: user.personalInfo.city,
          country: user.personalInfo.country,
          zipCode: user.personalInfo.postalCode,
        });
      }
      if (user.personalInfo && user.workingExpeirence) {
        setExperience({
          ...experience,
          level: user.personalInfo.experienceLevel,
          company: user.workingExpeirence.experienceCompany,
          country: user.workingExpeirence.experienceCountry,
          location: user.workingExpeirence.experienceLocation,
          title: user.workingExpeirence.experienceTitle,
        });
      }
      if (user.resume) {
        setResume(user.resume);
      }
      if (
        user.personalInfo &&
        user.personalInfo.languages &&
        user.personalInfo.languages.length > 0
      ) {
        setLanguages(user.personalInfo.languages);
      }
      if (user.personalInfo) {
        setPhone(user.personalInfo.phone);
      }
      if (user.profilePic) {
        setPhoto({ ...photo, url: user.profilePic });
      }
      if (user && user.about) {
        setOverview({ ...overview, desc: user.about });
      }
    }
  }, [user]);

  return loading ? (
    <FullPageLoading />
  ) : (
    <>
      <div className="page">
        <Navbar menu={false} />
        <div className="profile__setup">
          {showSec === "category" ? (
            <>
              <Sidebar showSec={showSec} setShowSec={setShowSec} />
              <Category
                setShowSec={setShowSec}
                category={category}
                setCategory={setCategory}
                loading={loading}
              />
            </>
          ) : (
            ""
          )}
          {showSec === "experience" ? (
            <>
              <Sidebar showSec={showSec} setShowSec={setShowSec} />
              <Experience
                setShowSec={setShowSec}
                experience={experience}
                setExperience={setExperience}
              />
            </>
          ) : (
            ""
          )}
          {showSec === "resume" ? (
            <>
              <Sidebar showSec={showSec} setShowSec={setShowSec} />
              <Resume
                setShowSec={setShowSec}
                resume={resume}
                setResume={setResume}
              />
            </>
          ) : (
            ""
          )}
          {showSec === "language" ? (
            <>
              <Sidebar showSec={showSec} setShowSec={setShowSec} />
              <Languages
                setShowSec={setShowSec}
                languages={languages}
                setLanguages={setLanguages}
              />
            </>
          ) : (
            ""
          )}
          {showSec === "overview" ? (
            <>
              <Sidebar showSec={showSec} setShowSec={setShowSec} />
              <Overview
                setShowSec={setShowSec}
                overview={overview}
                setOverview={setOverview}
              />
            </>
          ) : (
            ""
          )}
          {showSec === "photo" ? (
            <>
              <Sidebar showSec={showSec} setShowSec={setShowSec} />
              <ProfilePhoto
                setShowSec={setShowSec}
                photo={photo}
                setPhoto={setPhoto}
              />
            </>
          ) : (
            ""
          )}
          {showSec === "address" ? (
            <>
              <Sidebar showSec={showSec} setShowSec={setShowSec} />
              <Address
                setShowSec={setShowSec}
                address={address}
                setAddress={setAddress}
              />
            </>
          ) : (
            ""
          )}
          {showSec === "phone" ? (
            <>
              <Sidebar showSec={showSec} setShowSec={setShowSec} />
              <Phone
                setShowSec={setShowSec}
                phone={phone}
                setPhone={setPhone}
              />
            </>
          ) : (
            ""
          )}
          {showSec === "submit" ? (
            <SubmitProfile
              setShowSec={setShowSec}
              category={category}
              experience={experience}
              resume={resume}
              languages={languages}
              overview={overview}
              photo={photo}
              address={address}
              phone={phone}
              setLoading={setLoading}
            />
          ) : (
            ""
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProfileSetup;

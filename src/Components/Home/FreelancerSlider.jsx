import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./slider.style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// icons
import { FcBusinessman } from "react-icons/fc";

// firebase
import { db } from "../../firebase";

// loading
import Loading from "../../Screens/Loader/Loading";

// redux
// redux
import { useDispatch } from "react-redux";
import {
  selectedFreelancer,
  removeSelectedFreelancer,
} from "../../Redux/Actions/freelancersActions";

const FreelancerSlider = () => {
  const dispatch = useDispatch();
  const [freelancerData, setFreelancerData] = React.useState();
  const [loading, setLoading] = useState(false);

  var settings = {
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          initialSlide: 0,
        },
      },
    ],
  };

  const handleSelectedFreelancer = (freelancer) => {
    if (freelancer) {
      dispatch(selectedFreelancer(freelancer));
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(removeSelectedFreelancer());
    const getAllUsers = async () => {
      const freelancers = db.ref("FreelancerUsers").limitToFirst(10);
      freelancers.once("value", (snapshot) => {
        setFreelancerData([]);
        if (snapshot.exists()) {
          setFreelancerData(Object.values(snapshot.val()));
        }
        setLoading(false);
      });
    };
    getAllUsers();
  }, []);

  return (
    <div className="home__slider__area">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="medium__text">
            Find freelance talent to take on any project
          </h2>
          <div>
            <Slider {...settings}>
              {freelancerData &&
                freelancerData.length > 1 &&
                freelancerData.map((freelancer, index) => {
                  return (
                    <div id="home__slider__box" key={index}>
                      <div className="freelancer__intro__sec">
                        <div className="profile__img__sec">
                          <div id="img">
                            {freelancer && freelancer.profilePic ? (
                              <img
                                src={freelancer.profilePic}
                                alt="Freelancer"
                              />
                            ) : (
                              <FcBusinessman />
                            )}
                          </div>
                        </div>
                        <div className="name__sec">
                          <h1 className="medium__text">{freelancer.name}</h1>
                          <h2 className="small__text" id="skills">
                            {freelancer &&
                            freelancer.personalInfo &&
                            freelancer.personalInfo.developmentCate
                              ? freelancer.personalInfo.developmentCate
                              : "No Category defined"}
                          </h2>
                          <h3 className="small__text">
                            {freelancer &&
                            freelancer.personalInfo &&
                            freelancer.personalInfo.country
                              ? freelancer.personalInfo.country
                              : "Location not found"}
                          </h3>
                        </div>
                      </div>
                      <div className="view__profile__btn">
                        <Link
                          to={`/FreelancerDetails/${freelancer.name}`}
                          onClick={() => handleSelectedFreelancer(freelancer)}
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
};

export default FreelancerSlider;

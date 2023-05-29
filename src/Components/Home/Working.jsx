import React from "react";
import "./working.style.css";

// icons
import { MdWork } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { AiOutlineFileSearch, AiFillContacts } from "react-icons/ai";

// images
import DirectorImg from "../../Assets/Home/director.jpg";
import Logo from "../../Assets/Logo/logo.png";

const Working = () => {
  return (
    <>
      <div className="how__it__works">
        <div className="overlay"></div>
        <h2 className="medium__text">How it Works</h2>
        <div className="flex">
          <div className="how__it__works__box">
            <div className="icon">
              <FaUsers />
            </div>
            <div>
              <h3 className="small__text">
                <strong>1. Find best talent</strong>
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                dolorum accusantium perferendis numquam dolore impedit id iste
                officia hic nemo,
              </p>
            </div>
          </div>
          <div className="how__it__works__box">
            <div className="icon">
              <AiOutlineFileSearch />
            </div>
            <div>
              <h3 className="small__text">
                <strong>2. Search for work</strong>
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                dolorum accusantium perferendis numquam dolore impedit id iste
                officia hic nemo,
              </p>
            </div>
          </div>
          <div className="how__it__works__box">
            <div className="icon">
              <MdWork />
            </div>
            <div>
              <h3 className="small__text">
                <strong>3. Post a job (its free)</strong>
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                dolorum accusantium perferendis numquam dolore impedit id iste
                officia hic nemo,
              </p>
            </div>
          </div>
          <div className="how__it__works__box">
            <div className="icon">
              <AiFillContacts />
            </div>
            <div>
              <h3 className="small__text">
                <strong>4. Contact best freelancers</strong>
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                dolorum accusantium perferendis numquam dolore impedit id iste
                officia hic nemo,
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="director__intro">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <h4 className="small__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          recusandae mollitia fugiat dolore sequi in voluptates aliquam omnis
          illo nostrum culpa minima animi esse odio, cupiditate possimus
          doloremque consequuntur vero.
        </h4>
        <div className="flex">
          <div className="director__profile__img">
            <img src={DirectorImg} alt="Director" />
          </div>
          <div className="name">
            <h3 className="small__text">
              <strong>Suzana</strong>
            </h3>
            <h4 className="small__text">Director Of Content Experience</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Working;

import React, { useState } from "react";
import "./sidebar.style.css";

const Sidebar = ({ showSec, setShowSec }) => {
  return (
    <div className="dashboard__sidebar__sec">
      <ul className="sidebar__flex">
        <li
          className={showSec === "category" ? "active" : ""}
          onClick={() => setShowSec("category")}
        >
          Category
        </li>
        <li
          className={showSec === "experience" ? "active" : ""}
          onClick={() => setShowSec("experience")}
        >
          Experience
        </li>
        <li
          className={showSec === "resume" ? "active" : ""}
          onClick={() => setShowSec("resume")}
        >
          Resume
        </li>
        <li
          className={showSec === "language" ? "active" : ""}
          onClick={() => setShowSec("language")}
        >
          Languages
        </li>
        <li
          className={showSec === "overview" ? "active" : ""}
          onClick={() => setShowSec("overview")}
        >
          Overview
        </li>
        <li
          className={showSec === "photo" ? "active" : ""}
          onClick={() => setShowSec("photo")}
        >
          Profile Photo
        </li>
        <li
          className={showSec === "address" ? "active" : ""}
          onClick={() => setShowSec("address")}
        >
          Address
        </li>
        <li
          className={showSec === "phone" ? "active" : ""}
          onClick={() => setShowSec("phone")}
        >
          Phone
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

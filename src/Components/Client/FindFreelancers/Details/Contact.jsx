import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./contact.style.css";

// components
import InputField from "../../../TextInputs/InputField";
import TextArea from "../../../TextInputs/TextArea";
import NormalBtn from "../../../Buttons/NormalBtn";

// firebase
import { contactFreelancer } from "../../../../Apis/API";

const Contact = () => {
  const { freelancerId } = useParams();
  const [projectName, setProjectName] = useState(null);
  const [projectDetail, setProjectDetail] = useState(null);
  const [budget, setBudget] = useState(null);

  const handleSubmit = async (
    projectName,
    projectDetail,
    budget,
    freelancerId
  ) => {
    try {
      await contactFreelancer(projectName, projectDetail, budget, freelancerId);
      alert("Request sended");
      setProjectName("");
      setBudget("");
      setProjectDetail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="freelancer__contact">
      <h1 className="large__text">Contact to Seller, About your project</h1>
      <div id="line"></div>
      <h2 className="medium__text">
        <strong>Project Name</strong>
      </h2>
      <InputField
        type="text"
        placeholder="Project Name"
        value={projectName}
        handleChange={(e) => setProjectName(e.target.value)}
      />
      <h2 className="medium__text">
        <strong>Send a private message</strong>
      </h2>
      <TextArea
        placeholder="Hi Seller, I have noticed your profile and would like to offer you my project. We can discuss details via chat"
        value={projectDetail}
        handleChange={(e) => setProjectDetail(e.target.value)}
      />
      <h2 className="medium__text">
        <strong>Budget</strong>
      </h2>
      <InputField
        type="number"
        placeholder="$"
        value={budget}
        handleChange={(e) => setBudget(e.target.value)}
      />
      <NormalBtn
        value="Hire Me"
        handleSubmit={() =>
          handleSubmit(projectName, projectDetail, budget, freelancerId)
        }
      />
      <h2 className="small__text">
        By Clicking on the button you will agree our{" "}
        <Link to="/Terms">User Agreement</Link> and{" "}
        <Link to="/Privacy">Privacy Policy</Link>
      </h2>
    </div>
  );
};

export default Contact;

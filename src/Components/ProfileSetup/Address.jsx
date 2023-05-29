import React, { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

// Components
import InputField from "../TextInputs/InputField";
import SelectField from "../TextInputs/SelectField";
import NormalBtn from "../Buttons/NormalBtn";

const Address = ({ setShowSec, address, setAddress }) => {
  const handleNext = () => {
    setShowSec("phone");
  };
  const handlePrev = () => {
    setShowSec("photo");
  };
  const handleState = (e) => {
    setAddress({ ...address, state: e.target.value });
  };
  const handleCity = (e) => {
    setAddress({ ...address, city: e.target.value });
  };
  const handleZipCode = (e) => {
    setAddress({ ...address, zipCode: e.target.value });
  };
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setAddress({ ...address, country: value.label });
  };

  return (
    <div className="dashboard__sec">
      <h1 className="large__text">Address</h1>
      <h2 className="small__text">8/9</h2>
      <h3 className="small__text">
        <span>
          We will not show except country and city to clients. We respect your
          privacy.
        </span>
      </h3>
      <h4 className="medium__text">Country</h4>
      <Select
        options={options}
        // value={address.country}
        onChange={changeHandler}
      />
      <h4 className="medium__text">City</h4>
      <InputField
        type={"text"}
        placeholder={"City"}
        handleChange={handleCity}
        value={address.city}
      />
      <h4 className="medium__text">Zip Code</h4>
      <InputField
        type={"number"}
        placeholder={"123456"}
        handleChange={handleZipCode}
        value={address.zipCode}
      />
      <div id="btn__group">
        <NormalBtn value={"Prev"} handleSubmit={handlePrev} />
        <NormalBtn value={"Next"} handleSubmit={handleNext} />
      </div>
    </div>
  );
};

export default Address;

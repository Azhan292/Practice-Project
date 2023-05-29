import React from "react";
import "./searchinput.style.css";

// icons
import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = ({
  type,
  placeholder,
  handleChange,
  handleSearch,
  value,
}) => {
  return (
    <div id="search__input">
      <input
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
      <span onClick={handleSearch}>
        <AiOutlineSearch />
      </span>
    </div>
  );
};

export default SearchInput;

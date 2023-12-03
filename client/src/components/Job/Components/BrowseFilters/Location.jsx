import React, { useState, useRef, useEffect } from "react";
import countriesList from "../../../../assets/countries-data.json";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
function Location({ setLocationFilter }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [countries, setCountries] = useState(countriesList);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [inputValue, setInputValue] = useState(""); // Separate state for input value
  const inputRef = useRef(null);

  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleInputBlur = () => {
    // Wait for a short time before hiding the dropdown, allowing the click event on the dropdown to be captured first
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 100);
  };
  const handleResetInput = () => {
    setInputValue("");
    setLocationFilter("");
  };
  const handleLocationSelect = (selectedLocation) => {
    setSelectedCountry(selectedLocation);
    setInputValue(selectedLocation); // Update input value when a country is selected
    setLocationFilter(selectedLocation);
    setIsDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setInputValue(value);

    if (value.trim() === "") {
      // Handle the case when the input value becomes empty
      setSelectedCountry(""); // Reset the selected country
      setLocationFilter(""); // Reset the location filter
    } else {
      // Update the countries list based on the input value
      const filteredCountries = countriesList.filter((country) =>
        country.Name.toLowerCase().startsWith(value.toLowerCase())
      );
      setCountries(filteredCountries);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative inline-block  w-full " ref={inputRef}>
        {inputValue && (
          <button
            onClick={handleResetInput}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent max-[640px]:top-[18px]"
          >
            <MdOutlineCancel size={22} className="text-black" />
          </button>
        )}
        <input
          type="text"
          placeholder="Location"
          value={inputValue}
          onChange={handleInputChange}
          className={` ${
            inputValue
              ? "pl-10 w-full  min-[850px]:w-[200px] "
              : "w-full  min-[850px]:w-[100px]"
          } font-Poppins rounded-[2em] border-[1px] border-black/40 h-10 sm:h-12 px-4 text-[14px] sm:text-[16px] font-medium hover:bg-[#e1e1e1]`}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {/*         {inputValue ? (
          ""
        ) : (
          <FaChevronDown
            className={`absolute right-6 top-1/2 transform -translate-y-1/2 bg-transparent`}
          />
        )} */}
        <div
          className={`rolesfilter min-w-[200px] sm:min-w-[300px] w-fit border border-black absolute bg-white z-[99] overflow-y-scroll overflow-hidden max-h-[200px] h-fit text-[14px] sm:text-[16px] px-3 sm:rounded-l-3xl    ${
            isDropdownVisible ? "" : "hidden"
          }`}
        >
          {countries.map((country) => (
            <div
              key={country.Code}
              className="font-medium font-Poppins hover:bg-[#e1e1e1] px-2 py-2 sm:py-3 rounded-xl cursor-pointer border-b"
              onClick={() => handleLocationSelect(country.Name)}
            >
              {country.Name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Location;

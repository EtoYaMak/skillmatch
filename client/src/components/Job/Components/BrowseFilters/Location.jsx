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
    setInputValue(value); // Update input value when the user types
    const filteredCountries = countriesList.filter((country) =>
      country.Name.toLowerCase().startsWith(value.toLowerCase())
    );
    setCountries(filteredCountries);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative inline-block h-[40px] w-full " ref={inputRef}>
        {inputValue && (
          <button
            onClick={handleResetInput}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent"
          >
            <MdOutlineCancel size={22} className="text-black/60" />
          </button>
        )}
        <input
          type="text"
          placeholder="Location"
          value={inputValue}
          onChange={handleInputChange}
          className={` ${
            inputValue ? "pl-8 w-full  sm:w-[200px] " : "w-full  sm:w-[100px]"
          } font-Poppins rounded-[2em] border-[1px] h-12 px-4 text-[16px] font-medium hover:bg-[#e1e1e1]`}
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
          className={`rolesfilter w-full sm:w-[300px]  border border-black absolute bg-white z-[99] overflow-y-scroll overflow-hidden max-h-[25vh]  text-[16px] p-5 rounded-l-3xl  space-y-2  ${
            isDropdownVisible ? "" : "hidden"
          }`}
        >
          {countries.map((country) => (
            <div
              key={country.Code}
              className="font-medium font-Poppins hover:bg-[#e1e1e1] p-2 rounded-md cursor-pointer"
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

import React, { useState } from "react";
import categories from "../../../../assets/categories.json";
import countriesList from "../../../../assets/countries-data.json";
import { FaChevronDown } from "react-icons/fa";

function Location() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [countries] = useState(countriesList);

  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleInputBlur = () => {
    setIsDropdownVisible(false);
  };

  return (
    <>
      <div className="relative inline-block w-[150px] h-[40px] ">
        <input
          type="text"
          placeholder="Location"
          className="w-full font-Poppins rounded-[2em] border-[1px] h-12 px-4 text-[16px] font-medium hover:bg-[#e1e1e1]"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <FaChevronDown className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-transparent" />
        <div
          className={`rolesfilter w-[320px]  border border-black absolute bg-white z-[99] overflow-y-scroll overflow-hidden h-[400px] text-[16px] p-5 rounded-l-3xl  space-y-2  ${
            isDropdownVisible ? "" : "hidden"
          }`}
        >
          {countries.map((country) => (
            <option
              key={country.Code}
              value={country.Name}
              className="font-medium font-Poppins hover:bg-[#e1e1e1] p-2 rounded-md"
            >
              {country.Name}
            </option>
          ))}
        </div>
      </div>
    </>
  );
}

export default Location;

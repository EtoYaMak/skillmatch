import React, { useState } from "react";
import categories from "../../../../assets/categories.json";
import { FaChevronDown } from "react-icons/fa";

function SearchCat() {
  const [cats] = useState(Object.entries(categories));
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
          placeholder="Roles"
          className="w-full font-Poppins rounded-[2em] border-[1px] h-12 px-4 text-[16px] font-medium hover:bg-[#e1e1e1]"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <FaChevronDown className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-transparent" />
      </div>

      <div
        className={`rolesfilter w-[320px] scrollbar scrollbar-thumb-red-500 scrollbar-track-gray-300 scrollbar-thin border border-black absolute bg-white z-[99] overflow-y-scroll h-[400px] text-[16px] p-5 rounded-l-3xl  space-y-2  ${
          isDropdownVisible ? "" : "hidden"
        }`}
      >
        {cats.map(([key, value], index) => (
          <option
            key={index}
            value={key}
            className="font-medium font-Poppins hover:bg-[#e1e1e1] p-2 rounded-md"
          >
            {value}
          </option>
        ))}
      </div>
    </>
  );
}

export default SearchCat;

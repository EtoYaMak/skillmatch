import React, { useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

function PayRange() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(40);
  const dropdownRef = useRef(null);

  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleInputBlur = () => {
    setIsDropdownVisible(false);
  };

  const handleSliderChange = (event) => {
    setSliderValue(parseInt(event.target.value, 10));
  };

  const handleDropdownClick = (event) => {
    // Prevent closing the dropdown when clicking inside it
    event.stopPropagation();
  };

  return (
    <>
      <div className="relative inline-block w-[150px] h-[40px]">
        <input
          type="text"
          placeholder="Location"
          className="w-full font-Poppins rounded-[2em] border-[1px] h-12 px-4 text-[16px] font-medium hover:bg-[#e1e1e1]"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <FaChevronDown className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-transparent" />
        <div
          className={`w-[250px] h-[80px] absolute border border-black bg-white z-[99] overflow-hidden text-[16px] p-5 rounded-l-3xl space-y-2 ${
            isDropdownVisible ? "" : "hidden"
          }`}
          onClick={handleDropdownClick}
          ref={dropdownRef}
        >
          <span className="flex justify-between">
            <h1>Minimum</h1> <h1>{sliderValue}k/year</h1>
          </span>
          <input
            type="range"
            min={0}
            max={200}
            value={sliderValue}
            onChange={handleSliderChange}
            className="range hover:cursor-cell"
          />
        </div>
      </div>
    </>
  );
}

export default PayRange;

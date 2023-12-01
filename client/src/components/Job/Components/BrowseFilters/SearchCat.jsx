import React, { useState, useRef, useEffect } from "react";
import departmentsList from "../../../../assets/Departments.json";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

function SearchCat({ setCategoryFilter }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [departments, setDepartments] = useState(
    Object.values(departmentsList)
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState(""); // Separate state for input value
  const inputRef = useRef(null);

  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 100);
  };

  const handleResetInput = () => {
    setInputValue("");
    setCategoryFilter("");
  };

  const handleCategorySelect = (value) => {
    setInputValue(value);
    setCategoryFilter(
      Object.keys(departmentsList).find((key) => departmentsList[key] === value)
    );
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
      setInputValue("");
      setCategoryFilter("");
      setDepartments(Object.values(departmentsList)); // Reset the departments list
    } else {
      // Update the departments list based on the input value
      const filteredDepartments = Object.values(departmentsList).filter(
        (department) => department.toLowerCase().startsWith(value.toLowerCase())
      );
      setDepartments(filteredDepartments);
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
      <div className="relative inline-block w-full" ref={inputRef}>
        <input
          type="text"
          placeholder="Department"
          value={inputValue}
          onChange={handleInputChange}
          className={`w-full ${
            inputValue
              ? "pl-10 w-full min-[850px]:w-[220px]"
              : "w-full min-[850px]:w-[130px]"
          } font-Poppins rounded-[2em] border-[1px] border-black/40 h-10 sm:h-12 px-4 text-[14px] sm:text-[16px] font-medium hover:bg-[#e1e1e1] `}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {inputValue && (
          <button
            onClick={handleResetInput}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent max-[640px]:top-[18px] "
          >
            <MdOutlineCancel size={22} className="text-black" />
          </button>
        )}
        {/*         {inputValue ? (
          ""
        ) : (
          <FaChevronDown
            className={`absolute right-6 top-1/2 transform -translate-y-1/2 bg-transparent`}
          />
        )} */}

        <div
          className={`rolesfilter min-w-[300px] w-fit border border-black absolute bg-white z-[99] overflow-y-scroll overflow-hidden max-h-[200px] h-fit text-[14px] sm:text-[16px] px-3 sm:rounded-l-3xl ${
            isDropdownVisible ? "" : "hidden"
          }`}
        >
          {departments.map((department, key) => (
            <div
              key={key}
              className="font-medium font-Poppins hover:bg-[#e1e1e1] px-2 py-2 sm:py-3 rounded-xl cursor-pointer"
              onClick={() => handleCategorySelect(department, key)}
            >
              {department}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchCat;

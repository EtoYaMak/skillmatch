import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiExpandRightFill } from "react-icons/ri";
import countriesData from "../assets/countries-data.json";

function BrowseJobComponent({ job }) {
  const jobId = job._id;
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [selectedSkillIndex, setSelectedSkillIndex] = useState(-1);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleClick = () => {
    navigate(`/jobs/${jobId}`);
  };
  const handleSkill = () => {
    setShowDropdown(!showDropdown);
  };
  const skills = job.skills ? [...job.skills] : [];

  /*   const typeNames = job.type
    .map((type) => type.name.charAt(0).toUpperCase() + type.name.slice(1))
    .join(" · "); */
  // Find the country code based on a partial match of the country name
  const countryCode = countriesData.find(
    (country) => country.Name === job.country
  )?.Code;
  return (
    <div
      className="jobcomp  min-[640px]:px-4 px-3 py-3 max-[640px]:gap-2 my-4 h-fit sm:h-32 flex flex-col min-[600px]:flex-row items-center shadow-[0px_3px_8px_rgb(0,0,0,0.3)] hover:shadow-[0px_6px_7px_rgb(0,0,0,0.5)] rounded-2xl font-Poppin max-w-full hover:bg-[#fff] text-black hover:scale-[102%] duration-200 ease-in-out"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="flex flex-row flex-1 items-center sm:max-w-lg w-full">
        <div className="flex justify-center items-center max-w-fit ">
          <img
            src={job.logo}
            alt={job.company}
            className=" rounded-full w-[90px] shadow-[0_1px_5px_rgb(0,0,0,0.3)]"
          />
        </div>
        <div className="flex-1 min-[768px]:pl-6 pl-4 select-none ">
          <h1 className="font-Poppins min-[900px]:text-xl min-[768px]:text-lg text-lg font-bold w-fit">
            {job.position}
          </h1>
          <h1 className="font-Poppins text-md font-medium hover:underline">
            {job.company}
          </h1>
        </div>
      </div>
      <div className="flex  gap-1  items-center justify-center w-full flex-1 flex-row min-[760px]:flex-col">
        <div className="flex  gap-2  items-center justify-center flex-1">
          <div className="text-white min-w-max max-w-md w-full flex-1 flex items-center justify-center select-none">
            <h1 className="font-Poppins font-medium  py-1 text-xs sm:text-[12px] text-center w-fit bg-[#C83055] rounded-3xl  px-2">
              {job.city} ❍ {countryCode}
            </h1>
          </div>
          {/* Skills */}
          <div className="skills flex-1 pointer-events-none select-none ">
            <div className="bg-transparent flex flex-wrap items-center justify-center min-w-max gap-1 text-sm text-white">
              {!showDropdown &&
                skills.slice(0, 2).map((skill, index) => (
                  <span
                    key={index}
                    className={`font-Poppins text-xs sm:text-sm px-2 py-1 bg-[#3D4EE5] rounded-3xl ${
                      isHovered ? " " : " "
                    }`}
                    //onClick={handleSkill}
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div className=" text-white flex justify-center select-none px-2 hidden">
          <h1 className="my-auto p-2 px-4 bg-[#3D4EE5] w-fit rounded-3xl uppercase font-Poppins font-semibold">
            Apply
          </h1>
        </div>
      </div>
    </div>
  );
}

export default BrowseJobComponent;

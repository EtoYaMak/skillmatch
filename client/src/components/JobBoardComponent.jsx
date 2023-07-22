import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiExpandRightFill } from "react-icons/ri";

function JobBoardComponent({ job }) {
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

  return (
    <div
      className="main grid grid-cols-12 items-center sm:p-3 p-4 my-3 
     bg-[#fff] text-[#d0333c] shadow-[2px_4px_1px_0px_#d0333c] hover:bg-[#1c1f21] duration-300 ease-in-out rounded-md select-none hover:px-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Job Info */}
      <div
        className="col-span-12 md:col-span-5 flex items-center bg-transparent cursor-pointer w-full "
        onClick={handleClick}
      >
        <Link className="">
          <img
            src={job.logo}
            alt={job.company}
            className="bg-transparent w-24 h-24 rounded-full object-cover min-w-max"
          />
        </Link>
        <div className="ml-5 bg-transparent sm:w-5/6 w-fit">
          <h2 className="font-semibold text-xl sm:text-2xl bg-transparent tracking-wide text-center sm:text-start">
            {job.position}
          </h2>
          <h3
            className={`bg-inherit block cursor-pointer font-semibold text-lg tracking-wider ${
              isHovered
                ? "text-md font-bold rounded-md text-[#d4d7d7] "
                : "text-md font-bold rounded-md text-gray-500 "
            }`}
          >
            {job.company}
          </h3>
        </div>
      </div>

      {/* Skills */}
      <div className="skills col-span-8 w-fit md:col-span-4 bg-transparent">
        <div className="bg-transparent flex flex-wrap w-fit sm:flex-row gap-2">
          {!showDropdown &&
            skills.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                /*className="text-[#d4d7d7] bg-[#1c1f21] font-bold  p-2 rounded-md cursor-zoom-in" THIS*/
                className={` block cursor-pointer p-2 ${
                  isHovered
                    ? "text-md font-bold rounded-md text-[#d4d7d7] bg-[#d0333c] hover:bg-[#d4d7d7] hover:text-[#1c1f21] duration-300 ease-in-out"
                    : "text-md font-bold rounded-md text-white bg-[#1c1f21] duration-300 ease-in-out"
                }`}
                onClick={handleSkill}
              >
                {skill}
              </span>
            ))}
          {!showDropdown && skills.length > 2 && (
            <span
              className={`block cursor-pointer p-2 ${
                isHovered
                  ? "text-md font-bold rounded-md text-[#d4d7d7] bg-[#d0333c] hover:bg-[#2c3033] hover:text-[#d0333c] duration-300 ease-in-out"
                  : "text-md font-bold rounded-md text-white bg-[#1c1f21] duration-300 ease-in-out"
              }`}
              onClick={handleSkill}
            >
              <span
                className={`bg-transparent flex justify-center items-center gap-1
              ${isHovered ? "" : ""}`}
              >
                +{skills.length - 2}
                <RiExpandRightFill size={17} className="bg-transparent" />
              </span>
            </span>
          )}

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="bg-transparent flex flex-wrap w-fit gap-2 text-inherit duration-300 ease-in-out"
            >
              {skills.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className={` block cursor-pointer p-2 sm:mt-0  mt-2 ${
                    selectedSkillIndex === index
                      ? "text-md font-bold rounded-md text-white"
                      : "text-md font-bold  rounded-md text-white"
                  } ${
                    isHovered
                      ? "text-md font-bold rounded-md text-[#d4d7d7] bg-[#d0333c] hover:bg-[#d4d7d7] hover:text-[#1c1f21] duration-300 ease-in-out"
                      : "text-md font-bold rounded-md text-white bg-[#d0333c] hover:bg-[#d4d7d7] hover:text-[#1c1f21] duration-300 ease-in-out"
                  }`}
                  onClick={() =>
                    setTimeout(() => setSelectedSkillIndex(index), 1000)
                  }
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="col-span-4 md:col-span-3 bg-transparent cursor-default w-full md:w-full h-fit flex flex-wrap justify-end">
        <div className=" p-3 bg-transparent w-fit flex flex-col font-Inter">
          <p
            class="bg-transparent font-semibold text-lg tracking-normal "
            className={` block cursor-pointer ${
              isHovered
                ? "bg-transparent font-bold duration-300 ease-in-out text-lg tracking-normal "
                : "bg-transparent font-semibold text-lg tracking-normal text-[#1c1f21] "
            }`}
          >
            {job.location ? job.location : `${job.city}, ${job.country}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default JobBoardComponent;

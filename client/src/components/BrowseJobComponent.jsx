import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiExpandRightFill } from "react-icons/ri";
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

  return (
    <div
      className="main grid grid-cols-12 items-center p-3 md:p-4 my-3 font-Inter
     bg-[#1c1f21] text-[#d0333c]  shadow-[2px_4px_1px_0px_#d0333c] hover:bg-black/50 rounded-md select-none duration-300 ease-in-out hover:py-5"
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
            /* className="w-[70px] min-h-[70px] md:w-[70px] md:h-[70px] rounded-full bg-transparent" */
            className="bg-transparent w-24 h-24 rounded-full object-cover"
          />
        </Link>
        <div className="ml-5 bg-transparent md:w-4/6 w-fit">
          <h2
            className={`font-semibold text-xl sm:text-2xl bg-transparent tracking-wide ${
              isHovered
                ? "text-md font-bold rounded-md text-[#d4d7d7] "
                : "text-md font-bold rounded-md text-[#d0333c]"
            }`}
          >
            {job.position}
          </h2>
          {/*           <h2 className="font-semibold text-xl sm:text-2xl bg-transparent tracking-wide ">
            {job.position}
          </h2> */}
          <h3
            className={`bg-inherit block cursor-pointer font-semibold text-lg tracking-wider ${
              isHovered
                ? "text-md font-bold rounded-md text-[#d0333c] "
                : "text-md font-bold rounded-md text-zinc-200 "
            }`}
          >
            {job.company}
          </h3>
        </div>
      </div>

      {/* Skills */}
      <div className="skills col-span-8 w-fit md:col-span-4 bg-transparent ">
        <div className="bg-transparent flex flex-wrap w-fit sm:flex-row gap-2 ">
          {!showDropdown &&
            skills.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                /*className="text-[#d4d7d7] bg-[#1c1f21] font-bold  p-2 rounded-md cursor-zoom-in" THIS*/
                className={` block cursor-pointer p-2 duration-300 ease-in-out  ${
                  isHovered
                    ? "text-md font-bold rounded-md text-[#d4d7d7] bg-[#d0333c] hover:bg-[#d4d7d7] hover:text-[#1c1f21] "
                    : "text-md font-bold rounded-md text-white bg-black/25"
                }`}
                onClick={handleSkill}
              >
                {skill}
              </span>
            ))}
          {!showDropdown && skills.length > 2 && (
            <span
              className={`block cursor-pointer p-2 duration-300 ease-in-out ${
                isHovered
                  ? "text-md font-bold rounded-md text-[#d4d7d7] bg-black/25 hover:bg-[#2c3033] hover:text-[#fff]"
                  : "text-md font-bold rounded-md text-white bg-black/25"
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
              className="bg-transparent flex flex-wrap w-fit gap-2 text-inherit "
            >
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className={` block cursor-pointer p-2 sm:mt-0  mt-2 duration-300 ease-in-out ${
                    selectedSkillIndex === index
                      ? "text-md font-bold rounded-md text-white "
                      : "text-md font-bold  rounded-md text-white "
                  } ${
                    isHovered
                      ? "text-md font-bold rounded-md text-[#d4d7d7] bg-[#d0333c] hover:bg-[#d4d7d7] hover:text-[#1c1f21]"
                      : "text-md font-bold rounded-md text-white bg-[#d0333c] hover:bg-[#d4d7d7] hover:text-[#1c1f21]"
                  }`}
                  onClick={() => setSelectedSkillIndex(index)}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="col-span-4 md:col-span-3 bg-transparent cursor-default w-full md:w-full h-fit flex flex-wrap justify-end items-center">
        <div className=" p-3 bg-transparent w-fit flex flex-col ">
          <p className="bg-transparent font-semibold text-md sm:text-lg tracking-widest text-white/80">
            {job.location ? job.location : `${job.city}, ${job.country}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BrowseJobComponent;

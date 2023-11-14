import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiExpandRightFill } from "react-icons/ri";
import countriesData from "../assets/countries-data.json";
import { useSelector } from "react-redux";
import ApplyJobButton from "./level_2/ApplyJobButton";

function BrowseJobComponent({ job }) {
  const jobId = job._id;
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { SAuser } = useSelector((state) => state.SAuser);
  const { student } = useSelector((state) => state.students);
  const showRegisterButton = !student && !user && !SAuser;
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
      className="jobcomp  min-[640px]:px-4 px-3 py-3 max-[640px]:gap-2 my-4 h-fit sm:h-32 flex flex-col min-[600px]:flex-row items-center shadow-[0px_3px_8px_rgb(0,0,0,0.3)] rounded-2xl font-Poppin max-w-full hover:shadow-[0px_6px_7px_rgb(0,0,0,0.5)]
    hover:scale-[102%] duration-200 ease-in-out"
    >
      <div
        className="flex flex-row flex-1 items-center sm:max-w-lg w-full"
        onClick={handleClick}
      >
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
      <div className="flex flex-col gap-1 min-[640px]:flex-row items-center justify-center w-full flex-1">
        <div className="flex min-[640px]:flex-col gap-2 min-[768px]:flex-row items-center justify-center flex-1 scale-90 min-[350px]:scale-100">
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
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        </div>
        {/* Apply button */}
        {student && (
          <div className="text-white flex justify-end w-full sm:w-auto select-none px-2">
            <ApplyJobButton jobId={job._id} />
          </div>
        )}
        {showRegisterButton && (
          <Link
            to={"/register"}
            className="flex justify-center items-center w-fit ease-in-out duration-200 bg-black  uppercase font-Poppins  px-3 rounded-3xl py-2 text-white hover:text-white hover:scale-105 font-bold "
          >
            Apply
          </Link>
        )}
      </div>
    </div>
  );
}

export default BrowseJobComponent;

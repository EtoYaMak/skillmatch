import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import countriesData from "../assets/countries-data.json";
function FeaturedCardComp({ job }) {
  const jobId = job._id;
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [truncationWidth, setTruncationWidth] = useState(0); // State to store the truncation width

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleClick = () => {
    navigate(`/jobs/${jobId}`);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const skills = job.skills ? [...job.skills] : [];
  // Find the country code based on a partial match of the country name
  const countryCode = countriesData.find(
    (country) => country.Name === job.country
  )?.Code;

  const textRef = useRef(null);

  // Calculate the truncation width based on the width of the text element
  useEffect(() => {
    const calculateTruncationWidth = () => {
      if (textRef.current) {
        const maxWidth = textRef.current.offsetWidth;
        // Set X to a value based on maxWidth
        // You might want to subtract some pixels for padding/margin
        const newX = maxWidth - 20; // Adjust as needed
        setTruncationWidth(newX);
      }
    };

    calculateTruncationWidth();
    window.addEventListener("resize", calculateTruncationWidth);

    return () => {
      window.removeEventListener("resize", calculateTruncationWidth);
    };
  }, []);

  // Function to truncate the job position if it exceeds the truncation width
  const truncateJobPosition = (position, width) => {
    if (position.length > width) {
      return position.substring(0, width - 3) + "...";
    }
    return position;
  };

  return (
    <div className="flex flex-row h-36 shadow-[0px_4px_8px_rgb(0,0,0,0.3)] rounded-2xl font-Poppins p-2 m-4">
      <div className="flex justify-center items-center max-w-fit ">
        <img
          src={job.logo}
          alt={job.company}
          className=" rounded-full w-[70px] shadow-[0_1px_5px_rgb(0,0,0,0.3)]"
        />
      </div>
      <div className="flex-1 min-[768px]:pl-4 pl-2 select-none flex flex-col justify-center items-start ">
        <h1
          ref={textRef}
          className="font-Poppins font-bold w-full text-[16px] sm:text-[18px] pb-1 md:pb-0"
        >
          {truncateJobPosition(job.position, truncationWidth)}
        </h1>
        <h1 className="font-Poppins text-base font-medium flex flex-col gap-1">
          {job.company}
          {!showDropdown &&
            skills.slice(0, 1).map((skill, index) => (
              <span
                key={index}
                className={`font-Poppins text-sm text-white px-3 bg-[#3D4EE5] rounded-3xl ${
                  isHovered ? " " : " "
                }`}
                //onClick={handleSkill}
              >
                {skill}
              </span>
            ))}
        </h1>
      </div>
    </div>
  );
}
export default FeaturedCardComp;

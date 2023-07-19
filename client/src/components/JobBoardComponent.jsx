import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function JobBoardComponent({ job }) {
  const jobId = job._id;
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
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
  const langs = job.languages ? [...job.languages] : [];
  const skills = job.skills ? [...job.skills] : [];
  const typeNames = job.type
    .map((type) => type.name.charAt(0).toUpperCase() + type.name.slice(1))
    .join(" · ");

  return (
    <div className="grid grid-cols-12 items-center p-3 md:p-4 my-3 bg-[#f3eeeb] text-[#ee6555] shadow-[2px_4px_1px_0px_#f3900b] hover:bg-gray-900 hover: rounded-md ">
      <div
        className="col-span-12 md:col-span-5 flex items-center bg-transparent cursor-pointer w-full "
        onClick={handleClick}
      >
        <Link className="md:w-1/6 w-fit">
          <img
            src={job.logo}
            alt={job.company}
            /* className="w-[70px] min-h-[70px] md:w-[70px] md:h-[70px] rounded-full bg-transparent" */
            className="bg-transparent object-scale-down rounded-sm md:h-24 md:w-24 h-[90px] w-[90px]"
          />
        </Link>
        <div className="ml-5 bg-transparent md:w-4/6 w-fit">
          <h2 className="font-medium text-2xl bg-transparent">
            {job.position}
          </h2>
          <h3 className="text-lg text-gray-400 bg-transparent">
            {job.company}
          </h3>
        </div>
      </div>

      {/* Languages */}
      <div className="col-span-8 w-fit md:col-span-4 bg-transparent">
        <div className="bg-transparent flex flex-wrap w-fit sm:flex-row gap-2">
          {!showDropdown &&
            skills.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="text-white bg-[#ee6555] font-bold  p-2 rounded-md cursor-zoom-in"
                onClick={handleSkill}
              >
                {skill}
              </span>
            ))}
          {!showDropdown && skills.length > 2 && (
            <span
              className="text-[#fff] bg-[#ee6555] font-bold p-2 rounded-md cursor-pointer"
              onClick={handleSkill}
            >
              +{skills.length - 2}
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
                  className={` bg-[#F6A231] block cursor-pointer p-2 ${
                    selectedSkillIndex === index
                      ? "text-md font-bold rounded-md text-white"
                      : "text-md font-bold  rounded-md text-white"
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
      <div className="col-span-4 md:col-span-3 bg-transparent cursor-default w-full md:w-full h-fit flex flex-wrap justify-end">
        <div className=" p-3 bg-transparent w-fit">
          <p className="bg-transparent">{job.location}</p>
        </div>
      </div>
    </div>
  );
}

export default JobBoardComponent;

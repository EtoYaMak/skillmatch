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
    <div className="grid grid-cols-12 items-center p-4 md:py-4 mb-2 bg-zinc-900 text-sky-500 shadow-md shadow-slate-400 hover:bg-gray-700 hover:text-white rounded-md ">
      <div
        className="col-span-12 md:col-span-6 flex items-center bg-transparent cursor-pointer"
        onClick={handleClick}
      >
        <Link>
          <img
            src={job.logo}
            alt={job.company}
            className="w-[70px] h-[70px] md:w-[70px] md:h-[70px] rounded-full bg-transparent"
          />
        </Link>
        <div className="ml-5 bg-transparent">
          <h2 className="font-medium text-2xl bg-transparent">
            {job.position}
          </h2>
          <h3 className="text-lg text-gray-400 bg-transparent">
            {job.company}
          </h3>
        </div>
      </div>

      {/* Languages */}
      <div className="col-span-6 md:col-span-3 bg-transparent  ">
        <div className="bg-transparent flex flex-wrap w-fit sm:flex-row">
          {!showDropdown &&
            skills.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="text-white bg-blue-700 font-bold m-2 p-2 rounded-sm cursor-zoom-in"
                onClick={handleSkill}
              >
                {skill}
              </span>
            ))}
          {!showDropdown && skills.length > 2 && (
            <span
              className="text-white bg-blue-700 font-bold m-2 p-2 rounded-sm cursor-pointer"
              onClick={handleSkill}
            >
              +{skills.length - 2}
            </span>
          )}

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="bg-transparent flex flex-wrap w-fit gap-2 text-inherit p-2"
            >
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className={` bg-blue-700 block cursor-pointer ${
                    selectedSkillIndex === index
                      ? "text-md font-bold p-2 rounded-sm text-white"
                      : "text-md font-bold p-2 rounded-sm text-white"
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

      {/* Tools */}
      <div className="col-span-6 md:col-span-3 text-right bg-transparent cursor-default">
        <div className="tools p-8 bg-transparent">
          <p className="bg-transparent">{job.location}</p>
        </div>
      </div>
    </div>
  );
}

export default JobBoardComponent;

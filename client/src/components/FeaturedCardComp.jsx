import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function FeaturedCardComp({ job }) {
  const jobId = job._id;
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleClick = () => {
    navigate(`/jobs/${jobId}`);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className="mx-4 p-4 bg-white hover:bg-[#1c1f21]  shadow-[4px_6px_1px_0px_#d0333c] hover:shadow-[4px_6px_1px_0px_#17eb07] my-4 rounded-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cards */}
      <div
        className="cards flex h-[90px] overflow-hidden bg-transparent  items-center rounded-md"
        onClick={handleClick}
      >
        <div className="flex w-full items-center bg-transparent">
          <Link className="ml-1 py-2 flex justify-center">
            <img
              src={job.logo}
              alt={job.company}
              className="bg-transparent w-24 h-24 rounded-full object-cover"
            />
          </Link>
          <div className="ml-2 bg-transparent w-3/4">
            <h2 className="font-semibold text-2xl bg-transparent tracking-wide">
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
      </div>
    </div>
  );
}
export default FeaturedCardComp;

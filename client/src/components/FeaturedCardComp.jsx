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
      className="mx-4 p-4  bg-black/80 hover:bg-[#1c1f21]  shadow-[4px_6px_1px_0px_#d0333c] hover:shadow-[4px_6px_1px_0px_#17eb07] my-4 rounded-md duration-200 ease-in-out"
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
              className="w-24 h-24 rounded-full object-cover bg-black"
            />
          </Link>
          <div className="ml-2 bg-transparent w-3/4">
            <h2
              className={`bg-inherit block cursor-pointer font-semibold text-2xl tracking-wider ${
                isHovered
                  ? "text-md font-bold rounded-md text-[#17eb07] ease-in-out duration-200"
                  : "text-md font-bold rounded-md text-[#d0333c] "
              }`}
            >
              {job.position}
            </h2>
            <h3
              className={`bg-inherit block cursor-pointer font-semibold text-lg tracking-wider ${
                isHovered
                  ? "text-md font-bold rounded-md text-white ease-in-out duration-500"
                  : "text-md font-bold rounded-md text-white/90 "
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

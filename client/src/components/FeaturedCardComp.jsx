import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="bg-transparent rounded-sm">
          <img
            src={job.logo}
            alt={job.company}
            className="object-scale-down w-24 h-24 rounded-sm bg-transparent"
          />
        </div>

        <div className="w-full pl-4 lg:pl-4 md:pl-0 bg-transparent flex flex-col h-full justify-center items-center">
          <p
            className={`w-full font-extrabold text-2xl bg-transparent tracking-wide flex-wrap  ${
              isHovered ? " text-[#d0333c]" : " text-[#d0333c]"
            }`}
          >
            {job.position}
          </p>
          <p /* className="w-full font-light text-lg bg-transparent " */
            className={`w-full font-semibold text-lg bg-transparent tracking-wider  ${
              isHovered ? " text-[#d4d7d7]" : " text-gray-500"
            }`}
          >
            {job.company}
          </p>
        </div>
      </div>
    </div>
  );
}
export default FeaturedCardComp;

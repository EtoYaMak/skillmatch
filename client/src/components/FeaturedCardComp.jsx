import React from "react";
import { Link } from "react-router-dom";

function FeaturedCardComp({ job }) {
  return (
    <div className="mx-2 p-4 bg-[#f3eeeb] rounded-md shadow-[2px_4px_1px_0px_#ee6555] mb-4">
      {/* Cards */}
      <div className="cards flex h-[90px] overflow-hidden bg-transparent  items-center">
        <div className="bg-transparent">
          <img
            src={job.logo}
            alt={job.company}
            className="object-scale-down w-24 h-24 rounded-sm bg-transparent"
          />
        </div>

        <div className="w-full pl-4 lg:pl-4 md:pl-0 bg-transparent flex flex-col h-full justify-evenly items-center">
          <p className="w-full font-extrabold text-xl bg-transparent text-[#ee6555]">
            {job.position}
          </p>
          <p className="w-full font-light text-lg bg-transparent text-zinc-800">
            {job.company}
          </p>
        </div>
      </div>
    </div>
  );
}
export default FeaturedCardComp;

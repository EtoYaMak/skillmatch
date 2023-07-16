import React from "react";
import { Link } from "react-router-dom";

function FeaturedCardComp({ job }) {
  return (
    <div className="mx-2 p-4 border bg-zinc-900  border-zinc-400 shadow-zinc-400/20 rounded-md hover:bg-blue-900 hover:text-white ">
      {/* Cards */}
      <div className="cards flex h-[90px] overflow-hidden bg-transparent  items-center">
        <div className="w-1/2 bg-transparent">
          <img
            src={job.logo}
            alt={job.company}
            className="rounded-full w-[90px] h-[90px] bg-transparent"
          />
        </div>

        <div className="w-full pl-4 lg:pl-4 md:pl-0 bg-transparent flex flex-col h-full justify-evenly items-center">
          <p className="w-full font-extrabold text-xl bg-transparent text-zinc-300">
            {job.position}
          </p>
          <p className="w-full font-light text-lg bg-transparent text-zinc-500">
            {job.company}
          </p>
        </div>
      </div>
    </div>
  );
}
export default FeaturedCardComp;

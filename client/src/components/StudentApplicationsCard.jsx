import React from "react";

const StudentApplicationsCard = ({ job, status }) => {
  return (
    <div className="cards flex h-[110px] w-1/2 mx-auto overflow-hidden bg-[#222]  items-center rounded-md  p-3">
      <div className="flex w-full items-center bg-transparent">
        <h1 className="ml-1 py-2 flex justify-center">
          <img
            src={job.logo}
            alt={job.company}
            className="bg-transparent w-24 h-24 rounded-full object-cover"
          />
        </h1>
        <div className="ml-2 bg-transparent w-3/5 flex flex-col items-start">
          <h2 className="bg-inherit block cursor-pointer font-semibold text-2xl tracking-wider text-[#d0333c]">
            {job.position}
          </h2>
          <h2 className="bg-inherit block cursor-pointer font-semibold text-lg tracking-wider text-[#fff]">
            {job.company}
          </h2>
        </div>
        <div className="mx-2 bg-transparent w-2/6 flex flex-col items-end">
          <h2 className="bg-inherit block cursor-pointer font-semibold text-2xl tracking-wider text-[#d0333c]">
            Application Status
          </h2>
          <h2 className="bg-inherit block cursor-pointer font-semibold text-lg tracking-wider text-[#fff]">
            {status}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default StudentApplicationsCard;

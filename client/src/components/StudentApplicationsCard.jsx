import React from "react";

const StudentApplicationsCard = ({ job, status }) => {
  return (
    <div className=" bg-white shadow-[0px_4px_8px_rgb(0,0,0,0.3)] rounded-3xl  items-center  p-3 font-Poppins">
      <div className="flex w-full bg-transparent">
        <div className="flex justify-center items-center max-w-fit ">
          <img
            src={job.logo}
            alt={job.company}
            className=" rounded-full w-[90px] shadow-[0_1px_5px_rgb(0,0,0,0.3)]"
          />
        </div>
        <div className="text-black w-full">
          <div className="flex-1 min-[768px]:pl-3 pl-2 select-none items-start text-start ">
            <h1 className="font-Poppins min-[900px]:text-xl min-[768px]:text-lg text-lg font-bold w-fit">
              {job.position}
            </h1>
            <h1 className="text-start font-Poppins text-md font-medium hover:underline">
              {job.company}
            </h1>
          </div>
          <div className="mx-2 bg-transparent  flex flex-col items-end font-Poppins">
            <h2 className="bg-inherit block cursor-pointer font-bold text-lg  text-[#000]">
              Application Status
            </h2>
            <h2 className="bg-inherit block cursor-pointer  font-Poppins text-[#000]">
              {status}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentApplicationsCard;

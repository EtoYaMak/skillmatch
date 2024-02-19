import React from "react";
import { useNavigate } from "react-router-dom";

const StudentApplicationsCard = ({ job, status }) => {
  const jobId = job._id;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div
      className=" bg-white shadow-[0px_3px_8px_rgb(0,0,0,0.3)] rounded-3xl  items-center  p-3 font-Poppins hover:shadow-[0px_6px_7px_rgb(0,0,0,0.5)]
      hover:scale-[102%] duration-200 ease-in-out"
      onClick={handleClick}
    >
      <div className="flex w-full bg-transparent">
        <div className="flex justify-center items-center max-w-fit ">
          <img
            src={job.logo}
            alt={job.company}
            className=" rounded-full mask mask-circle w-[70px] shadow-[0_1px_5px_rgb(0,0,0,0.3)]"
          />
        </div>
        <div className="details flex justify-between w-full">
          <span className="left-details flex flex-col justify-between p-2 items-start w-2/3">
            <h1 className="position font-Poppins min-[900px]:text-xl min-[768px]:text-lg text-lg font-bold w-fit">
              {job.position}
            </h1>
            <h2 className="company font-Poppins text-md font-medium hover:underline">
              {job.company}
            </h2>
          </span>
          <span className="right-details flex flex-col justify-between p-2">
            <h1 className="position bg-inherit block cursor-pointer font-bold text-lg  text-[#000]">
              Application Status
            </h1>
            <h2 className="status block cursor-pointer  font-Poppins text-[#000]">
              {status}
            </h2>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentApplicationsCard;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Removed useSelector since it's not used here
import {
  SAgetMyJobs,
  deleteJob,
  SAdeleteJob,
  getMyJobs,
  reset,
} from "../../features/jobs/jobSlice";
import { FaEdit, FaUsers, FaTrash } from "react-icons/fa";
import { MdGridView, MdCalendarViewDay } from "react-icons/md";

import { Link } from "react-router-dom";

function UserDashJobs({ createdAt, user, SAuser, jobs, jobsLoading }) {
  const dispatch = useDispatch();
  const [viewType, setViewType] = useState("list");

  const handleToggleView = () => {
    setViewType((prevType) => (prevType === "grid" ? "list" : "grid"));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay time as needed
        dispatch(getMyJobs());
      } else if (SAuser) {
        await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay time as needed
        dispatch(SAgetMyJobs());
      } else {
        console.error("Unidentified user");
      }
    };

    fetchData();
  }, [user, SAuser, dispatch]);

  const handleDeleteJob = (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmDelete) {
      //console.log("Job Delete: ", jobId);
      if (user) {
        dispatch(deleteJob(jobId));
      } else if (SAuser) {
        dispatch(SAdeleteJob(jobId));
      } else {
        console.error("Unable to Delete Job");
      }
    }
  };

  return (
    <div
      className={`flex  ${
        viewType === "list"
          ? "flex-col "
          : "flex-wrap gap-2 justify-center items-center  "
      } max-w-[1240px] mx-auto pb-8`}
    >
      {/* VIEW STYLE */}
      <div className="w-full mb-4 flex justify-end ">
        <button
          onClick={handleToggleView}
          className="flex justify-center items-center gap-2 bg-black text-white font-Poppins px-3 py-2 rounded-xl"
        >
          <p className="text-[24px]">
            {viewType === "grid" ? <MdCalendarViewDay /> : <MdGridView />}
          </p>
          {viewType === "grid" ? "List View" : "Grid View"}
        </button>
      </div>
      {jobs.length > 0 ? (
        <>
          {jobs.map((job) => (
            /* MAIN CONTAINER */
            <div
              key={job._id}
              className={`${
                viewType === "list"
                  ? "flex flex-row items-center justify-center h-fit sm:h-24"
                  : "card card-compact w-fit h-full "
              } mb-2  bg-transparent shadow-[0px_2px_8px_rgb(0,0,0,0.3)] hover:text-black rounded-xl`}
            >
              {/* LOGO */}
              <figure
                className={`${
                  viewType === "list"
                    ? "bg-transparent min-w-fit h-20 rounded-3xl my-auto mx-2"
                    : ""
                }`}
              >
                <img
                  src={job.logo}
                  alt={job.position}
                  className={` ${
                    viewType === "list"
                      ? "w-full h-full mask mask-circle"
                      : "object-cover sm:object-fill sm:w-full sm:h-full"
                  }`}
                />
              </figure>
              {/* CARD */}
              <div
                className={`w-full ${
                  viewType === "list"
                    ? "flex flex-row justify-between w-full items-center"
                    : ""
                }`}
              >
                {/* CARD CONTENT */}
                <div
                  className={`flex flex-col ${
                    viewType === "list"
                      ? "flex flex-row justify-between w-full items-start"
                      : " justify-center items-center w-full gap-2 py-3"
                  }`}
                >
                  <a
                    href={`/jobs/${job._id}`}
                    className="text-lg text-start font-semibold select-none hover:underline decoration-slate-900/20 underline-offset-2"
                  >
                    {job.position}
                  </a>
                  <p className="text-center text-lg select-none flex flex-col">
                    {job.company}
                    <span
                      className={`${
                        viewType === "list"
                          ? "text-sm text-start text-zinc-500"
                          : "text-sm sm:text-start text-center text-zinc-500"
                      }`}
                    >
                      {formatCreatedAtDate(job.createdAt)}
                    </span>
                  </p>
                </div>
                {/* CARD MENU */}
                <div
                  className={`mx-auto ${
                    viewType === "list"
                      ? "card-actions min-w-fit  max-w-full"
                      : "card-actions w-full"
                  }`}
                >
                  <ul
                    className={`mx-auto gap-2 ${
                      viewType === "list"
                        ? "menu max-[500px]:menu-vertical min-[500px]:menu-horizontal p-2 bg-white/5 rounded-box"
                        : "menu menu-horizontal p-2 bg-white/5 rounded-box items-center mt-2"
                    }`}
                  >
                    <li className="group">
                      <Link
                        to={`/jobapplicants/${job._id}`}
                        className=" flex  hover:bg-black   "
                      >
                        <FaUsers
                          size={16}
                          className="group-hover:text-black "
                        />
                        <span className=" font-bold text-[14px] bg-transparent group-hover:text-black">
                          {countPendingApplicants(job._id, jobs)}
                        </span>
                      </Link>
                    </li>
                    <li className="group">
                      <Link
                        className="hover:bg-black hover:text-white w-full flex justify-center items-center"
                        to={`/jobs/${job._id}/update`}
                      >
                        <FaEdit size={16} className="group-hover:text-black" />
                      </Link>
                    </li>
                    <li className="group">
                      <button
                        className="hover:bg-black  w-full flex justify-center items-center"
                        onClick={() => handleDeleteJob(job._id)}
                      >
                        <FaTrash size={16} className="group-hover:text-black" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {jobsLoading ? (
            <div className="w-full flex justify-center items-start h-screen">
              <span className="loading loading-dots text-error w-20 mt-[20vh]"></span>
            </div>
          ) : (
            <div className="w-full flex justify-center items-start h-screen">
              {!jobsLoading && jobs.length === 0 ? (
                <span className="text-error text-3xl font-Poppins mt-[20vh]">
                  You have not posted any Job
                </span>
              ) : null}
            </div>
          )}
        </>
      )}
    </div>
  );
}
// Define a function to format the date
const formatCreatedAtDate = (createdAt) => {
  const createdAtDate = new Date(createdAt);
  const day = createdAtDate.getDate();
  const month = createdAtDate.getMonth() + 1; // Months are zero-indexed
  const year = createdAtDate.getFullYear();
  return `${day}/${month}/${year}`;
};

// Function to count "Pending" applicants for a specific job_id
const countPendingApplicants = (job_id, jobs) => {
  const job = jobs && jobs.find((job) => job._id === job_id);
  const count = job
    ? job.applicants.filter((applicant) => applicant.status === "Pending")
        .length
    : 0;

  return count > 0 ? `+${count}` : "0";
};
export default UserDashJobs;

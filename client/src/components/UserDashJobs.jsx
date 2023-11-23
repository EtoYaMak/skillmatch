import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Removed useSelector since it's not used here
import {
  SAgetMyJobs,
  deleteJob,
  SAdeleteJob,
  getMyJobs,
  reset,
} from "../features/jobs/jobSlice";
import { FaEdit, FaUsers, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function UserDashJobs({ createdAt, user, SAuser, jobs, jobsLoading }) {
  const dispatch = useDispatch();
  const loading = true;
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
      console.log("Job Delete: ", jobId);
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
    <div className="flex flex-wrap gap-2 min-[640px]:justify-center bg-transparent">
      {jobs.length > 0 ? (
        <>
          {jobs.map((job) => (
            <div
              key={job._id}
              className="card card-compact max-[640px]:card-side w-full min-[640px]:w-56 bg-transparent shadow-[0px_2px_8px_rgb(0,0,0,0.3)] my-2 hover:text-black"
            >
              <figure className="bg-transparent ">
                <img
                  src={job.logo}
                  alt={job.position}
                  className="object-cover sm:object-fill sm:w-full sm:h-full" //max-h-[160px] object-cover object-center
                />
              </figure>

              <div className="p-[3px] w-full max-[640px]:flex max-[640px]:flex-col items-center justify-evenly sm:card-body bg-white max-[640px]:rounded-r-box sm:rounded-b-box">
                <a
                  href={`/jobs/${job._id}`}
                  className="text-lg text-start font-semibold select-none hover:underline decoration-slate-900/20 underline-offset-2"
                >
                  {job.position}
                </a>
                <p className="text-center text-lg select-none flex flex-col">
                  {job.company}
                  <span className="text-xs text-zinc-500">
                    {formatCreatedAtDate(job.createdAt)}
                  </span>
                </p>

                <div className="card-actions justify-center">
                  <ul className="menu menu-horizontal p-2 bg-white/5 rounded-box items-center">
                    <li className="indicator ">
                      <span className="pointer-events-none indicator-center -mt-2 indicator-item badge badge-accent border-0  bg-red-700 flex  justify-center items-center mask mask-circle text-white font-Poppins font-bold w-8 h-8  text-[14px]">
                        {countPendingApplicants(job._id, jobs)}
                      </span>
                      <Link
                        to={`/jobapplicants/${job._id}`}
                        className="hover:bg-black hover:text-white"
                      >
                        <FaUsers size={16} />
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        className="hover:bg-black hover:text-white"
                        to={`/jobs/${job._id}/update`}
                      >
                        <FaEdit size={16} />
                      </Link>
                    </li>
                    <li>
                      <button
                        className=" hover:bg-black hover:text-white"
                        onClick={() => handleDeleteJob(job._id)}
                      >
                        <FaTrash size={16} />
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
            <div className="w-full flex justify-center items-start h-screen  ">
              <span className="loading loading-dots text-error w-20 mt-[20vh]"></span>
            </div>
          ) : (
            <div className="w-full flex justify-center items-start h-screen ">
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

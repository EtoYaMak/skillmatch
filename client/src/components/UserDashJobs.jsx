import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Removed useSelector since it's not used here
import {
  SAgetMyJobs,
  deleteJob,
  SAdeleteJob,
  getMyJobs,
} from "../features/jobs/jobSlice";
import { FaClock, FaCog, FaTrash, FaTimes, FaChessKing } from "react-icons/fa";
import { FaEdit, FaUsers } from "react-icons/fa";

function UserDashJobs({ createdAt, user, SAuser, jobs }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getMyJobs());
    } else if (SAuser) {
      dispatch(SAgetMyJobs());
    } else {
      console.error("Unidentified user");
    }
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
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2 min-[640px]:justify-center">
      {jobs.length > 0 ? (
        <>
          {jobs.map((job) => (
            <div
              key={job._id}
              className="card card-compact max-[640px]:card-side w-full h-fit  min-[640px]:w-56 bg-transparent shadow-xl my-2 hover:text-black"
            >
              <figure className="bg-transparent min-w-fit">
                <img
                  src={job.logo}
                  alt={job.position}
                  className="w-full h-full "
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
                    <li>
                      <a
                        href={`/jobapplicants/${job._id}`}
                        className="hover:bg-black hover:text-white"
                      >
                        <FaUsers size={16} />
                      </a>
                    </li>
                    <li className="pointer-events-none text-gray-400">
                      <a className="hover:bg-black hover:text-white">
                        <FaEdit size={16} />
                      </a>
                    </li>
                    <li>
                      <a
                        className=" hover:bg-black hover:text-white"
                        onClick={() => handleDeleteJob(job._id)}
                      >
                        <FaTrash size={16} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <p className="text-xl text-gray-600 text-center">
            You have not posted any jobs.
          </p>
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
export default UserDashJobs;

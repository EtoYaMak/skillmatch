import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Removed useSelector since it's not used here
import {
  SAgetMyJobs,
  deleteJob,
  SAdeleteJob,
  getMyJobs,
} from "../features/jobs/jobSlice";
import { FaClock, FaCog, FaTrash, FaTimes, FaChessKing } from "react-icons/fa";
import { FaEdit, FaUsers } from "react-icons/fa";

function UserDashJobs({ user, SAuser, jobs }) {
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

  return (
    <div className="flex flex-wrap gap-4  mx-auto h-fit w-fit ">
      {jobs.length > 0 ? (
        <>
          {jobs.map((job) => (
            <div
              key={job._id}
              className="card card-compact w-56 bg-transparent shadow-xl"
            >
              <figure className="w-56 h-52 bg-transparent min-w-fit pointer-events-none ">
                <img
                  src={job.logo}
                  alt={job.position}
                  className="w-full h-full"
                />
                {/* w-56 h-52 */}
              </figure>
              <span className="bg-black opacity-10 h-[1px]"></span>
              <div className="card-body bg-white rounded-b-box">
                <h2 className="card-title select-none hover:underline decoration-slate-900/20 underline-offset-2">
                  {job.position}
                </h2>
                <p className="text-center text-lg select-none">{job.company}</p>
                <div className="card-actions justify-center">
                  <ul className="menu menu-horizontal bg-white/5 rounded-box items-center">
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

export default UserDashJobs;

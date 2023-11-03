import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Removed useSelector since it's not used here
import { deleteJob, getMyJobs } from "../features/jobs/jobSlice";
import { FaClock, FaCog, FaTrash, FaTimes } from "react-icons/fa";
import { FaEdit, FaUsers } from "react-icons/fa";

function UserDashJobs({ user, jobs }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  return (
    <div className="flex flex-1 gap-4 w-[960px] mx-auto">
      {jobs.length > 0 ? (
        <>
          {jobs.map((job) => (
            <div className="card card-compact  w-56 bg-transparent shadow-xl">
              <figure className="w-56 h-52 bg-transparent">
                <img src={job.logo} alt={job.position} className="w-56 h-52" />
              </figure>
              <div className="card-body bg-white rounded-b-box">
                <h2 className="card-title">{job.position}</h2>
                <p className="text-center text-lg">{job.company}</p>
                <div className="card-actions justify-center">
                  <ul className="menu menu-horizontal bg-white/5 rounded-box items-center">
                    <li>
                      <a className="hover:bg-black hover:text-white">
                        <FaUsers size={16} />
                      </a>
                    </li>
                    <li>
                      <a className="hover:bg-black hover:text-white">
                        <FaEdit size={16} />
                      </a>
                    </li>
                    <li>
                      <a className="hover:bg-black hover:text-white">
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

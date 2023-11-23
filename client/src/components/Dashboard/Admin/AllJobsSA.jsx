import React from "react";
import { SAdeleteJob } from "../../../features/jobs/jobSlice";
import { FaEdit, FaUsers, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function AllJobsSA({ alljobs, SAuser }) {
  const dispatch = useDispatch();
  const handleDeleteJob = (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmDelete) {
      console.log("Job Delete: ", jobId);
      if (SAuser) {
        dispatch(SAdeleteJob(jobId));
      } else {
        console.error("Unable to Delete Job");
      }
    }
  };
  return (
    <div className=" bg-transparent font-Poppins max-w-[1240px] mx-auto scale-125 mt-[12vh] min-h-screen">
      <h1 className="text-center text-xl font-Poppins">All Jobs</h1>
      <div className="flex flex-col w-full">
        {Array.isArray(alljobs) ? (
          [...alljobs].reverse().map((job) => (
            <div
              key={job._id}
              className="flex flex-row bg-transparent shadow-[0px_2px_8px_rgb(0,0,0,0.3)] my-2 hover:text-black rounded-xl gap-4"
            >
              <figure className="bg-transparent min-w-fit h-20 mx-2 flex justify-center items-center">
                <img
                  src={job.logo}
                  alt={job.position}
                  className="h-16 mask mask-circle"
                />
              </figure>

              <div className="flex flex-row justify-between w-full items-center">
                <div>
                  <a
                    href={`/jobs/${job._id}`}
                    className="text-lg text-start font-semibold select-none hover:underline decoration-slate-900/20 underline-offset-2"
                  >
                    {job.position}
                  </a>
                  <p className="text-start text-lg select-none flex flex-col ">
                    {job.company}
                  </p>
                </div>

                <div className=" justify-center">
                  <ul className="menu menu-horizontal p-2 bg-white/5 rounded-box items-center">
                    <li>
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
          ))
        ) : (
          <p>Loading students...</p>
        )}
      </div>
    </div>
  );
}

export default AllJobsSA;

import React from "react";
import { SAdeleteJob } from "../../features/jobs/jobSlice";
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
    <div className=" bg-transparent font-Poppins max-w-[960px] mx-auto">
      <h1 className="text-center text-xl font-Poppins">All Posted Jobs</h1>
      <div className="flex flex-wrap gap-2 min-[640px]:justify-center bg-transparent font-Poppins">
        {Array.isArray(alljobs) ? (
          alljobs.map((job) => (
            <div
              key={job._id}
              className="card card-compact max-[640px]:card-side w-full min-[640px]:w-56 bg-transparent shadow-[0px_2px_8px_rgb(0,0,0,0.3)] my-2 hover:text-black"
            >
              <figure className="bg-transparent min-w-fit">
                <img
                  src={job.logo}
                  alt={job.position}
                  className="w-full h-full"
                />
              </figure>

              <div className="p-[3px] w-full max-[640px]:flex max-[640px]:flex-col items-center justify-evenly sm:card-body bg-white max-[640px]:rounded-r-box sm:rounded-b-box">
                <a
                  href={`/jobs/${job._id}`}
                  className="text-lg text-start font-semibold select-none hover:underline decoration-slate-900/20 underline-offset-2"
                >
                  {job.position}
                </a>
                <p className="text-center text-lg select-none flex flex-col ">
                  {job.company}
                </p>

                <div className="card-actions justify-center">
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

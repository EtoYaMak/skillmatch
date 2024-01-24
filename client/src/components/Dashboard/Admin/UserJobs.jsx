import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getAllJobsTwo,
  deleteJob,
  SAdeleteJob,
} from "../../../features/jobs/jobSlice";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import { MdGridView, MdCalendarViewDay } from "react-icons/md";

function UserJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [viewType, setViewType] = useState("list");
  const handleToggleView = () => {
    setViewType((prevType) => (prevType === "grid" ? "list" : "grid"));
  };

  // Filter jobs based on user field
  const userJobs = useSelector((state) =>
    state.jobs.alljobs.filter((job) => job.user === userId)
  );

  const { SAuser, isLoading: adminLoading } = useSelector(
    (state) => state.SAuser
  );
  //Fetch Alljobs
  useEffect(() => {
    dispatch(getAllJobsTwo());
  }, [dispatch]);

  const handleGoBack = () => {
    // Go back to the previous page
    navigate(-1);
  };
  const handleDeleteJob = (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmDelete) {
      //console.log("Job Delete: ", jobId);
      if (SAuser) {
        dispatch(SAdeleteJob(jobId));
      } else {
        console.error("Unable to Delete Job");
      }
    }
  };
  return (
    <div className="min-h-screen max-w-[1280px] mx-auto p-1">
      <div className="flex items-center justify-between py-3">
        {/* Back button */} {/* VIEW STYLE */}
        <button onClick={handleGoBack}>
          <IoMdArrowRoundBack size={32} />
        </button>
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

      {/* Render user-specific jobs */}
      {userJobs.length > 0 ? (
        <>
          {userJobs.map((job) => (
            <div key={job._id}>
              {/* Render job details */}
              <div
                key={job._id}
                className={`${
                  viewType === "list"
                    ? "flex flex-row items-center justify-center  "
                    : "card card-compact w-fit h-full"
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
                      <span className="text-xs text-start text-zinc-500">
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
                      <li className="">
                        <Link
                          to={`/jobapplicants/${job._id}`}
                          className=" flex  hover:bg-black hover:text-white "
                        >
                          <FaUsers size={16} />
                          <span className=" font-bold text-[14px] bg-transparent">
                            {countPendingApplicants(job._id, userJobs)}
                          </span>
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className="hover:bg-black hover:text-white w-full flex justify-center items-center"
                          to={`/jobs/${job._id}/update`}
                        >
                          <FaEdit size={16} />
                        </Link>
                      </li>
                      <li className="">
                        {" "}
                        <button
                          className="hover:bg-black hover:text-white w-full flex justify-center items-center"
                          onClick={() => handleDeleteJob(job._id)}
                        >
                          <FaTrash size={16} />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Access more job details using job.property */}
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="w-full flex justify-center items-start h-screen">
            <span className="text-xl font-Poppins mt-[10vh]">
              No jobs by user
            </span>
          </div>
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
const countPendingApplicants = (job_id, userJobs) => {
  const job = userJobs && userJobs.find((job) => job._id === job_id);
  const count = job
    ? job.applicants.filter((applicant) => applicant.status === "Pending")
        .length
    : 0;

  return count > 0 ? `+${count}` : "0";
};
export default UserJobs;

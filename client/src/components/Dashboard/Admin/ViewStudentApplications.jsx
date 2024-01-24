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

function ViewStudentApplications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentId } = useParams(); //StudentId from Params to use for filter
  const [viewType, setViewType] = useState("list");
  const handleToggleView = () => {
    setViewType((prevType) => (prevType === "grid" ? "list" : "grid"));
  };

  const { SAuser, isLoading: adminLoading } = useSelector(
    (state) => state.SAuser
  );
  const appliedJobs = useSelector((state) =>
    state.jobs.alljobs.filter((job) =>
      job.applicants.some((applicant) => applicant.student === studentId)
    )
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
      <div
        className={`${
          viewType === "list"
            ? " "
            : "flex  flex-wrap gap-4 justify-center items-center"
        }`}
      >
        {/* Render user-specific jobs */}
        {appliedJobs.length > 0 ? (
          <>
            {appliedJobs.map((job) => (
              /* MAIN CONTAINER */
              <div
                key={job._id}
                className={`${
                  viewType === "list"
                    ? "flex flex-row items-center justify-center py-2 "
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
                      className="text-lg text-start font-Poppins font-semibold select-none hover:underline decoration-slate-900/20 underline-offset-2 -mb-1"
                    >
                      {job.position}
                    </a>
                    <p className="text-center text-lg select-none flex flex-col font-Poppins">
                      {job.company}
                      <span className="text-xs text-center text-zinc-500">
                        {formatCreatedAtDate(job.createdAt)}
                      </span>
                    </p>
                  </div>
                  {/* STATUS */}
                  <div
                    className={` ${
                      viewType === "list"
                        ? "w-24 flex flex-col justify-center items-center mr-10"
                        : " text-center pb-2"
                    }`}
                  >
                    {/* MENU ~ Status & Date Applied */}
                    <p className="font-Poppins text-black/70 font-medium text-[13px] sm:text-[15px]">
                      Status
                    </p>
                    <div className="w-fit mx-auto text-[13px] sm:text-xl font-Poppins font-semibold ">
                      {getApplicantStatus(job, studentId) === "Pending" && (
                        <span className="text-gray-600">PENDING</span>
                      )}
                      {getApplicantStatus(job, studentId) === "Approved" && (
                        <span className="text-green-500">APPROVED</span>
                      )}
                      {getApplicantStatus(job, studentId) === "Rejected" && (
                        <span className="text-red-700">REJECTED</span>
                      )}
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
                No applied Jobs
              </span>
            </div>
          </>
        )}
      </div>
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

// Define a function to get the status of a specific applicant in a job
const getApplicantStatus = (job, studentId) => {
  const applicant = job.applicants.find(
    (applicant) => applicant.student === studentId
  );
  return applicant ? applicant.status : "Not Applied";
};
export default ViewStudentApplications;

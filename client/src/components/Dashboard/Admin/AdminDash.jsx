import React, { useState, useEffect } from "react";
import JobFormAdmin from "../../Job/Post/JobFormAdmin";
import UserDashJobs from "../UserDashJobs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import AllUsers from "./AllUsers";
import AllStudents from "./AllStudents";
import { getAllJobsTwo } from "../../../features/jobs/jobSlice";
import {
  getAllStudents,
  getAllUsers,
} from "../../../features/accounts/accountSlice";
import AllJobsSA from "./AllJobsSA";

function AdminDash() {
  const dispatch = useDispatch();
  const location = useLocation();

  const navigate = useNavigate();
  const [active, setActive] = useState("alljobs");
  const { SAuser } = useSelector((state) => state.SAuser);
  const jobs = useSelector((state) => state.jobs.jobs);
  const alljobs = useSelector((state) => state.jobs.alljobs);
  const students = useSelector((state) => state.accounts.stuaccounts);
  const users = useSelector((state) => state.accounts.accounts);
  useEffect(() => {
    // Get the tab name from the pathname
    const pathSegments = location.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    // Set the active tab based on the last segment of the pathname, or set a default tab
    if (lastSegment === "adminDash") {
      setActive("alljobs");
    } else {
      setActive(lastSegment);
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getAllJobsTwo());
    dispatch(getAllStudents());
    dispatch(getAllUsers());
  }, [dispatch]);
  const handleTabClick = (tab) => {
    setActive(tab);

    // Update the URL to reflect the selected tab
    navigate(tab);
  };
  return (
    <div className="h-full font-Poppins flex  flex-col sm:flex-row ">
      <div className="adminNav w-full sm:w-auto gap-2 px-4 sm:px-0 sm:gap-10 py-4 sm:py-10 border-b  text-center  flex  flex-wrap sm:flex-col sm:items-center justify-between items-start sm:justify-start  sm:text-xl">
        {/* Render tabs to switch between profile and applications */}
        <button
          className={` px-4 py-2  ease-in-out duration-200 text-end ${
            active === "alljobs"
              ? "font-bold  text-[#fff] bg-black scale-105"
              : "text-black/40 bg-transparent hover:bg-black/70 hover:text-white"
          }`}
          onClick={() => handleTabClick("alljobs")}
        >
          All Jobs
        </button>
        <button
          className={` px-4 py-2  ease-in-out duration-200 text-end  ${
            active === "jobs"
              ? "font-bold  text-[#fff] bg-black scale-105"
              : "text-black/40 bg-transparent hover:bg-black/70 hover:text-white"
          }`}
          onClick={() => handleTabClick("jobs")}
        >
          My Jobs
        </button>
        <button
          className={` px-4 py-2  ease-in-out duration-200 text-end  ${
            active === "post"
              ? "font-bold  text-[#fff] bg-black scale-105"
              : "text-black/40 bg-transparent hover:bg-black/70 hover:text-white"
          }`}
          onClick={() => handleTabClick("post")}
        >
          Post A Job
        </button>
        <button
          className={` px-4 py-2   ease-in-out duration-200 text-end  ${
            active === "users"
              ? "font-bold  text-[#fff] bg-black scale-105"
              : "text-black/40 bg-transparent hover:bg-black/70 hover:text-white"
          }`}
          onClick={() => handleTabClick("users")}
        >
          Employers
        </button>
        <button
          className={` px-4 py-2   ease-in-out duration-200 text-end  ${
            active === "students"
              ? "font-bold  text-[#fff] bg-black scale-105"
              : "text-black/40 bg-transparent hover:bg-black/70 hover:text-white"
          }`}
          onClick={() => handleTabClick("students")}
        >
          Applicants
        </button>
      </div>

      <div className="bg-transparent w-full min-h-screen p-4 mx-auto">
        {/*
         USERS 
         */}
        {active === "users" && <AllUsers users={users} alljobs={alljobs} />}
        {/* 
        STUDENTS
         */}
        {active === "students" && (
          <AllStudents students={students} alljobs={alljobs} />
        )}
        {/* 
        JOB FORM
         */}
        {active === "post" && <JobFormAdmin />}
        {/* 
        MY JOBS
         */}
        {active === "jobs" && <UserDashJobs SAuser={SAuser} jobs={jobs} />}
        {/* 
        ALL JOBS
         */}
        {active === "alljobs" && (
          <AllJobsSA SAuser={SAuser} alljobs={alljobs} />
        )}
      </div>
    </div>
  );
}

export default AdminDash;

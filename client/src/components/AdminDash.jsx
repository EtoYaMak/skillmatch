import React, { useState, useEffect } from "react";
import JobFormAdmin from "./JobFormAdmin";
import UserDashJobs from "./UserDashJobs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllUsers from "./level_2/AllUsers";
import AllStudents from "./level_2/AllStudents";
import { getAllJobsTwo } from "../features/jobs/jobSlice";
import { getAllStudents, getAllUsers } from "../features/accounts/accountSlice";
import AllJobsSA from "./level_2/AllJobsSA";

function AdminDash() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [active, setActive] = useState("jobs");
  const { SAuser } = useSelector((state) => state.SAuser);
  const jobs = useSelector((state) => state.jobs.jobs);
  const alljobs = useSelector((state) => state.jobs.alljobs);
  const students = useSelector((state) => state.accounts.stuaccounts);
  const users = useSelector((state) => state.accounts.accounts);

  useEffect(() => {
    dispatch(getAllJobsTwo());
    dispatch(getAllStudents());
    dispatch(getAllUsers());
  }, [dispatch]);
  const handleTabClick = (tab) => {
    setActive(tab);
  };

  return (
    <div className="h-full font-Poppins">
      <div className="max-w-[960px] mx-auto">
        <div className="border-b border-b-[#000] text-center p-4 space-x-4">
          {/* Render tabs to switch between profile and applications */}
          <button
            className={` px-4 py-2 rounded-3xl ease-in-out duration-200 ${
              active === "alljobs"
                ? "font-bold  text-[#fff] bg-black scale-105"
                : "text-black/40 bg-transparent hover:bg-black/70 hover:text-white"
            }`}
            onClick={() => handleTabClick("alljobs")}
          >
            All Jobs
          </button>
          <button
            className={` px-4 py-2 rounded-3xl ease-in-out duration-200 ${
              active === "jobs"
                ? "font-bold  text-[#fff] bg-black scale-105"
                : "text-black/40 bg-transparent hover:bg-black/70 hover:text-white"
            }`}
            onClick={() => handleTabClick("jobs")}
          >
            My Jobs
          </button>
          <button
            className={` px-4 py-2 rounded-3xl  ease-in-out duration-200 ${
              active === "post"
                ? "font-bold  text-[#fff] bg-black scale-105"
                : "text-black/40 bg-transparent hover:bg-black/70 hover:text-white"
            }`}
            onClick={() => handleTabClick("post")}
          >
            Post Job
          </button>
          <button
            className={` px-4 py-2 rounded-3xl  ease-in-out duration-200 ${
              active === "users"
                ? "font-bold  text-[#fff] bg-black scale-105"
                : "text-black/40 bg-transparent hover:bg-black/70 hover:text-white"
            }`}
            onClick={() => handleTabClick("users")}
          >
            Users
          </button>
          <button
            className={` px-4 py-2 rounded-3xl  ease-in-out duration-200 ${
              active === "students"
                ? "font-bold  text-[#fff] bg-black scale-105"
                : "text-black/40 bg-transparent hover:bg-black/70 hover:text-white"
            }`}
            onClick={() => handleTabClick("students")}
          >
            Students
          </button>
        </div>
      </div>
      <div className="bg-transparent w-full p-4 mx-auto">
        {active === "users" && <AllUsers users={users} />}
        {active === "students" && (
          <AllStudents students={students} alljobs={alljobs} />
        )}
        {active === "post" && <JobFormAdmin />}
        {active === "jobs" && <UserDashJobs SAuser={SAuser} jobs={jobs} />}
        {active === "alljobs" && (
          <AllJobsSA SAuser={SAuser} alljobs={alljobs} />
        )}
      </div>
    </div>
  );
}

export default AdminDash;

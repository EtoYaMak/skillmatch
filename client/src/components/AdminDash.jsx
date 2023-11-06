import React, { useState } from "react";
import { useEffect } from "react";
import JobFormAdmin from "./JobFormAdmin";
import UserDashJobs from "./UserDashJobs";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function AdminDash() {
  const [active, setActive] = useState("jobs"); // Default active tab is "post"
  const { SAuser } = useSelector((state) => state.SAuser);
  const jobs = useSelector((state) => state.jobs.jobs);
  const navigate = useNavigate();

  useEffect(() => {
    if (!SAuser) {
      navigate("/");
    }
  }, [SAuser, navigate]);

  const handleTabClick = (tab) => {
    // Set the active tab when a tab is clicked
    setActive(tab);
  };

  return (
    <div className="h-full ">
      <div className="max-w-[960px] mx-auto">
        <div className="border-b-2 border-b-[#d0333c] text-center p-4 space-x-4">
          {/* Render tabs to switch between profile and applications */}
          <button
            className={`btn btn-ghost  ${
              active === "jobs"
                ? "font-bold btn-active text-[#d0333c] scale-105"
                : "text-white"
            }`}
            onClick={() => handleTabClick("jobs")}
          >
            My Jobs
          </button>
          <button
            className={` btn btn-ghost  ${
              active === "post"
                ? "font-bold btn-active text-[#d0333c] scale-105"
                : "text-white"
            }`}
            onClick={() => handleTabClick("post")}
          >
            Post Job
          </button>
        </div>
        <div className="bg-black/40 rounded-box w-full p-4 mx-auto">
          {active === "post" && <JobFormAdmin />}
          {active === "jobs" && <UserDashJobs SAuser={SAuser} jobs={jobs} />}
        </div>
      </div>
    </div>
  );
}

export default AdminDash;

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
    <div className="h-full py-4 px-2">
      <div className="">
        <div className=" h-fit max-w-fit card bg-base-300 mx-auto rounded-box w-38">
          <ul className="menu flex-row bg-base-200 text-white  rounded-box">
            <li>
              <a
                onClick={() => handleTabClick("jobs")}
                className={active === "jobs" ? "active" : ""}
              >
                My Jobs
              </a>
            </li>
            <li>
              <a
                onClick={() => handleTabClick("post")}
                className={active === "post" ? "active" : ""}
              >
                Post a Job
              </a>
            </li>
            <li className="pointer-events-none text-gray-500">
              <a>Users</a>
            </li>
          </ul>
        </div>

        <div className="divider w-min[900px]:divider-horizontal"></div>
        <div className="bg-white rounded-box w-fit p-4 mx-auto">
          {/*           className={`${
            active === "post"
              ? "grid h-full flex-grow card bg-base-300 rounded-box  p-4"
              : ""
          } ${
            active === "jobs"
              ? "grid h-full flex-grow card bg-base-300 rounded-box  p-4"
              : ""
          }`}*/}
          {active === "post" && <JobFormAdmin />}
          {active === "jobs" && <UserDashJobs SAuser={SAuser} jobs={jobs} />}
          {/* Add additional tab content here */}
        </div>
      </div>
    </div>
  );
}

export default AdminDash;

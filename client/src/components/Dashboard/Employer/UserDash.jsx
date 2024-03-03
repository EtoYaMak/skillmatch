import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserDashJobs from "../UserDashJobs";

function UserDash() {
  const navigate = useNavigate();
  const { user, isLoading: userLoading } = useSelector((state) => state.auth);
  const { SAuser, isLoading: adminLoading } = useSelector(
    (state) => state.SAuser
  );
  const { isLoading: jobsLoading } = useSelector((state) => state.jobs);
  const jobs = useSelector((state) => state.jobs.jobs);
  const [activeTab, setActiveTab] = useState("profile");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (!user && !SAuser) {
    navigate("/login");
    return <p>Unauthorized access ~ Login to view your Dashboard</p>;
  }
  if (adminLoading || userLoading || adminLoading) {
    return (
      <div className="w-full h-[25vh]">
        <span className="loading loading-spinner text-3xl mt-10%"></span>
      </div>
    );
  }
  return (
    <div className="min-h-screen font-Poppins">
      <h1 className="hiddenHSEO">Skillmatch Employer Dashboard Page</h1>
      <h2 className="hiddenHSEO">
        This Page is for the Employer to view their listed jobs
      </h2>
      <div className="max-w-[960px] mx-auto flex flex-col gap-4 ">
        <div className="border-b border-b-[#000] text-center p-4 space-x-4">
          {/* Render tabs to switch between profile and applications */}
          <button
            className={` px-4 py-2 rounded-3xl ease-in-out duration-200 ${
              activeTab === "profile"
                ? "font-bold  text-[#fff] bg-black scale-105"
                : "text-black/40 bg-transparent hover:bg-black/70 hover:text-white"
            }`}
            onClick={() => handleTabClick("profile")}
          >
            My Jobs
          </button>
          {/*           <button
            className={` px-4 py-2 rounded-3xl ease-in-out duration-200 ${
              activeTab === "blank"
                ? "font-bold  text-[#fff] bg-black scale-105"
                : "text-black/40 bg-transparent hover:bg-black/70 hover:text-white"
            }`}
            onClick={() => handleTabClick("blank")}
          >
            Blank
          </button> */}
        </div>
        <div className="w-full mx-auto px-2">
          {/* Pass the user and jobs props to UserDashJobs */}
          {activeTab === "profile" && (
            <UserDashJobs
              user={user}
              SAuser={SAuser}
              jobs={jobs}
              jobsLoading={jobsLoading}
            />
          )}
          {activeTab == "blank" && <div>Blank Component</div>}
        </div>
      </div>
    </div>
  );
}

export default UserDash;

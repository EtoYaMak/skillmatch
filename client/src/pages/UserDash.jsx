import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserDashJobs from "../components/UserDashJobs";

function UserDash() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { SAuser } = useSelector((state) => state.SAuser);
  const jobs = useSelector((state) => state.jobs.jobs);
  const [activeTab, setActiveTab] = useState("profile");

  if (!user && !SAuser) {
    navigate("/login");
    return <p>Unauthorized access ~ Login to view your Dashboard</p>;
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="bg-transparent p-4 text-center border-b-2 border-b-[#d0333c]  mx-auto mt-12">
        {/* Render tabs to switch between profile and applications */}
        <button
          className={`mr-4 btn btn-ghost  ${
            activeTab === "profile"
              ? "font-bold btn-active text-[#d0333c] scale-105"
              : "text-white"
          }`}
        >
          Profile
        </button>
      </div>
      <div className="w-fit mx-auto">
        {/* Pass the user and jobs props to UserDashJobs */}
        {activeTab === "profile" && (
          <UserDashJobs user={user} SAuser={SAuser} jobs={jobs} />
        )}
      </div>
    </div>
  );
}

export default UserDash;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StudentProfile from "../components/studentProfile";
import StudentApplications from "../components/StudentApplications";

function StudentDash() {
  const student = useSelector((state) => state.students.student);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");

  if (!student) {
    navigate("/loginS");
    return <p>Unauthorized access ~ Login to view your profile</p>;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="bg-transparent p-4 text-center border-b-2 border-b-[#d0333c] w-2/4 mx-auto mt-12">
        {/* Render tabs to switch between profile and applications */}
        <button
          className={`mr-4 btn btn-ghost  ${
            activeTab === "applications"
              ? "font-bold btn-active text-[#d0333c] scale-105"
              : "text-white"
          }`}
          onClick={() => handleTabChange("applications")}
        >
          Applications
        </button>
        <button
          className={`mr-4 btn btn-ghost  ${
            activeTab === "profile"
              ? "font-bold btn-active text-[#d0333c] scale-105"
              : "text-white"
          }`}
          onClick={() => handleTabChange("profile")}
        >
          Profile
        </button>
      </div>
      <div className="p-4">
        {/* Display the selected component based on the activeTab state */}
        {activeTab === "profile" && <StudentProfile />}
        {activeTab === "applications" && <StudentApplications />}
      </div>
    </div>
  );
}

export default StudentDash;

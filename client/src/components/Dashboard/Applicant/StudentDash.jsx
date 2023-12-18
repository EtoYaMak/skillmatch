import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StudentProfile from "../../Dashboard/Applicant/studentProfile";
import StudentApplications from "../../Dashboard/Applicant/StudentApplications";
import StudentProfilePage from "./StudentProfilePage";

function StudentDash() {
  const { student, isLoading } = useSelector((state) => state.students);

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");

  if (!student) {
    navigate("/loginS");
    return <p>Unauthorized access ~ Login to view your profile</p>;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  if (isLoading) {
    return (
      <div className="w-full flex-1 flex justify-center items-start h-screen">
        <span className="loading loading-spinner text-error w-14 mt-[10%]"></span>
      </div>
    );
  }
  return (
    <div className="min-h-screen  bg-transparent">
      <div className="bg-transparent p-4 text-center border-b-2 border-b-[#d0333c] w-2/4 mx-auto mt-12">
        {/* Render tabs to switch between profile and applications */}
        <button
          className={`mr-4 btn btn-ghost font-Poppins   ${
            activeTab === "applications"
              ? "font-bold btn-active text-black scale-105"
              : "text-black"
          }`}
          onClick={() => handleTabChange("applications")}
        >
          Applications
        </button>
        <button
          className={`mr-4 btn btn-ghost font-Poppins  ${
            activeTab === "profileold"
              ? "font-bold btn-active text-black scale-105"
              : "text-black"
          }`}
          onClick={() => handleTabChange("profileold")}
        >
          Profile OLD
        </button>
        <button
          className={`mr-4 btn btn-ghost font-Poppins  ${
            activeTab === "profile"
              ? "font-bold btn-active text-black scale-105"
              : "text-black"
          }`}
          onClick={() => handleTabChange("profile")}
        >
          Profile NEW
        </button>
      </div>
      <div className="p-4 max-w-5xl mx-auto">
        {/* Display the selected component based on the activeTab state */}
        {activeTab === "profileold" && <StudentProfile />}
        {activeTab === "profile" && <StudentProfilePage student={student} />}
        {activeTab === "applications" && <StudentApplications />}
      </div>
    </div>
  );
}

export default StudentDash;

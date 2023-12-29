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
      <div className="bg-transparent  max-w-5xl mx-auto pb-4 flex justify-center items-center gap-5">
        {/* Render tabs to switch between profile and applications */}
        <button
          className={`font-Poppins p-3 rounded-b-xl uppercase text-[13px]    ${
            activeTab === "applications"
              ? "font-bold bg-[#f3f3f3]"
              : "text-black font-medium"
          }`}
          onClick={() => handleTabChange("applications")}
        >
          My Applications
        </button>
        <button
          className={`font-Poppins p-3 rounded-b-xl uppercase text-[13px]   ${
            activeTab === "profile"
              ? "font-bold bg-[#f3f3f3]"
              : "text-black font-medium"
          }`}
          onClick={() => handleTabChange("profile")}
        >
          Profile
        </button>
      </div>
      <div className="px-4 max-w-5xl mx-auto pb-4">
        {/* Display the selected component based on the activeTab state */}
        {activeTab === "profile" && <StudentProfilePage student={student} />}
        {activeTab === "applications" && <StudentApplications />}
      </div>
    </div>
  );
}

export default StudentDash;

// ApplyJobButton.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyToJob } from "../../features/jobs/jobSlice";
import { fetchStudentData } from "../../features/students/studentSlice";
import { getProfile } from "../..//features/profiles/profileSlice";
import { useNavigate } from "react-router-dom";
const ApplyJobButton = ({
  jobId,
  applytext,
  appliedtext,
  style,
  noProfileText,
  disabledStyle,
  student,
  studentData,
  profiles,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  const [isApplied, setIsApplied] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (studentData) {
      const hasApplied = studentData.appliedJobs.some(
        (appliedJob) => appliedJob.job === jobId
      );
      setIsApplied(hasApplied);
    }
  }, [studentData, jobId, setIsApplied]);

  const handleApply = async (event) => {
    event.stopPropagation();
    try {
      setIsLoading(true);
      // Check if a profile exists
      //console.log("Before navigate");
      if (!profiles || profiles.length === 0 || profiles === null) {
        // Redirect to DashboardS if no profile is found
        navigate("/DashboardS");
        return; // Stop further execution of the function
      }
      //console.log("After navigate");
      // Call the applyToJob function here
      await dispatch(applyToJob({ jobId, studentId: student._id }));

      // Dispatch an action to refresh student data
      await dispatch(fetchStudentData());

      // Update isApplied to true immediately when the application is successful
      setIsApplied(true);
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled =
    isApplied ||
    isLoading ||
    !profiles ||
    profiles.length === 0 ||
    profiles === null;

  return (
    <button
      onClick={(event) => handleApply(event)}
      className={`flex justify-center items-center ${style} ease-in-out duration-200 uppercase font-Poppins ${
        isApplied
          ? "bg-transparent text-black/80 font-bold"
          : isDisabled
          ? `${disabledStyle}` // Add your disabled button styling here
          : "bg-black text-white"
      }`}
    >
      {isLoading ? (
        <span className="loading loading-dots loading-sm"></span>
      ) : isApplied ? (
        appliedtext
      ) : isDisabled ? (
        noProfileText // Display alternative text when the button is disabled due to no profile
      ) : (
        applytext
      )}
    </button>
  );
};

export default ApplyJobButton;

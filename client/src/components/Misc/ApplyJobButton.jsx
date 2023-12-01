// ApplyJobButton.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyToJob } from "../../features/jobs/jobSlice";
import { fetchStudentData } from "../../features/students/studentSlice";

const ApplyJobButton = ({ jobId }) => {
  const dispatch = useDispatch();
  const { student, studentData } = useSelector((state) => state.students);
  const [isApplied, setIsApplied] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchStudentData());
      } catch (error) {
        console.error("Error fetching student data:", error);
        // Handle the error if needed
      } finally {
        setIsLoading(false);
      }
    };

    if (student) {
      fetchData();
    } else {
      console.error("useEffect Error");
    }
  }, [dispatch, student]);

  useEffect(() => {
    if (studentData) {
      const hasApplied = studentData.appliedJobs.some(
        (appliedJob) => appliedJob.job === jobId
      );
      setIsApplied(hasApplied);
    }
  }, [studentData, jobId]);
  const handleApply = async () => {
    try {
      setIsLoading(true);

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

  return (
    <button
      onClick={handleApply}
      disabled={isApplied || isLoading}
      className={`flex justify-center items-center w-full h-full  ease-in-out duration-200 rounded-lg  uppercase font-Poppins  ${
        isApplied
          ? "bg-transparent text-black/60 font-bold"
          : " bg-black text-white " /* w-[120px] h-[43px] sm:px-3   sm:py-2  font-bold sm:text-[16px] text-[14px] py-1 px-3*/
      }`}
    >
      {isLoading ? (
        <span className="loading loading-dots loading-sm"></span>
      ) : isApplied ? (
        "Applied"
      ) : (
        "Apply"
      )}
    </button>
  );
};

export default ApplyJobButton;

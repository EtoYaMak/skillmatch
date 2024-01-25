import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getJobId } from "../../../features/jobs/jobSlice";
import { useParams } from "react-router-dom";
import JobDetailPage from "./JobDetailPage";

function JobDetailComponent(props) {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  // Updated selector to access the job data correctly
  const job = useSelector((state) =>
    state.jobs.jobs.find((job) => job._id === jobId)
  );
  const { user } = useSelector((state) => state.auth);
  const { SAuser } = useSelector((state) => state.SAuser);
  const { student, studentData } = useSelector((state) => state.students);
  const { profiles } = useSelector((state) => state.profiles);
  // Dispatch the getJobId action when the component mounts
  useEffect(() => {
    dispatch(getJobId(jobId));
  }, [dispatch, jobId]);

  // Handle loading and error states
  const isLoading = useSelector((state) => state.jobs.isLoading);
  const isError = useSelector((state) => state.jobs.isError);

  if (isLoading) {
    return (
      <div className="w-full flex-1 flex justify-center items-start h-screen">
        <span className="loading loading-spinner text-error w-14 mt-[10%]"></span>
      </div>
    );
  }

  // Check if job is available
  if (!job || isError) {
    return <div>Job not found.</div>;
  }

  // Display the job details
  return (
    <div className="w-full mx-auto pt-10 pb-20">
      <h1 className="hiddenHSEO">
        Skillmint Job Portal. View Full Job. Job Details Page.
      </h1>
      <h2 className="hiddenHSEO">
        View Complete Job Details. Salary. Location. Skills. Description.
      </h2>
      <JobDetailPage
        job={job}
        student={student}
        studentData={studentData}
        profiles={profiles}
        user={user}
        SAuser={SAuser}
      />
    </div>
  );
}

export default JobDetailComponent;

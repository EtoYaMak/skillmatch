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
      <JobDetailPage job={job} />
    </div>
  );
}

export default JobDetailComponent;

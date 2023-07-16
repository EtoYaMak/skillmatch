import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getJobId } from "../features/jobs/jobSlice";
import { useParams } from "react-router-dom";
import JobDetailPage from "./JobDetailPage";

function JobDetailComponent(props) {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  const jobs = useSelector((state) => state.jobs);
  const job = jobs.job;

  // Dispatch the getJobId action when the component mounts
  useEffect(() => {
    dispatch(getJobId(jobId));
  }, [dispatch, jobId]);

  // Handle loading and error states
  const isLoading = jobs.isLoading;
  const isError = jobs.isError;

  if (isLoading) {
    return <div className="flex justify-center text-cyan-400 ">Loading...</div>;
  }

  // Check if job is available
  if (!job || isError) {
    return <div>Job not found FRONTEND.</div>;
  }

  // Display the job details
  return <JobDetailPage job={job} />;
}

export default JobDetailComponent;

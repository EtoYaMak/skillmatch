import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMyJobs, reset } from "../features/jobs/jobSlice";
import { useDispatch, useSelector } from "react-redux";

function JobUpdatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const job = useSelector((state) => state.jobs.jobs);

  return <div></div>;
}

export default JobUpdatePage;

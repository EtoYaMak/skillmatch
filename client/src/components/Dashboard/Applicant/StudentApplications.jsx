import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentData } from "../../../features/students/studentSlice";
import { getAllJobs } from "../../../features/jobs/jobSlice";
import StudentApplicationsCard from "./StudentApplicationsCard";

const StudentApplications = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.students.studentData);
  const jobs = useSelector((state) => state.jobs.jobs);

  useEffect(() => {
    dispatch(fetchStudentData());
    dispatch(getAllJobs());
  }, [dispatch]);

  const mapAppliedJobsToJobs = () => {
    return student?.appliedJobs?.map((appliedJob) => {
      const matchingJob = jobs.find((job) => job._id === appliedJob.job);
      if (matchingJob) {
        return {
          job: matchingJob,
          status: appliedJob.status,
        };
      }
      return null;
    });
  };

  const mappedAppliedJobs = mapAppliedJobsToJobs();

  return (
    <div className="text-center text-white">
      <h2 className="text-3xl font-semibold mb-4">
        Welcome to Your Student Dashboard
      </h2>
      <h3 className="text-xl font-semibold mb-2">Your Applied Jobs:</h3>
      <div className="space-y-4">
        {mappedAppliedJobs?.map(
          (appliedJob) =>
            appliedJob && (
              <StudentApplicationsCard
                key={appliedJob.job._id}
                job={appliedJob.job}
                status={appliedJob.status}
              />
            )
        )}
      </div>
    </div>
  );
};

export default StudentApplications;

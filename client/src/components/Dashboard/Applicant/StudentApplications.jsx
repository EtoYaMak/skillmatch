import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentData } from "../../../features/students/studentSlice";
import { getAllJobs } from "../../../features/jobs/jobSlice";
import StudentApplicationsCard from "./StudentApplicationsCard";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const StudentApplications = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.students.studentData);
  const jobs = useSelector((state) => state.jobs.jobs);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const [jobsPerPage] = useState(5); // Limit to 5 items per page

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

  // Filter out null values and order the jobs by their ID
  const mappedAppliedJobs = mapAppliedJobsToJobs()
    .filter((appliedJob) => appliedJob !== null)
    .sort((a, b) => a.job._id.localeCompare(b.job._id));

  // Calculate total pages (ensure at least 1 page)
  const totalPages = Math.max(
    1,
    Math.ceil(mappedAppliedJobs.length / jobsPerPage)
  );

  // Slice applied jobs based on pagination (prevent negative index)
  const paginatedAppliedJobs = mappedAppliedJobs.slice(
    Math.max(0, (currentPage - 1) * jobsPerPage),
    Math.min(currentPage * jobsPerPage, mappedAppliedJobs.length)
  );

  // Handle page changes
  const handlePageChange = (newPage) => {
    // Enforce valid page range
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  return (
    <div className="text-center text-black">
      <h3 className="text-xl font-semibold mb-4">Your Applied Jobs</h3>
      <div className="space-y-4">
        {paginatedAppliedJobs?.map(
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
      {/* Pagination controls (example implementation) */}
      <div className="pagination flex flex-row justify-center items-center gap-2 py-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-[3px] px-[5px] py-[5px] font-Poppins border font-medium text-black/70 disabled:text-black/20"
        >
          <FaChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            aria-current={currentPage === index + 1}
            className={`rounded-[3px] px-[9px] py-[2px] font-Poppins text-[13px]   ${
              currentPage === index + 1
                ? "current-page border border-black font-semibold "
                : "border font-medium"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-[3px] px-[5px] py-[5px] font-Poppins border font-medium text-black/70 disabled:text-black/20"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default StudentApplications;

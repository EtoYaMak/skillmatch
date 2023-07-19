import React, { useEffect, useState } from "react";
import SearchComponent from "../components/Search";
import JobBoardComponent from "../components/JobBoardComponent";
import FilterComponent from "../components/Filter/Filter";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs, reset } from "../features/jobs/jobSlice";

function Browse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, isError, message } = useSelector((state) => state.jobs);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const jobsPerPage = 6;

  useEffect(() => {
    dispatch(getAllJobs());
    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  useEffect(() => {
    setCurrentPage(1); // Reset the current page when search query changes
  }, [searchQuery]);

  const filteredJobs = searchQuery
    ? jobs.filter(
        (job) =>
          job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : jobs;

  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredJobs.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="main mx-auto md:max-w-4xl lg:max-w-6xl xl:max-w-7xl px-4 md:px-6 ">
      <div className="h-auto pb-2">
        {/* Search component */}
        <div className="md:flex md:space-x-4 mt-6">
          <div className="md:w-full md:flex md:justify-end">
            <SearchComponent onSearch={handleSearch} />
          </div>
        </div>

        {/* JobBoard Component */}
        <div className="px-4 py-5 ">
          {currentJobs.length === 0 ? (
            <p className="text-2xl text-white tracking-[0.23em] mx-auto h-32 flex justify-center items-center">
              No jobs found
            </p>
          ) : (
            currentJobs.map((job) => (
              <JobBoardComponent job={job} key={job._id} />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mb-5">
          <button
            className={`px-3 py-1 font-medium mr-2 ${
              currentPage === 1
                ? "text-[hsl(44,91%,25%)] border-b-[#f3900b] border-b"
                : "text-[hsl(34,91%,70%)] border-b-[#f3900b] border-b"
            }`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`px-3 py-1 ${
                currentPage === number
                  ? "bg-[#ee6555] shadow-[1px_2px_0px_0px_#f3900b] font-bold mx-1 rounded-sm text-white"
                  : "text-[#fff] bg-[#ee6555] font-medium  mx-1 rounded-sm "
              }`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
          <button
            className={`px-3 py-1 font-medium ml-2 ${
              currentPage === Math.ceil(filteredJobs.length / jobsPerPage)
                ? "text-[hsl(44,91%,25%)] border-b-[hsl(44,91%,25%)] border-b"
                : "text-[hsl(34,91%,70%)] border-b-[hsl(34,91%,70%)] border-b"
            }`}
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredJobs.length / jobsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Browse;

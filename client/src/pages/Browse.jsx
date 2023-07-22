import React, { useEffect, useState } from "react";
import SearchComponent from "../components/Search";
import BrowseJobComponent from "../components/BrowseJobComponent";
/* import FilterComponent from "../components/Filter/Filter"; */
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
  const reversedCurrentJobs = currentJobs.slice().reverse();

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
    <div className="main mx-auto max-w-[1240px] px-4 md:px-6 min-h-fit ">
      <div className="h-fit pb-2">
        {/* Search component */}
        <div className="md:flex md:space-x-4 mt-6">
          <div className="md:w-full md:flex md:justify-end">
            <SearchComponent onSearch={handleSearch} />
          </div>
        </div>

        {/* JobBoard Component */}
        <div className="px-4 py-5 ">
          {reversedCurrentJobs.length === 0 ? (
            <p className="text-2xl text-white tracking-[0.23em] mx-auto h-32 flex justify-center items-center">
              No jobs found
            </p>
          ) : (
            reversedCurrentJobs.map((job) => (
              <BrowseJobComponent job={job} key={job._id} />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mb-2">
          <button
            className={`btn btn-ghost  ${
              currentPage === 1 ? "text-[#939393] " : "text-[#d4d7d7] "
            }`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`px-3 py-1  ${
                currentPage === number
                  ? "bg-[#d0333c]  font-semibold mx-1 rounded-sm text-white"
                  : "text-[#fff] bg-[#1c1f21] font-medium  mx-1 rounded-sm "
              }`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
          <button
            className={` btn btn-ghost  ${
              currentPage === Math.ceil(filteredJobs.length / jobsPerPage)
                ? "text-[#939393] "
                : "text-[#d4d7d7] "
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

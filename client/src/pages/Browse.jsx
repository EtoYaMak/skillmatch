import React, { useEffect, useState } from "react";
import SearchComponent from "../components/Search";
import BrowseJobComponent from "../components/BrowseJobComponent";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs, reset } from "../features/jobs/jobSlice";

function Browse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, isError, message, isLoading } = useSelector(
    (state) => state.jobs
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const jobsPerPage = 7;

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

  /*   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob); */
  // Get current jobs in the reversed order (latest posts first)
  const reversedCurrentJobs = filteredJobs.slice().reverse();

  // Calculate the current page's jobs based on the reversedCurrentJobs

  const currentJobs = reversedCurrentJobs.slice(
    indexOfFirstJob,
    indexOfLastJob
  );

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
  const sortedJobs = [...jobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  if (isLoading) {
    return (
      <div className="w-full flex-1 flex justify-center items-start h-screen">
        <span className="loading loading-spinner text-error w-14 mt-[10%]"></span>
      </div>
    );
  }
  return (
    <div className="main mx-auto max-w-[1240px] px-4 md:px-6 ">
      <div className="h-fit pb-2">
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
            // Reverse the currentJobs array to show latest posts first
            currentJobs.map((job) => (
              <BrowseJobComponent job={job} key={job._id} />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mb-2">
          <button
            className={`rounded-full text-white p-1 mx-2 ${
              currentPage === 1
                ? "bg-black/20" //Next Not Available
                : "bg-black" //Next Available
            }`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdOutlineArrowBackIos />
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`btn btn-circle btn-sm sm:btn-md mx-[1px] ${
                currentPage === number
                  ? "bg-[#000] text-white ring-0"
                  : " bg-[#333] text-white ring-0" //Active Page Number, InActive
              }`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}

          <MdOutlineArrowForwardIos
            className={` rounded-full text-white p-1 mx-2 ${
              currentPage === Math.ceil(filteredJobs.length / jobsPerPage)
                ? "bg-black/20" //Next Not Available
                : "bg-black" //Next Available
            }`}
            size={12}
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredJobs.length / jobsPerPage)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Browse;

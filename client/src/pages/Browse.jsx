import React, { useEffect, useState } from "react";
import SearchComponent from "../components/Misc/Search";
import BrowseJobComponent from "../components/Job/Components/BrowseJobComponent";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs, reset } from "../features/jobs/jobSlice";
import SortingFilter from "../components/Job/Components/BrowseFilters/SortingFilter";

function Browse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, isError, message, isLoading } = useSelector(
    (state) => state.jobs
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("none");

  const jobsPerPage = 7;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sortParam = queryParams.get("sort");
    if (["none", "24hours", "3days", "7days"].includes(sortParam)) {
      setSortOption(sortParam);
    }
  }, []);

  useEffect(() => {
    navigate(`?sort=${sortOption}`);
  }, [sortOption, navigate]);

  useEffect(() => {
    dispatch(getAllJobs(sortOption));
    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch, sortOption]);

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  useEffect(() => {
    setCurrentPage(1); // Reset the current page when the search query changes
  }, [searchQuery]);

  const filteredJobs = searchQuery
    ? jobs.filter((job) => {
        const lowerCaseQuery = searchQuery.toLowerCase();

        return (
          job.position.toLowerCase().includes(lowerCaseQuery) ||
          job.company.toLowerCase().includes(lowerCaseQuery) ||
          job.city.toLowerCase().includes(lowerCaseQuery) ||
          job.skills.some((skill) =>
            skill.toLowerCase().includes(lowerCaseQuery)
          )
        );
      })
    : jobs;

  const sortedJobs = filteredJobs.slice().sort((a, b) => {
    const now = new Date();
    const postedAtA = new Date(a.postedAt);
    const postedAtB = new Date(b.postedAt);

    switch (sortOption) {
      case "24hours":
        // Sort by jobs posted in the last 24 hours
        return now - postedAtA <= 24 * 60 * 60 * 1000 &&
          now - postedAtB <= 24 * 60 * 60 * 1000
          ? postedAtB - postedAtA
          : now - postedAtA - (now - postedAtB);
      case "3days":
        // Sort by jobs posted in the last 3 days
        return now - postedAtA <= 3 * 24 * 60 * 60 * 1000 &&
          now - postedAtB <= 3 * 24 * 60 * 60 * 1000
          ? postedAtB - postedAtA
          : now - postedAtA - (now - postedAtB);
      case "7days":
        // Sort by jobs posted in the last 7 days
        return now - postedAtA <= 7 * 24 * 60 * 60 * 1000 &&
          now - postedAtB <= 7 * 24 * 60 * 60 * 1000
          ? postedAtB - postedAtA
          : now - postedAtA - (now - postedAtB);
      default:
        // Default sorting (latest first)
        return -1;
    }
  });

  // Get current jobs in the reversed order (latest posts first)
  const reversedCurrentJobs = sortedJobs.slice().reverse();

  // Calculate the current page's jobs based on the reversedCurrentJobs
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Get page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedJobs.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

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
        <div className="flex w-full justify-center items-center min-h-max mt-6">
          <div className="flex justify-end flex-1">
            <SearchComponent onSearch={handleSearch} />
          </div>
          <div className="min-h-max">
            <SortingFilter
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
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
              <BrowseJobComponent job={job} key={job._id} />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="join bg-white text-black w-fit mx-auto flex  ">
          <button
            className="join-item btn btn-ghost btn-sm disabled:text-black/50 disabled:bg-zinc-300"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
          {Array.from({
            length: Math.ceil(sortedJobs.length / jobsPerPage),
          }).map((page, index) => (
            <button
              key={index + 1}
              className={`btn-sm ${
                currentPage === index + 1
                  ? "join-item btn btn-ghost text-white bg-black/80  text-lg "
                  : "join-item btn btn-ghost "
              } `}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="join-item btn btn-ghost btn-sm disabled:text-black/50 disabled:bg-zinc-300"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(sortedJobs.length / jobsPerPage)
            }
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}

export default Browse;

import React, { useEffect, useState } from "react";
import { SAdeleteJob } from "../../../features/jobs/jobSlice";
import { FaEdit, FaUsers, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import SortingFilter from "../../Job/Components/BrowseFilters/SortingFilter";
import Location from "../../Job/Components/BrowseFilters/Location";
import PayRange from "../../Job/Components/BrowseFilters/PayRange";
import SearchCat from "../../Job/Components/BrowseFilters/SearchCat";
import SearchComponent from "../../Misc/Search";

function AllJobsSA({ alljobs, SAuser }) {
  const dispatch = useDispatch();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortBy, setSortBy] = useState("LATEST");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  const handleSortChange = (selectedValue) => {
    setSortBy(selectedValue);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  useEffect(() => {
    // Apply filters
    let filtered = [...alljobs];
    if (searchQuery !== "") {
      filtered = filtered.filter(
        (job) =>
          job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Category
    if (categoryFilter !== "") {
      filtered = filtered.filter((job) => job.department === categoryFilter);
    }

    // Location
    if (locationFilter !== "") {
      filtered = filtered.filter((job) => job.country === locationFilter);
    }

    // Salary
    if (salaryFilter !== "") {
      filtered = filtered.filter((job) => job.salary === salaryFilter);
    }

    // Sort
    if (sortBy === "ASCENDING") {
      filtered.sort((a, b) =>
        a.position
          .trim()
          .toLowerCase()
          .localeCompare(b.position.trim().toLowerCase())
      );
    } else if (sortBy === "DESCENDING") {
      filtered.sort((a, b) =>
        b.position
          .trim()
          .toLowerCase()
          .localeCompare(a.position.trim().toLowerCase())
      );
    } else {
      // Default to sorting by latest
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Update filtered jobs
    setFilteredJobs(filtered);
  }, [
    alljobs,
    categoryFilter,
    locationFilter,
    salaryFilter,
    sortBy,
    currentPage,
    searchQuery,
  ]);

  const totalPageCount = Math.ceil(filteredJobs.length / jobsPerPage);
  const pageNumbers = Array.from({ length: totalPageCount }).map(
    (_, index) => index + 1
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleDeleteJob = (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmDelete) {
      if (SAuser) {
        dispatch(SAdeleteJob(jobId));
      } else {
        console.error("Unable to Delete Job");
      }
    }
  };

  return (
    <div className="bg-transparent font-Poppins max-w-[1240px] mx-auto">
      <h1 className="text-center text-2xl font-Poppins">All Posted Jobs</h1>
      <div className="flex sm:w-full justify-center items-center min-h-max max-w-md mx-auto mb-2 ">
        <div className="flex justify-end flex-1 ">
          <SearchComponent onSearch={handleSearch} className="h-24" />
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-2 sm:gap-1">
        <div className="flex flex-row gap-2 min-[850px]:justify-between max-[850px]:w-full">
          <Location setLocationFilter={setLocationFilter} />
          <SearchCat setCategoryFilter={setCategoryFilter} />
        </div>
        <div className="flex flex-row justify-between gap-2 w-full min-[850px]:w-fit">
          <PayRange setSalaryFilter={setSalaryFilter} />
          <SortingFilter handleSortChange={handleSortChange} />
        </div>
      </div>

      <div className="flex flex-col w-full">
        {Array.isArray(currentJobs) ? (
          currentJobs.map((job) => (
            <div
              key={job._id}
              className="flex flex-row bg-transparent shadow-[0px_2px_8px_rgb(0,0,0,0.3)] my-2 hover:text-black rounded-xl "
            >
              <figure className="bg-transparent mx-2 flex justify-center items-center">
                <img
                  src={job.logo}
                  alt={job.position}
                  className="h-20 mask mask-circle"
                />
              </figure>

              <div className="flex flex-row justify-between w-full items-center">
                <div className="">
                  <a
                    href={`/jobs/${job._id}`}
                    className="text-lg text-start font-semibold select-none hover:underline decoration-slate-900/20 underline-offset-2"
                  >
                    {job.position}
                  </a>
                  <p className="text-start text-lg select-none flex flex-col ">
                    {job.company}
                  </p>
                </div>

                <div className=" justify-center">
                  <ul className="menu menu-vertical sm:menu-horizontal p-2 bg-white/5 rounded-box items-center">
                    <li>
                      <Link
                        to={`/jobapplicants/${job._id}`}
                        className="hover:bg-black hover:text-white"
                      >
                        <FaUsers size={16} />
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        className="hover:bg-black hover:text-white"
                        to={`/jobs/${job._id}/update`}
                      >
                        <FaEdit size={16} />
                      </Link>
                    </li>
                    <li>
                      <button
                        className=" hover:bg-black hover:text-white"
                        onClick={() => handleDeleteJob(job._id)}
                      >
                        <FaTrash size={16} />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading All Jobs...</p>
        )}{" "}
      </div>
      {/* Pagination outside the job listings div */}
      <div className="pagination flex flex-wrap justify-center items-center">
        {currentPage > 1 && (
          <button
            className="btn btn-square btn-xs text-sm mx-[1px] bg-black text-white"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            {"<"}
          </button>
        )}
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn btn-square btn-xs text-sm mx-[1px] ${
              currentPage === pageNumber
                ? "current-page bg-black text-white"
                : "bg-black/5 text-black"
            }`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        {currentPage < totalPageCount && (
          <button
            className="btn btn-square btn-xs text-sm mx-[1px] bg-black text-white"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default AllJobsSA;

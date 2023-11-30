import React, { useEffect, useState } from "react";
import { SAdeleteJob } from "../../../features/jobs/jobSlice";
import { FaEdit, FaUsers, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import SortingFilter from "../../Job/Components/BrowseFilters/SortingFilter";
import Location from "../../Job/Components/BrowseFilters/Location";
import PayRange from "../../Job/Components/BrowseFilters/PayRange";
import SearchCat from "../../Job/Components/BrowseFilters/SearchCat";
function AllJobsSA({ alljobs, SAuser }) {
  const dispatch = useDispatch();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortBy, setSortBy] = useState("LATEST");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;
  const handleSortChange = (selectedValue) => {
    // Handle the sorting change here, for example, update the sortBy state
    setSortBy(selectedValue);
  };
  useEffect(() => {
    // Apply filters
    let filtered = [...alljobs];

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

    // Apply pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filtered.slice(indexOfFirstJob, indexOfLastJob);

    setFilteredJobs(currentJobs);
  }, [
    alljobs,
    categoryFilter,
    locationFilter,
    salaryFilter,
    sortBy,
    currentPage,
  ]);

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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className=" bg-transparent font-Poppins max-w-[1240px] mx-auto  ">
      <h1 className="text-center text-xl font-Poppins">All Jobs</h1>
      <div className="w-full flex justify-between flex-col sm:flex-row gap-2 sm:gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Location setLocationFilter={setLocationFilter} />
          <SearchCat setCategoryFilter={setCategoryFilter} />
        </div>
        <div className="w-full flex  justify-center sm:justify-between flex-wrap gap-2">
          <PayRange setSalaryFilter={setSalaryFilter} />
          <SortingFilter handleSortChange={handleSortChange} />
        </div>
      </div>

      <div className="flex flex-col w-full">
        {Array.isArray(filteredJobs) ? (
          filteredJobs.map((job) => (
            <div
              key={job._id}
              className="flex flex-row bg-transparent shadow-[0px_2px_8px_rgb(0,0,0,0.3)] my-2 hover:text-black rounded-xl gap-4"
            >
              <figure className="bg-transparent min-w-fit h-20 mx-2 flex justify-center items-center">
                <img
                  src={job.logo}
                  alt={job.position}
                  className="h-16 mask mask-circle"
                />
              </figure>

              <div className="flex flex-row justify-between w-full items-center">
                <div>
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
                  <ul className="menu menu-horizontal p-2 bg-white/5 rounded-box items-center">
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
        )}
        {/* Add pagination component */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(alljobs.length / jobsPerPage) }).map(
            (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default AllJobsSA;

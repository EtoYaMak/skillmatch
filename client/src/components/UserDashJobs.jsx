import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Removed useSelector since it's not used here
import { deleteJob, getMyJobs } from "../features/jobs/jobSlice";
import { FaClock, FaCog, FaTrash, FaTimes } from "react-icons/fa";
import { FaEdit, FaUsers } from "react-icons/fa";

function UserDashJobs({ user, jobs, createdAt }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState({});

  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  const handleDeleteOption = (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmDelete) {
      dispatch(deleteJob(jobId));
    }
  };
  const handleCloseOption = (jobId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [jobId]: false,
    }));
  };

  const handleEdit = (jobId) => {
    navigate(`/jobs/${jobId}/update`);
  };

  const toggleDropdown = (jobId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId],
    }));
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Close dropdown for all job IDs
        setDropdownOpen({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const currentDate = new Date();

  return (
    <div className="flex bg-transparent justify-center p-4">
      <div className="bg-inherit w-full max-w-[1240px] py-6">
        <h1 className="text-2xl font-semibold text-center text-[#d4d7d7] font-Inter select-none">
          Welcome, {user.name}
        </h1>
        {jobs.length > 0 ? (
          <>
            <p className="text-xl text-center text-gray-400 font-Inter uppercase p-2 select-none">
              Your job posts
            </p>
            <div className="mt-2">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="Main Tile w-full bg-black/40 hover:bg-black/50 rounded-lg my-2"
                >
                  <div
                    ref={dropdownRef}
                    className="Second flex flex-col md:space-y-0  md:flex-row  md:justify-between w-full md:items-center px-1 py-4 bg-transparent"
                  >
                    {/* JobCard */}
                    <Link
                      to={`/jobs/${job._id}`}
                      className="w-[80%] bg-transparent  "
                    >
                      <div className="ThirdOne flex flex-row space-x-2 justify-evenly  w-full bg-transparent">
                        <div className="flex bg-transparent items-center w-full">
                          <div className="bg-transparent min-w-max p-2 ">
                            <img
                              src={job.logo}
                              alt={job.position}
                              className="bg-transparent w-24 h-24 rounded-full object-cover  "
                            />
                          </div>

                          <div className="bg-transparent w-full p-2">
                            <h2 className="text-xl font-bold tracking-wider w-fit bg-inherit text-[#d0333c]">
                              {job.position}
                            </h2>
                            <h3 className="text-lg tracking-wider font-semibold text-[#d4d7d7] bg-inherit">
                              {job.company}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                    {/* JobCard End*/}

                    <div className="flex w-full md:w-1/2 justify-around md:justify-evenly items-center bg-transparent">
                      {/* TIME */}
                      <div className="ThirdTwo flex flex-row md:flex-col items-center space-x-2 bg-transparent select-none  font-Inter gap-1">
                        <FaClock
                          className="bg-inherit text-[#d4d7d7]  hover:text-[#d0333c] duration-200 ease-in-out"
                          size={14}
                        />
                        <span className="text-md text-[#d4d7d7] hover:text-[#d0333c] bg-inherit duration-200 ease-in-out">
                          {calculateTimeSinceJobWasPosted(
                            currentDate,
                            job.createdAt
                          )}
                        </span>
                        <span className="text-sm text-zinc-400 hover:text-[#d0333c] bg-inherit duration-200 ease-in-out">
                          {formatCreatedAtDate(job.createdAt)}
                        </span>
                      </div>
                      {/* TIME END*/}

                      {/* COG WHEEL */}
                      <div className="ThirdThree flex flex-col items-center bg-inherit gap-1">
                        <h1 className="text-gray-400 font-Inter pointer-events-none opacity-0">
                          Settings
                        </h1>
                        <button
                          className="cog-wheel hover:bg-[#d0333c] duration-300 ease-in-out rounded-full w-12 h-12 flex items-center justify-center "
                          onClick={() => toggleDropdown(job._id)}
                        >
                          <FaCog
                            size={24}
                            className="text-[#fff] bg-transparent pointer-events-non"
                          />
                        </button>
                        {dropdownOpen[job._id] && (
                          <div className="dropdown-menu absolute mt-20 sm:ml-[1em]  bg-[#1c1f21]/70 backdrop-blur-sm rounded-xl shadow-sm  text-white p-2 animate-fadeIn">
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2  rounded-box w-fit font-Inter"
                            >
                              <li>
                                <a
                                  //onClick={() => handleEdit(job._id)}
                                  //className="text-white hover:text-[#d0333c]"
                                  className="text-gray-500 hover:text-gray-500 hover:cursor-not-allowed hover:bg-transparent"
                                >
                                  <FaEdit className="mr-2 w-5 h-5 bg-transparent" />
                                  Edit
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() => handleDeleteOption(job._id)}
                                  className="text-white hover:text-[#d0333c]"
                                >
                                  <FaTrash className="mr-2 w-5 h-5 bg-transparent" />
                                  Delete
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() => handleCloseOption(job._id)}
                                  className="text-white hover:text-[#d0333c]"
                                >
                                  <FaTimes className="mr-2 w-5 h-5 bg-transparent" />
                                  Close
                                </a>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                      {/* COG WHEEL END */}
                      <div className="flex flex-col justify-center items-center gap-1">
                        <h1 className="text-gray-400 font-Inter pointer-events-none">
                          Applicants
                        </h1>
                        <Link
                          to={`/jobapplicants/${job._id}`}
                          className=" hover:bg-[#d0333c] duration-300 ease-in-out rounded-full w-12 h-12 flex items-center justify-center "
                        >
                          <FaUsers
                            size={24}
                            className="text-[#fff] bg-transparent pointer-events-none"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-xl text-gray-600 text-center">
              You have not posted any jobs.
            </p>
          </>
        )}
        <div className="flex justify-center mt-6">
          <Link
            to="/post"
            className="btn btn-outline text-[#fff]/80 border-[#d0333c] hover:bg-[#d0333c] hover:border-[#d4d7d7] hover:text-[#d4d7d7]
                   flex mx-auto text-xl font-Inter tracking-widest w-[10em] transition-colors duration-200 ease-in-out"
          >
            Post {jobs.length > 0 ? "A" : ""} Job
          </Link>
        </div>
      </div>
    </div>
  );
}

function calculateTimeSinceJobWasPosted(currentDate, createdAt) {
  const jobDate = new Date(createdAt);
  const timeDifference = currentDate - jobDate;
  const minutesSinceJobWasPosted = Math.floor(timeDifference / (1000 * 60));
  const hoursSinceJobWasPosted = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysSinceJobWasPosted = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24)
  );
  const weeksSinceJobWasPosted = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24 * 7)
  );

  if (weeksSinceJobWasPosted > 0) {
    return `${weeksSinceJobWasPosted} Week${
      weeksSinceJobWasPosted > 1 ? "s" : ""
    } ago`;
  } else if (daysSinceJobWasPosted > 0) {
    return `${daysSinceJobWasPosted} Day${
      daysSinceJobWasPosted > 1 ? "s" : ""
    } ago`;
  } else if (hoursSinceJobWasPosted > 0) {
    return `${hoursSinceJobWasPosted} Hour${
      hoursSinceJobWasPosted > 1 ? "s" : ""
    } ago`;
  } else {
    return `${minutesSinceJobWasPosted} Minute${
      minutesSinceJobWasPosted > 1 ? "s" : ""
    } ago`;
  }
}

// Define a function to format the date
const formatCreatedAtDate = (createdAt) => {
  const createdAtDate = new Date(createdAt);
  const day = createdAtDate.getDate();
  const month = createdAtDate.getMonth() + 1; // Months are zero-indexed
  const year = createdAtDate.getFullYear();
  return `${day}/${month}/${year}`;
};

export default UserDashJobs;
{
  /*                             <button
                              className="dropdown-option flex items-center rounded-md py-2 px-4 w-full text-[#fff] hover:bg-black/80 hover:text-[#d0333c] hover:font-semibold transition duration-300"
                              onClick={() => handleEdit(job._id)}
                            >
                              <FaEdit className="mr-2 w-5 h-5 bg-transparent" />
                              Edit
                            </button>
                            <button
                              className="dropdown-option flex items-center rounded-md py-2 px-4 w-full text-[#fff] hover:bg-black/80 hover:text-[#d0333c] hover:font-semibold transition duration-300"
                              onClick={() => handleDeleteOption(job._id)}
                            >
                              <FaTrash className="mr-2 w-5 h-5 bg-transparent" />
                              Delete
                            </button>

                            <button
                              className="dropdown-option flex items-center rounded-md py-2 px-4 w-full text-[#fff] hover:bg-black/80 hover:text-[#d0333c] hover:font-semibold transition duration-300"
                              onClick={() => handleCloseOption(job._id)}
                            >
                              <FaTimes className="mr-2 w-5 h-5 bg-transparent" />
                              Close
                            </button> */
}

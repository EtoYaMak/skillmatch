import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteJob, getMyJobs, reset } from "../features/jobs/jobSlice";
import { FaClock, FaCog, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

function UserDash() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { jobs, isError, message } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getMyJobs());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

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

  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggleDropdown = (jobId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId],
    }));
  };

  const currentDate = new Date();

  return (
    <div className="flex bg-transparent justify-center p-4">
      <div className="bg-inherit w-full max-w-screen-md py-6">
        <h1 className="text-2xl font-semibold text-center">
          Welcome, {user.name}
        </h1>
        {jobs.length > 0 ? (
          <>
            <p className="text-xl text-center text-gray-600 uppercase p-2">
              Your job posts
            </p>
            <div className="mt-2">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="Main Tile w-full py-2 bg-zinc-900 hover:bg-gray-700 rounded-lg my-2"
                >
                  <div className="Second flex flex-col md:flex-row justify-between items-center px-1 py-4 bg-inherit">
                    {/* JobCard */}
                    <Link to={`/jobs/${job._id}`}>
                      <div className="ThirdOne flex items-center px-2 space-x-6 bg-inherit">
                        <img
                          src={job.logo}
                          alt={job.position}
                          className="w-20 h-20 rounded-full"
                        />
                        <div className="bg-transparent">
                          <h2 className="text-xl font-bold  w-64 bg-inherit text-sky-600">
                            {job.position}
                          </h2>
                          <h3 className="text-lg text-gray-400 bg-inherit">
                            {job.company}
                          </h3>
                        </div>
                      </div>
                    </Link>
                    {/* JobCard End*/}

                    <div className="flex  w-1/2 justify-evenly bg-inherit">
                      {/* TIME */}
                      <div className="ThirdTwo flex flex-row md:flex-row items-center space-x-2 bg-transparent">
                        <FaClock className="text-gray-200 bg-inherit" />
                        <span className="text-md text-gray-200 bg-inherit">
                          {calculateTimeSinceJobWasPosted(
                            currentDate,
                            job.createdAt
                          )}
                        </span>
                      </div>
                      {/* TIME END*/}

                      {/* COG WHEEL */}
                      <div className="ThirdThree flex items-center bg-inherit pr-5">
                        <button
                          className="cog-wheel bg-blue-500 hover:bg-blue-800 font-semibold rounded-full w-12 h-12 flex items-center justify-center "
                          onClick={() => toggleDropdown(job._id)}
                        >
                          <FaCog className="w-5 h-5 text-white bg-transparent" />
                        </button>
                        {dropdownOpen[job._id] && (
                          <div className="dropdown-menu absolute mt-[10em] sm:ml-[3.2em]  bg-zinc-300 rounded shadow-sm shadow-gray-400/50 text-white p-2 animate-fadeIn ">
                            {/*                             <Link
                              to={`/jobs/${job._id}/update`}
                              className="dropdown-option flex items-center rounded-md py-2 px-4 w-full text-gray-800 hover:bg-gray-600 hover:text-white hover:font-semibold transition duration-300"
                            >
                              <FaEdit className="mr-2 w-5 h-5 bg-transparent" />
                              Edit
                            </Link> */}
                            <button
                              className="dropdown-option flex items-center rounded-md py-2 px-4 w-full text-gray-800 hover:bg-gray-600 hover:text-white hover:font-semibold transition duration-300"
                              onClick={() => handleDeleteOption(job._id)}
                            >
                              <FaTrash className="mr-2 w-5 h-5 bg-transparent" />
                              Delete
                            </button>
                            <button
                              className="dropdown-option flex items-center rounded-md py-2 px-4 w-full text-gray-800 hover:bg-gray-600 hover:text-white hover:font-semibold transition duration-300"
                              onClick={() => handleCloseOption(job._id)}
                            >
                              <FaTimes className="mr-2 w-5 h-5 bg-transparent" />
                              Close
                            </button>
                          </div>
                        )}
                      </div>
                      {/* COG WHEEL END */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-xl text-gray-600">
              You have not posted any jobs.
            </p>
          </>
        )}
        <div className="flex justify-center mt-6">
          <Link
            to="/post"
            className="py-2 px-4 text-lg font-medium bg-blue-500 text-white rounded hover:bg-blue-900 hover:text-white hover:font-semibold transition-colors duration-200 ease-in-out"
          >
            Click Here to Post a {jobs.length > 0 ? "new" : ""} Job
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
    return `${weeksSinceJobWasPosted} Weeks ago`;
  } else if (daysSinceJobWasPosted > 0) {
    return `${daysSinceJobWasPosted} Days ago`;
  } else if (hoursSinceJobWasPosted > 0) {
    return `${hoursSinceJobWasPosted} hours ago`;
  } else {
    return `${minutesSinceJobWasPosted} minutes ago`;
  }
}

export default UserDash;

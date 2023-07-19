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
                  className="Main Tile w-full bg-black/40 hover:bg-black/90 rounded-lg my-2"
                >
                  <div className="Second flex flex-col md:space-y-0  md:flex-row  md:justify-between w-full md:items-center px-1 py-4 bg-transparent">
                    {/* JobCard */}
                    <Link
                      to={`/jobs/${job._id}`}
                      className="w-[80%] bg-transparent  "
                    >
                      <div className="ThirdOne flex flex-row space-x-2 justify-evenly  w-full bg-transparent">
                        <div className="flex bg-transparent items-center w-full">
                          <div className="bg-transparent object-contain w-fit p-2 ">
                            <img
                              src={job.logo}
                              alt={job.position}
                              className="bg-transparent object-cover md:w-28 md:h-28 h-[90px] w-[90px] rounded-sm  "
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
                      <div className="ThirdTwo flex flex-row md:flex-row items-center space-x-2 bg-transparent">
                        <FaClock
                          className="text-[#d4d7d7] bg-inherit"
                          size={24}
                        />
                        <span className="text-lg text-[#d4d7d7] bg-inherit">
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
                          className="cog-wheel bg-[#aba6a6]/80 hover:bg-[#d0333c]  rounded-full w-12 h-12 flex items-center justify-center "
                          onClick={() => toggleDropdown(job._id)}
                        >
                          <FaCog
                            size={24}
                            className="text-[#fff] bg-transparent pointer-events-none"
                          />
                        </button>
                        {dropdownOpen[job._id] && (
                          <div className="dropdown-menu absolute mt-[10em] sm:ml-[1em]  bg-[#1c1f21]/70 backdrop-blur-sm rounded shadow-sm  text-white p-2 animate-fadeIn ">
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

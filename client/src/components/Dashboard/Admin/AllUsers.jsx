import React, { useEffect, useState } from "react";
import SearchComponent from "../../Misc/Search";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit, FaUsers, FaTrash } from "react-icons/fa";
import { SAdeleteJob } from "../../../features/jobs/jobSlice";

function AllUsers({ users }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const usersPerPage = 10;
  const SAuser = useSelector((state) => state.SAuser.SAuser);
  const jobs = useSelector((state) => state.jobs.alljobs);
  /*   const originalUsers = [
    { _id: "1", name: "User 1", email: "user1@example.com" },
    { _id: "2", name: "User 2", email: "user2@gmail.com" },
    { _id: "3", name: "User 3", email: "user3@example.com" },
  ];

  // Function to duplicate users
  const duplicateUsers = (users, times) => {
    const duplicatedUsers = [];
    for (let i = 0; i < times; i++) {
      duplicatedUsers.push(
        ...users.map((user) => ({ ...user, _id: user._id + (i + 1) }))
      );
    }
    return duplicatedUsers;
  };

  const users = duplicateUsers(originalUsers, 15); // Duplicate users 5 times */

  useEffect(() => {
    setCurrentPage(1); // Reset the current page when search query changes
  }, [searchQuery]);

  const filteredUsers = searchQuery
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const paginatedUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
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
    <div className="text-xl text-center font-Poppins  min-h-screen flex flex-col">
      <div className="">
        {/* flex-grow to keep pagination AT BOTTOM OF SCREEN ALWAYS */}
        <div className="h-24 w-full flex flex-row items-center justify-start px-2 bg-white">
          <div className="w-full">
            <SearchComponent onSearch={handleSearch} />
          </div>
        </div>
        <h2 className="font-semibold text-xl">All Users</h2>
        <div className="flex flex-col items-center justify-start w-full bg-white rounded-xl">
          <div className="flex flex-row justify-between items-center px-4 font-Poppins font-bold py-2 w-full border-b border-black">
            <h1 className="w-1/3 text-start">Name</h1>
            <h1 className="w-1/3 text-start">Email</h1>
            <h1 className="w-1/3 text-start">Jobs</h1>
          </div>
          {Array.isArray(paginatedUsers) ? (
            paginatedUsers.map((user) => (
              <div
                key={user?._id}
                className="flex items-start justify-between px-4 m-2 w-full text-star hover:scale-[100.5%] duration-200 ease-in-out "
              >
                <div className="collapse border border-black/10 shadow-[0px_3px_4px_rgb(0,0,0,0.1)]">
                  <input type="checkbox" className="w-full z-50" />
                  <div className="flex flex-row collapse-title text-xl font-medium text-black  z-10">
                    <h3 className="font-bold w-1/3 text-start">{user?.name}</h3>
                    <p className="text-start w-1/3">Email: {user?.email}</p>
                    <p className="w-1/3 text-start">View Jobs</p>
                  </div>
                  <div className="collapse-content flex flex-col justify-start items-start bg-[#d4d7d7] overflow-hidden max-h-80 overflow-y-scroll">
                    {Array.isArray(jobs) ? (
                      jobs
                        .filter((job) => job.user === user?._id)
                        .map((filteredJob) => (
                          <div
                            key={filteredJob._id}
                            className="job-item flex flex-row w-full bg-white p-2 rounded-3xl justify-between mt-1 z-0 "
                          >
                            {/* job information */}
                            <div className="flex flex-row gap-4">
                              <div>
                                <img
                                  src={filteredJob.logo}
                                  alt=""
                                  className="mask-circle mask w-14"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-around">
                                <Link
                                  to={`/jobs/${filteredJob._id}`}
                                  className="font-bold "
                                >
                                  {filteredJob.position}
                                </Link>
                                <p className="text-sm">{filteredJob.company}</p>
                              </div>
                            </div>

                            <ul className="menu menu-horizontal bg-white/5 rounded-box">
                              <li className="indicator ">
                                <Link
                                  to={`/jobapplicants/${filteredJob._id}`}
                                  target="_blank"
                                  className="hover:bg-black hover:text-white"
                                >
                                  <FaUsers size={16} />
                                </Link>
                              </li>
                              <li className="">
                                <Link
                                  className="hover:bg-black hover:text-white"
                                  to={`/jobs/${filteredJob._id}/update`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <FaEdit size={16} />
                                </Link>
                              </li>
                              <li className="pointer-events-none">
                                {/* DISABLED */}
                                <button
                                  className=" hover:bg-black hover:text-white"
                                  onClick={() =>
                                    handleDeleteJob(filteredJob._id)
                                  }
                                >
                                  <FaTrash size={16} />
                                </button>
                              </li>
                            </ul>
                          </div>
                        ))
                    ) : (
                      <p>No jobs found for this user.</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading Users...</p>
          )}
        </div>
      </div>
      <div className="join bg-white text-black w-fit mx-auto  ">
        <button
          className="join-item btn btn-ghost disabled:text-black/50 disabled:bg-zinc-300"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        {Array.from({
          length: Math.ceil(filteredUsers.length / usersPerPage),
        }).map((page, index) => (
          <button
            key={index + 1}
            className="join-item btn btn-ghost"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="join-item btn btn-ghost disabled:text-black/50 disabled:bg-zinc-300"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredUsers.length / usersPerPage)
          }
        >
          »
        </button>
      </div>
    </div>
  );
}

export default AllUsers;

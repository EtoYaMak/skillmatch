import React, { useEffect, useState } from "react";
import SearchComponent from "../../Misc/Search";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit, FaUsers, FaTrash } from "react-icons/fa";
import { SAdeleteJob } from "../../../features/jobs/jobSlice";

function UserTable({ paginatedUsers, jobs, handleDeleteJob }) {
  return (
    <table className="border-collapse ">
      <thead>
        <tr className="border-b">
          <th className="text-start px-4 py-2 sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/3">
            Name
          </th>
          <th className="text-start px-4 py-2 sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/3">
            Jobs
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(paginatedUsers) ? (
          paginatedUsers.map((user) => (
            <tr key={user?._id} className="border-b hover:bg-gray-100 w-fit">
              <td className="px-4 py-2 font-bold text-start">
                <p className="text-xl">{user?.name}</p>{" "}
                <p className="text-xs">{user?.email}</p>
              </td>

              <td className="px-4 py-2 text-start">
                <h1>View Jobs</h1>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="px-4 py-2">
              Loading Users...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function Pagination({
  currentPage,
  pageNumbers,
  totalPageCount,
  handlePageClick,
}) {
  return (
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
  );
}
function AllUsers({ users, paginatedUsers }) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
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

  const usersPerPage = 8;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

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
  const totalPageCount = Math.ceil(filteredUsers.length / usersPerPage);
  const pageNumbers = Array.from({ length: totalPageCount }).map(
    (_, index) => index + 1
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

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
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="text-xl text-center font-Poppins min-h-screen flex flex-col ">
      <div className="h-24 w-full flex flex-row items-center justify-start px-2 bg-white">
        <div className="w-full">{/* Your SearchComponent here */}</div>
      </div>
      <h2 className="font-semibold text-xl">All Users</h2>
      <div className="flex flex-col  bg-white rounded-xl">
        <UserTable
          paginatedUsers={currentUsers}
          jobs={jobs}
          handleDeleteJob={handleDeleteJob}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        pageNumbers={pageNumbers}
        totalPageCount={totalPageCount}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}

export default AllUsers;

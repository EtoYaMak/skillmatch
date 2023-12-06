import React, { useEffect, useState } from "react";
import SearchComponent from "../../Misc/Search";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit, FaUsers, FaTrash } from "react-icons/fa";
import { SAdeleteJob } from "../../../features/jobs/jobSlice";
// Define a function to format the date
const formatCreatedAtDate = (createdAt) => {
  const createdAtDate = new Date(createdAt);
  const day = createdAtDate.getDate();
  const month = createdAtDate.getMonth() + 1; // Months are zero-indexed
  const year = createdAtDate.getFullYear();
  return `${day}/${month}/${year}`;
};
function UserTable({ paginatedUsers, jobs }) {
  return (
    <div className="overflow-x-auto ">
      <table className="table ">
        {/* head */}
        <thead className="bg-black text-white ">
          <tr>
            <th className="border-x border-white">ID</th>
            <th className="border-x border-white">Name</th>
            <th className="border-x border-white">Posted Jobs</th>
            <th className="border-x border-white">Email</th>
            <th className="border-x border-white">Activation</th>
            <th className="border-x border-white">Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(paginatedUsers) ? (
            paginatedUsers.map((user, index) => (
              <>
                <tr className="">
                  <th className="bg-black/5 font-semibold">{index}</th>
                  <td className="">
                    <p className="">{user?.name}</p>
                  </td>
                  <td className="bg-black/5 font-semibold">
                    <Link
                      to={`/user-jobs/${user._id}`}
                      className="hover:font-bold"
                    >
                      View
                    </Link>
                  </td>
                  <td className="">
                    <p>{user.email}</p>
                  </td>
                  <td className="bg-black/5 font-semibold">
                    <p
                      className={`text-${
                        user?.isActive ? "green" : "red"
                      }-600 font-Poppins `}
                    >
                      {user?.isActive ? "Yes" : "No"}
                    </p>
                  </td>
                  <td className="">{formatCreatedAtDate(user?.createdAt)}</td>
                </tr>
              </>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="">
                Loading Users...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function Pagination({
  currentPage,
  pageNumbers,
  totalPageCount,
  handlePageClick,
}) {
  return (
    <div className="pagination flex flex-wrap justify-end items-center my-8 max-w-[960px] mx-auto w-full">
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
          className={`btn btn-square btn-xs text-sm mx-[1px]  ${
            currentPage === pageNumber
              ? "current-page bg-black hover:bg-white text-white hover:text-black  hover:scale-105 "
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
function AllUsers({ alljobs, users, paginatedUsers }) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const SAuser = useSelector((state) => state.SAuser.SAuser);
  const jobs = useSelector((state) => state.jobs.alljobs);

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
      <div className="flex flex-col   bg-white rounded-xl">
        <UserTable
          paginatedUsers={currentUsers}
          jobs={jobs}
          alljobs={alljobs}
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

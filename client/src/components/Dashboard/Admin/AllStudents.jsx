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
function UserTable({ paginatedStudents, jobs }) {
  return (
    <table className="border-collapse max-w-xl">
      <thead>
        <tr className="border-b">
          <th className="text-start px-4 py-2 sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/3">
            Name
          </th>
          <th className="text-start px-4 py-2 sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/3 ">
            Applications
          </th>
          <th className="text-start px-4 py-2 sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/3">
            Account Status
          </th>
          <th className="text-start px-4 py-2 sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/3">
            Creation Date
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(paginatedStudents) ? (
          paginatedStudents.map((student) => (
            <tr key={student?._id} className="border-b hover:bg-gray-100 w-fit">
              <td className="px-4 py-2 font-bold text-start">
                <p className="text-xl">{student?.name}</p>{" "}
                <p className="text-xs">{student?.email}</p>
              </td>

              <td className="px-4 py-2 text-start w-fit">
                <Link
                  to={`/student-applied-jobs/${student._id}`}
                  className="text-lg hover:font-medium"
                >
                  View Applied Jobs
                </Link>
              </td>
              <td className="px-4 py-2  text-start">
                {student?.isActive === true
                  ? "Account Activated"
                  : "Account Not Activated"}
              </td>
              <td className="px-4 py-2  text-start">
                {formatCreatedAtDate(student?.createdAt)}
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
function AllStudents({ students, alljobs }) {
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

  const filteredStudents = searchQuery
    ? students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : students;
  const totalPageCount = Math.ceil(filteredStudents.length / usersPerPage);
  const pageNumbers = Array.from({ length: totalPageCount }).map(
    (_, index) => index + 1
  );
  const currentStudents = filteredStudents.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="text-xl text-center font-Poppins min-h-screen flex flex-col ">
      <div className="h-24 w-full flex flex-row items-center justify-start px-2 bg-white">
        <div className="w-full">{/* Your SearchComponent here */}</div>
      </div>
      <h2 className="font-semibold text-xl">All Students</h2>
      <div className="flex flex-col   bg-white rounded-xl">
        <UserTable paginatedStudents={currentStudents} jobs={jobs} />
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

export default AllStudents;

import React, { useEffect, useState } from "react";
import SearchComponent from "../Search";

function AllUsers({ users }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="text-xl text-center font-Poppins">
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
        {Array.isArray(filteredUsers) ? (
          filteredUsers.map((user) => (
            <div
              key={user?._id}
              className="flex items-start justify-between p-4 m-2 w-full text-start"
            >
              <h3 className="font-bold w-1/3">{user?.name}</h3>
              <p className="text-start w-1/3">Email: {user?.email}</p>
              <p className="w-1/3 text-start">Jobs by User...</p>
            </div>
          ))
        ) : (
          <p>Loading students...</p>
        )}
      </div>
    </div>
  );
}

export default AllUsers;

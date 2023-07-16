import React, { useState } from "react";

export default function SearchComponent({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Call the onSearch callback with the query
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex rounded my-2 mx-auto">
        <input
          type="text"
          className="block w-full px-4 py-2 text-zinc-900 bg-white border rounded-md focus:border-blue-500 focus:ring-teal-100 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="ml-1 px-4 text-white bg-gray-700 hover:bg-gray-900 rounded font-bold text-lg">
          Search
        </button>
      </div>
    </div>
  );
}

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
    <div className="flex items-center w-full">
      <div className="flex rounded mx-4 gap-2 w-full">
        <input
          type="text"
          className="h-12 w-3/4 md:w-5/6 px-4 py-2 placeholder:tracking-[0.25em] tracking-widest text-2xl placeholder:opacity-60 rounded-md placeholder:text-[#f3eeeb] text-white bg-transparent  focus:text-white focus:border-2 focus:border-white focus:ring-0 "
          placeholder="Search a job title"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className=" text-[#f3eeeb] bg-[hsl(0,0%,12%)] border border-[#f3eeeb] hover:bg-[#ee6555] ease-in-out duration-200 tracking-[0.15em] rounded font-bold text-xl h-12 w-1/4 md:w-1/6">
          Search
        </button>
      </div>
    </div>
  );
}

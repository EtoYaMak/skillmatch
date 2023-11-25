import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";

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
      <div className="searchInput flex justify-center rounded mx-4 gap-2 w-full relative">
        <input
          type="text"
          className="w-full font-Poppins rounded-[2em] border-[1px] h-14 pl-12"
          placeholder="Search a job title"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-transparent flex gap-2 justify-evenly items-center text-[#333]">
          {/* <BsSearch size={24} className="bg-transparent" /> */}
          <FaSearch size={24} className="bg-transparent" />
        </span>
      </div>
    </div>
  );
}

/*           placeholder:tracking-wide tracking-wider text-xl font-Poppins
          placeholder:opacity-70   rounded-[2em] placeholder:text-[#333]
           text-[#000] bg-black/10   focus:text-black focus:border-2
            focus:border-white/5 focus:outline-none bg-[#fff] focus:bg-[#333]/5 */

import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

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
      <div className="flex justify-between rounded mx-4 gap-2 w-full">
        <input
          type="text"
          className="input input-ghost h-12 w-full px-4 py-4
          placeholder:tracking-[0.25em] tracking-wider text-2xl 
          placeholder:opacity-60 rounded-md placeholder:text-[#aba6a6]
           text-[#d4d7d7]   focus:text-white focus:border-2
            focus:border-white/5 focus:outline-none bg-[#1c1f21] focus:bg-black/60"
          placeholder="Search a job title"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className=" btn btn-ghost text-xl bg-[#1c1f21]">
          {/* text-[#f3eeeb] bg-[hsl(0,0%,12%)] border border-[#f3eeeb] hover:bg-[#ee6555]
         ease-in-out duration-200 tracking-[0.15em] rounded font-bold text-xl h-12 w-1/4 md:w-1/6 */}
          <span className="bg-transparent flex gap-2 justify-evenly items-center text-white/50">
            <BsSearch size={24} className="bg-transparent" />
          </span>
        </button>
      </div>
    </div>
  );
}

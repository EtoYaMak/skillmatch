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
      <div className="flex justify-center rounded mx-4 gap-2 w-full">
        <input
          type="text"
          className="input input-ghost h-12 sm:w-full w-2/3 px-4 py-4
          placeholder:tracking-wide tracking-wider text-xl font-Poppins
          placeholder:opacity-70 placeholder:underline underline-offset-2 rounded-3xl placeholder:text-[#aba6a6]
           text-[#000] bg-black/5   focus:text-black focus:border-2
            focus:border-white/5 focus:outline-none bg-[#fff] focus:bg-[#333]/5"
          placeholder="Search a job title...  "
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className=" btn btn-ghost text-xl rounded-full">
          {/* text-[#f3eeeb] bg-[hsl(0,0%,12%)] border border-[#f3eeeb] hover:bg-[#ee6555]
         ease-in-out duration-200 tracking-[0.15em] rounded font-bold text-xl h-12 w-1/4 md:w-1/6 */}
          <span className="bg-transparent flex gap-2 justify-evenly items-center text-[#333]">
            <BsSearch size={24} className="bg-transparent" />
          </span>
        </button>
      </div>
    </div>
  );
}

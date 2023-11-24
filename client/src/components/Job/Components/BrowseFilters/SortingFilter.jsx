// SortingFilter.jsx
import React from "react";

function SortingFilter({ sortOption, setSortOption }) {
  return (
    <>
      <div className="md:flex md:space-x-4 w-full font-Poppins">
        <div className="md:w-full md:flex flex-col md:justify-end w-full">
          <select
            id="sort"
            value={sortOption}
            className="border border-opacity-20 border-black rounded-3xl h-12"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="24hr">24 hrs</option>
            <option value="3d">3d</option>
            <option value="7d">7d</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default SortingFilter;

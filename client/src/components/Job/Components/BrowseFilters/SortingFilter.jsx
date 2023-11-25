// SortingFilter.jsx
import React from "react";

function SortingFilter({}) {
  return (
    <>
      <div className="relative inline-block w-[150px] h-[40px]">
        <select
          id="sort"
          className="w-[150px] font-Poppins rounded-[2em] border-[1px] h-12 px-4 text-[16px] font-medium "
        >
          <option value="sortby">Sort By</option>
          <option value="latest">Latest Jobs</option>
          <option value="popular">Popular</option>
          <option value="payhigh">Highest Paid</option>
          <option value="mostviewed">Most Viewed</option>
          <option value="mostapplied">Most Applied</option>
        </select>
      </div>
    </>
  );
}

export default SortingFilter;

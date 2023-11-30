// SortingFilter.jsx
import React from "react";

function SortingFilter({ handleSortChange }) {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    // Pass the selected value to the parent component
    handleSortChange(selectedValue);
  };

  return (
    <>
      <div className="relative inline-block w-full max-[365px]:w-[150px] h-[40px]">
        <select
          id="sort"
          className="w-full min-[365px]:w-[150px] font-Poppins rounded-[2em] border-[1px] h-12 px-4 text-[16px] font-medium "
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            Sort By
          </option>
          <option value="LATEST">Latest Jobs</option>
          {/*           <option value="popular">Popular</option> */}
          <option value="ASCENDING">Ascending</option>
          <option value="DESCENDING">Descending</option>
          {/*           <option value="payhigh">Highest Paid</option>
          <option value="mostviewed">Most Viewed</option>
          <option value="mostapplied">Most Applied</option> */}
        </select>
      </div>
    </>
  );
}

export default SortingFilter;

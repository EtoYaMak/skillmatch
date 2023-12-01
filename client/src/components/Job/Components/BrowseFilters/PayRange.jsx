import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
function PayRange({ setSalaryFilter }) {
  const [selectedRange, setSelectedRange] = useState("");

  const handleRangeSelect = (value) => {
    setSelectedRange(value);
    setSalaryFilter(value);
  };
  const handleResetInput = () => {
    setSelectedRange("");
    setSalaryFilter("");
  };
  const salaryRanges = [
    { value: "£10,000 - £15,000", label: "£10k - £15k GBP" },
    { value: "£15,000 - £25,000", label: "£15k - £25k GBP" },
    { value: "£25,000 - £35,000", label: "£25k - £35k GBP" },
    { value: "£35,000 - £45,000", label: "£35k - £45k GBP" },
    { value: "£45,000 - £60,000", label: "£45k - £60k GBP" },
    { value: "£60,000 - £80,000", label: "£60k - £80k GBP" },
    { value: "80plus", label: "£80k+ GBP" },
  ];

  return (
    <div className="relative inline-block w-full  ">
      {selectedRange && (
        <button
          onClick={handleResetInput}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent "
        >
          <MdOutlineCancel size={22} className="text-black" />
        </button>
      )}
      <select
        id="salaryRange"
        value={selectedRange}
        onChange={(e) => handleRangeSelect(e.target.value)}
        className={` ${
          selectedRange
            ? "pl-10 w-full min-[850px]:w-[200px]"
            : " w-full min-[850px]:w-[155px]"
        } font-Poppins rounded-[2em] border-[1px] border-black/40 h-10 sm:h-12 px-4 text-[14px] sm:text-[16px] font-medium hover:bg-[#e1e1e1]/20 text-black/70 `}
      >
        <option value="" hidden disabled className="">
          Salary Range
        </option>
        {salaryRanges.map((range) => (
          <option
            key={range.value}
            value={range.value}
            className="text-[14px] w-full text-black"
          >
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PayRange;

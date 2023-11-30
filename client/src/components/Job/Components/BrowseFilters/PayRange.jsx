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
    <div className="relative inline-block w-full  max-[365px]:max-w-fit h-[40px] ">
      {selectedRange && (
        <button
          onClick={handleResetInput}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent"
        >
          <MdOutlineCancel size={22} className="text-black/60" />
        </button>
      )}
      <select
        id="salaryRange"
        value={selectedRange}
        onChange={(e) => handleRangeSelect(e.target.value)}
        className={` ${
          selectedRange ? "pl-8 w-full sm:w-[200px]" : " w-full sm:w-[155px]"
        } font-Poppins rounded-[2em] border-[1px] h-12 px-4 text-[16px] font-medium hover:bg-[#e1e1e1]/20`}
      >
        <option value="" hidden disabled className="">
          Salary Range
        </option>
        {salaryRanges.map((range) => (
          <option key={range.value} value={range.value} className="">
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PayRange;

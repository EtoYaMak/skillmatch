import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import countriesData from "../../../assets/countries-data.json";
import { useSelector, useDispatch } from "react-redux";
import ApplyJobButton from "../../Misc/ApplyJobButton";

function JobBoardComponent({ job }) {
  const jobId = job._id;

  const { user } = useSelector((state) => state.auth);
  const { SAuser } = useSelector((state) => state.SAuser);
  const { student } = useSelector((state) => state.students);
  const showRegisterButton = !student && !user && !SAuser;

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/jobs/${jobId}`);
  };

  const skills = job.skills ? [...job.skills] : [];
  /* FIND Country CODE */
  const countryCode = countriesData.find(
    (country) => country.Name === job.country
  )?.Code;

  return (
    <>
      <div
        className={`jobcomp jobItemCard  max-[640px]:gap-2  my-2 py-2 max-h-[130px] sm:max-h-[115px] flex flex-row items-center sm:rounded-2xl font-Poppin max-w-[980px]  mx-auto duration-200 ease-in-out cursor-pointer z-0 ${
          job.setting.find(
            (setting) => setting.name === "Remote" && setting.value
          )
            ? "bg-[hsl(49,100%,77%)] border-b-[2px] border-b-[#ffD500]"
            : "border-b-[1px]" //bg-[#ffd50033] border-[#fff1a7] Add additional styles for non-remote jobs if needed
        }`}
        onClick={handleClick}
      >
        <div className="w-full flex flex-row justify-between items-center">
          {/* LEFT FLEX DIR */}
          <div className="w-full sm:w-2/3 flex flex-col ">
            {/* LEFT BOX */}
            <div className="flex flex-row justify-normal items-center ">
              {/* LOGO CONTAINER */}
              <div className="sm:mx-3 mx-[2px] mr-[4px] min-w-fit mask mask-circle">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-[55px] sm:w-[70px] "
                />
              </div>
              {/* JOB title, company, country, setting */}
              {/*  <div className="flex flex-col select-none py-2 space-y-[0px] sm:space-y-[4px] w-[60vw] sm:w-auto h-full"> */}
              <div className="flex flex-col min-h-full space-y-[0px] sm:space-y-[4px] w-full">
                <h1 className="font-Poppins text-[14px]  sm:text-[18px] font-semibold sm:font-bold">
                  {job.position}
                </h1>
                <h3 className="font-Poppins font-normal sm:font-medium text-[13px] sm:text-[16px] hover:underline text-[#2e2e2e]">
                  {job.company}
                </h3>
                {/* country setting */}
                <div className="  text-white select-none gap-[4px] sm:gap-2 flex flex-wrap w-full text-[10px] sm:text-[12px] py-1">
                  <h1 className="font-Poppins cursor-cell  w-fit bg-[#C83055] rounded-sm sm:px-[0.50rem] px-[0.3rem]  sm:py-[0.25rem] py-[0.14rem] ">
                    {job.country}
                    {/* {countryCode} */}
                  </h1>

                  {job.setting &&
                    job.setting
                      .filter((jobSetting) => jobSetting.value) // Only keep settings with value true
                      .slice(0, 1)
                      .map((jobSetting, index) => (
                        <h1
                          key={index} //This was missing
                          className="font-Poppins cursor-cell  w-fit bg-[#C83055] rounded-sm  sm:px-[0.50rem] px-[0.25rem]  sm:py-[0.25rem] py-[0.14rem]  "
                        >
                          {jobSetting.name.charAt(0).toUpperCase() +
                            jobSetting.name.slice(1)}
                        </h1>
                      ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-transparent max-[640px]:hidden  flex flex-wrap items-start justify-center sm:justify-start gap-1 text-sm text-white h-full w-full sm:w-1/2 max-[450px]:items-center ">
            {job.setting.find(
              (setting) => setting.name === "Remote" && setting.value
            ) ? (
              <h1 className="font-Poppins text-[14px] cursor-cell  w-fit text-black font-semibold px-3 py-1 bg-[#ffD500] rounded-[5px] ">
                Featured
              </h1>
            ) : null}

            {!showDropdown &&
              skills.slice(0, 2).map((skill, index) => (
                <span
                  key={index} // Use the index as the key
                  className={`max-[560px]:hidden font-Poppins font-semibold text-[12px]  px-3 py-1 bg-[#3D4EE5] rounded-[9px] ${
                    isHovered ? " " : " "
                  }`}
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
        <div className="sm:w-1/6 flex flex-col mr-3 w-fit justify-center  items-center gap-1 ">
          {job.setting.find(
            (setting) => setting.name === "Remote" && setting.value
          ) ? (
            <h1 className="font-Poppins min-[640px]:hidden text-[12px] cursor-cell  w-fit text-black font-semibold px-3 py-1 bg-[#ffD500] rounded-[5px] ">
              Featured
            </h1>
          ) : null}
          {student && (
            <div className="max-[640px]:h-[24px] max-[640px]:w-[75px] w-24 h-10 ">
              <ApplyJobButton jobId={job._id} />
            </div>
          )}
          {showRegisterButton && (
            <Link
              to={"/register"}
              className="flex justify-center items-center  ease-in-out duration-200 bg-black  uppercase font-Poppins  px-3  py-2 text-white hover:text-white hover:scale-105 font-bold z-40 max-[640px]:h-8 max-[640px]:w-20 w-28 h-10 rounded-[2em] "
            >
              Apply
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default JobBoardComponent;

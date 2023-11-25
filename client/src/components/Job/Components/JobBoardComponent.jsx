import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import countriesData from "../../../assets/countries-data.json";
import { useSelector, useDispatch } from "react-redux";
import ApplyJobButton from "../../Misc/ApplyJobButton";

function JobBoardComponent({ job }) {
  const jobId = job._id;
  const dispatch = useDispatch();
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
  // Find the country code based on a partial match of the country name
  const countryCode = countriesData.find(
    (country) => country.Name === job.country
  )?.Code;
  //2px solid #fff1a7
  return (
    <>
      <div
        className="jobcomp max-[640px]:gap-2 my-4 h-[105px] flex flex-col bg-[#ffd50033] min-[600px]:flex-row items-center border-[2px] border-solid border-[#fff1a7]  rounded-2xl font-Poppin w-full
       duration-200 ease-in-out cursor-pointer z-0"
        onClick={handleClick}
      >
        <div className="w-3/6">
          <div className="flex flex-colitems-center w-full">
            <div className="flex flex-row justify-center items-center w-max-full">
              <div className="mx-3 mr-6 min-w-fit mask mask-circle">
                <img src={job.logo} alt={job.company} className="w-[70px] " />
              </div>

              <div className="flex flex-col select-none py-2 space-y-[4px] ">
                <h1 className="font-Poppins text-[17px] font-bold ">
                  {job.position}
                </h1>
                <h3 className="font-Poppins font-medium text-[17px] hover:underline">
                  {job.company}
                </h3>
                <div className="text-white min-w-max max-w-fit w-full flex items-center justify-start select-none gap-2">
                  <h1 className="font-Poppins font-medium  text-[12px] cursor-cell  w-fit bg-[#C83055] rounded-3xl px-[0.60rem] py-[0.28rem] ">
                    {job.country}
                  </h1>
                  <h1 className="font-Poppins font-medium  text-[12px] cursor-cell  w-fit bg-[#C83055] rounded-3xl px-[0.60rem] py-[0.28rem] ">
                    {job.country}
                  </h1>

                  {job.setting &&
                    job.setting
                      .filter((jobSetting) => jobSetting.value) // Only keep settings with value true
                      .slice(0, 1)
                      .map((jobSetting, index) => (
                        <h1 className="font-Poppins font-medium  text-[12px] cursor-cell  w-fit bg-[#C83055] rounded-3xl px-[0.50rem] py-[0.25rem] ">
                          {jobSetting.name.charAt(0).toUpperCase() +
                            jobSetting.name.slice(1)}
                        </h1>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-transparent flex flex-wrap items-center justify-start gap-1 text-sm text-white h-full w-2/6 ">
          <h1 className="font-Poppins text-[12px] cursor-cell  w-fit text-black font-semibold px-3 py-1 bg-[#ffD500] rounded-[5px] ">
            Featured
          </h1>
          {!showDropdown &&
            skills.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className={`font-Poppins font-semibold text-[12px] px-3 py-1 bg-[#3D4EE5] rounded-[9px] ${
                  isHovered ? " " : " "
                }`}
              >
                {skill}
              </span>
            ))}
        </div>
        <div className="w-1/6 flex justify-center ">
          {student && (
            <div className="text-white flex justify-center pt-1 sm:pt-0 sm:justify-end w-full sm:w-auto select-none px-2 z-40 ">
              <ApplyJobButton jobId={job._id} />
            </div>
          )}
          {showRegisterButton && (
            <Link
              to={"/register"}
              className="flex justify-center items-center w-[159px] h-[43px] ease-in-out duration-200 bg-black  uppercase font-Poppins  px-3 rounded-xl py-2 text-white hover:text-white hover:scale-105 font-bold z-40 "
            >
              Apply
            </Link>
          )}
        </div>
      </div>

      {/* Apply button */}
      {/* Skills */}
      {/*       <div className="skills flex-1 pointer-events-none select-none ">
        <div className="bg-transparent flex flex-wrap items-center justify-center min-w-max gap-1 text-sm text-white">
          {!showDropdown &&
            skills.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className={`font-Poppins text-xs sm:text-sm px-2 py-1 bg-[#3D4EE5] rounded-3xl ${
                  isHovered ? " " : " "
                }`}
              >
                {skill}
              </span>
            ))}
        </div>
        <div className="">
          {student && (
            <div className="text-white flex justify-center pt-1 sm:pt-0 sm:justify-end w-full sm:w-auto select-none px-2 z-40">
              <ApplyJobButton jobId={job._id} />
            </div>
          )}
          {showRegisterButton && (
            <Link
              to={"/register"}
              className="flex justify-center items-center w-fit ease-in-out duration-200 bg-black  uppercase font-Poppins  px-3 rounded-3xl py-2 text-white hover:text-white hover:scale-105 font-bold z-40 "
            >
              Apply
            </Link>
          )}
        </div>
      </div> */}
    </>
  );
}

export default JobBoardComponent;

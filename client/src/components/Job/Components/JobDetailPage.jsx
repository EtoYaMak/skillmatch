import React from "react";

import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaLink } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Departments from "../../../assets/Departments.json";
import { applyToJob } from "../../../features/jobs/jobSlice";
import { fetchStudentData } from "../../../features/students/studentSlice";
import { Link } from "react-router-dom";
import ApplyJobButton from "../../Misc/ApplyJobButton";

import {
  RiMapPinLine,
  RiGlobalLine,
  RiLinkedinFill,
  RiTwitterFill,
  RiExternalLinkLine,
} from "react-icons/ri";

function JobDetailPage({ job }) {
  const jobId = job._id;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { SAuser } = useSelector((state) => state.SAuser);
  const { student, studentData } = useSelector((state) => state.students);
  // Check if the user is a student (student object exists)
  const isStudent = !!student;
  const showRegisterButton = !student && !user && !SAuser;

  const {
    company,
    logo,
    position,
    location,
    city,
    country,
    type,
    setting,
    website,
    careerPage,
    description,
    skills,
    createdAt,
    featured,
    department,
    applicants,
    expirationDate,
  } = job;
  const applicantsCount = job.applicants.length;

  const categoryLabel = Object.entries(Departments).find(
    ([key, value]) => key === job?.department
  )?.[1];
  //Format expirationDate
  const formatexpDate = (expirationDate) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const expDateObj = new Date(expirationDate); // Convert to Date object
    const day = expDateObj.getDate();
    const monthIndex = expDateObj.getMonth(); // Months are zero-indexed
    const monthName = monthNames[monthIndex];
    const year = expDateObj.getFullYear();

    return `${day} ${monthName} ${year}`;
  };

  // Define a function to format the date
  const formatCreatedAtDate = (createdAt) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const createdAtDate = new Date(createdAt);
    const day = createdAtDate.getDate();
    const monthIndex = createdAtDate.getMonth(); // Months are zero-indexed
    const monthName = monthNames[monthIndex];
    const year = createdAtDate.getFullYear();

    return `${day} ${monthName} `;
  };
  const formattedCreatedAt = formatCreatedAtDate(createdAt);

  const sanitizedHTML = DOMPurify.sanitize(description, {
    USE_PROFILES: { html: true },
  });
  // Modify the HTML content to add the inline style
  const modifiedHTML = sanitizedHTML
    .replace(/<div/g, '<div style="background-color:transparent;"')
    .replace(/<h1/g, '<h1 style="font-size:2em;"')
    .replace(/<h2/g, '<h2 style="font-size:1.5em;"')
    .replace(/<h3/g, '<h3 style="font-size:1.17em;"')
    .replace(/<h4/g, '<h4 style="font-size:1em;"')
    .replace(/<h5/g, '<h5 style="font-size:0.83em;"')
    .replace(/<h6/g, '<h6 style="font-size:0.67em;"')
    .replace(
      /<p/g,
      '<p style="background-color:transparent;  margin-top:0px; font-size:1em;"'
    )
    .replace(
      /<strong/g,
      '<strong style="background-color:transparent;font: bold;"'
    )

    .replace(
      /<ul/g,
      '<ul style="background-color:transparent;list-style-type: disc;padding-left: 2em;"'
    )
    .replace(/<li/g, '<li style="background-color:transparent; "')
    .replace(
      /<ol/g,
      '<ol style="background-color:transparent;list-style-type: auto;padding-left: 2em;"'
    );

  // Apply custom CSS styles to the div
  const customStyles = {
    fontSize: "16px",
    color: "black",
    // Add more styles as needed
  };

  return (
    <div className="main flex max-w-7xl mx-auto">
      {/* JOB DETAILS LEFT */}
      <div className="jobdetails w-full">
        <div className="topdetails flex flex-col gap-2">
          <span>
            <h1 className="uppercase text-[16px] font-medium font-Poppins">
              POSTED {formattedCreatedAt}
            </h1>
            {/*             <h1 className="uppercase text-[16px] font-medium font-Poppins">
              EXPIRES {formatexpDate}
            </h1> */}
          </span>
          <h1 className="uppercase text-[16px] font-medium font-Poppins">
            {applicantsCount >= 2 ? `🔥` : null} {applicantsCount}{" "}
            {applicantsCount === 1 ? "Applicant" : "Applicants"}
          </h1>
          <span className="">
            <h1 className="uppercase text-[2em] sm:text-[2.5rem] font-medium font-Poppins my-3">
              {job?.position}
            </h1>
            {job?.featured === true ? (
              <h1 className="font-Poppins text-[16px] cursor-cell  w-fit text-black uppercase font-semibold px-3 py-1 bg-[#ffD500] rounded-[4px] ">
                Featured
              </h1>
            ) : null}
          </span>
          <div className="others flex gap-3 flex-wrap">
            <span className="w-fit px-3 py-1 bg-slate-900  text-[15px] font-semibold text-white text-center  rounded-[4px]">
              {job?.city}
            </span>
            <span className="w-fit px-3 py-1 bg-slate-900  text-[15px] font-semibold text-white text-center  rounded-[4px]">
              {categoryLabel}
            </span>
            <span className="w-fit px-3 py-1 bg-slate-900  text-[15px] font-semibold text-white text-center rounded-[4px] ">
              {job?.salary}
            </span>
          </div>
          <div className="worksetting flex gap-3 my-2 items-center justify-start flex-wrap">
            {setting &&
              setting
                .filter((jobSetting) => jobSetting.value) // Only keep settings with value true
                .map((jobSetting, index) => (
                  <span
                    key={index}
                    className="w-fit px-3 py-1 bg-gray-700 text-[15px] font-semibold text-white text-center rounded-[2px]"
                  >
                    {jobSetting.name.charAt(0).toUpperCase() +
                      jobSetting.name.slice(1)}
                  </span>
                ))}
            {type &&
              type
                .filter((jobType) => jobType.value)
                .map((jobType, index) => (
                  <span
                    key={index}
                    className="w-fit px-3 py-1 bg-gray-700 text-[15px] font-semibold text-white text-center rounded-[2px]"
                  >
                    {jobType.name.charAt(0).toUpperCase() +
                      jobType.name.slice(1)}
                  </span>
                ))}
          </div>
          <div className="skills flex gap-3 flex-wrap ">
            {job?.skills.map((skill, index) => (
              <span
                key={index}
                className={`w-fit px-3 py-1 bg-slate-950 text-[16px] font-medium text-white text-center rounded-[5px]`}
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="description w-full  bg-white  mt-4 font-Poppins ">
            <h4
              className="text-2xl md:text-3xl font-bold font-Poppins mb-4  bg-transparent
            text-[#000] tracking-[0.25em]"
            >
              About the Job
            </h4>
            <div
              className="select-text bg-transparent"
              id="jobDesc"
              dangerouslySetInnerHTML={{ __html: modifiedHTML }}
              style={customStyles}
              //
            ></div>
          </div>
          <div className="apply-bottom w-full flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-center justify-between mt-8 sm:mt-24">
            {student ? (
              <ApplyJobButton
                style={"h-fit w-fit rounded-sm px-4 py-3 bg-red-600 text-xl "}
                applytext={"Apply for this position"}
                appliedtext={"Applied"}
                jobId={job._id}
              />
            ) : (
              <Link
                to={"/register"}
                className="px-3 w-80 py-3 text-[18px]  bg-black text-white font-Poppins font-semibold hover:text-white text-center"
              >
                Register To Apply
              </Link>
            )}

            <span className="flex flex-col items-center font-Poppins justify-center">
              Share
              <span className="flex gap-3">
                <Link>
                  <RiLinkedinFill size={20} />
                </Link>
                <Link>
                  <RiTwitterFill size={20} />
                </Link>
                <Link>
                  <RiExternalLinkLine size={20} />
                </Link>
              </span>
            </span>
          </div>
        </div>
      </div>
      {/* Company Card RIGHT */}
      <div className="companydetails bg-slate-200 w-[30%] max-h-[380px]  min-w-fit mx-2 mt-[8vh] px-4 hidden min-[760px]:flex flex-col justify-center items-center top-0 sticky">
        {/* LOGO CONTAINER */}
        <figure className="mb-4 mask mask-circle">
          <img
            src={job?.logo}
            alt={job?.company}
            className="object-fill w-44 max-w-44 "
          />
        </figure>
        <h1 className="text-[24px] font-Poppins font-semibold mb-3  w-[90%] text-center">
          {job?.company}
        </h1>
        <h1 className="text-[16px] font-Poppins font-semibold mb-1 w-[99%] text-center flex items-center justify-center gap-1">
          <RiMapPinLine size={20} /> {job?.country}
        </h1>
        <Link
          to={job?.website}
          target="_blank"
          className="text-[16px] font-Poppins font-semibold mb-4  w-[90%] text-center flex items-center justify-center gap-1"
        >
          <RiGlobalLine size={20} /> Website
        </Link>
        {student ? (
          <ApplyJobButton
            style={"h-fit w-fit rounded-sm px-4 py-3 "}
            applytext={"Apply for this position"}
            appliedtext={"Applied"}
            jobId={job._id}
          />
        ) : (
          <Link
            to={"/register"}
            className="px-3 py-2 w-full bg-black text-white font-Poppins font-semibold hover:text-white text-center"
          >
            Register To Apply
          </Link>
        )}
      </div>
    </div>
  );
}

export default JobDetailPage;

import React from "react";

import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaLink } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { applyToJob } from "../features/jobs/jobSlice";

function JobDetailPage({ job }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { SAuser } = useSelector((state) => state.SAuser);
  const { student } = useSelector((state) => state.students);

  const {
    company,
    logo,
    /*     isNew,
    featured, */
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
  } = job;

  // Define a function to format the date
  const formatCreatedAtDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const day = createdAtDate.getDate();
    const month = createdAtDate.getMonth() + 1; // Months are zero-indexed
    const year = createdAtDate.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formattedCreatedAt = formatCreatedAtDate(createdAt);

  const sanitizedHTML = DOMPurify.sanitize(description, {
    USE_PROFILES: { html: true },
  });

  // Modify the HTML content to add the inline style
  const modifiedHTML = sanitizedHTML
    .replace(/<div/g, '<div style="background-color:transparent;"')
    .replace(
      /<p/g,
      '<p style="background-color:transparent;  margin-top:15px;"'
    )
    .replace(
      /<strong/g,
      '<strong style="background-color:transparent;font-size:18px;"'
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
    color: "white",
    // Add more styles as needed
  };
  // Check if the user is a student (student object exists)
  const isStudent = !!student;

  // Determine whether to show the Apply button based on user role
  const showApplyButton = isStudent && !user && !SAuser;
  const showRegisterButton = !isStudent && !user;
  // Attach the applyToJob function to the Apply button
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const handleApply = async () => {
    try {
      // Call the applyToJob function here

      // Set the applicationSubmitted state to true after successful application
      setApplicationSubmitted(true);
      dispatch(applyToJob({ jobId: job._id, studentId: student._id }));
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="bg-transparent pb-8">
      <div className="mx-auto rounded-b-xl p-8   w-full max-w-[1240px]  bg-black/30 font-Inter">
        <div className="bg-transparent sm:space-y-0 space-y-4 flex flex-col min-w-min justify-between items-center">
          {/* Company and Position */}
          <div className="flex flex-col sm:flex-row items-center justify-center bg-transparent w-full  sm:space-x-4 space-y-3 sm:space-y-0 mb-4">
            <div className="bg-transparent  flex justify-center items-center">
              <img
                src={logo}
                alt={company}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover bg-black"
              />
            </div>

            <div className=" bg-inherit  w-fit text-start  sm:pl-2">
              <h2 className="text-4xl bg-inherit text-[#d0333c] tracking-wide">
                {position}
              </h2>
              <h3 className="text-2xl font-mono font-semibold bg-inherit text-[#d4d7d7] tracking-widest">
                {company}
              </h3>
              <div className=" text-zinc-400 font-Inter flex flex-row justify-end ">
                Date Posted:
                <div
                  className="select-none tooltip tooltip-bottom ml-1"
                  data-tip="DD/MM/YYYY"
                >
                  <button>{formattedCreatedAt}</button>
                </div>
              </div>
            </div>
          </div>
          {/* Remote / Hybrid / Onsite */}
          <div className=" bg-transparent font-Inter ">
            <div className="flex flex-row gap-2 justify-center bg-transparent">
              {setting &&
                setting
                  .filter((jobSetting) => jobSetting.value) // Only keep settings with value true
                  .map((jobSetting, index) => (
                    <div
                      key={index}
                      className="bg-white/70 tracking-widest font-semibold
                   min-w-min text-center text-lg text-black/80 px-2 py-1 rounded-md hover:shadow-[2px_4px_1px_0px_#d0333c] duration-300 ease-in-out"
                    >
                      {jobSetting.name.charAt(0).toUpperCase() +
                        jobSetting.name.slice(1)}
                    </div>
                  ))}
            </div>
          </div>
        </div>
        {/* Work Settings*/}
        <div className="w-full my-2 bg-transparent select-none font-Inter">
          <div className="bg-inherit">
            {/* Full / Part / Intern / Contract */}
            <div className="mb-4 bg-inherit ">
              <div className="text-center mb-2 bg-inherit">
                {/*                 <p className=" font-bold text-xl uppercase bg-inherit text-[#d4d7d7] tracking-[0.20em]">
                  work type
                </p> */}
              </div>
              <div className="flex flex-wrap gap-2 justify-center bg-inherit">
                {type &&
                  type
                    .filter((jobType) => jobType.value)
                    .map((jobType, index) => (
                      <div
                        key={index}
                        className="bg-black/50 tracking-widest min-w-min
                       text-center text-lg text-white px-2 py-1 rounded-md hover:shadow-[2px_4px_1px_0px_#d0333c] duration-300 ease-in-out"
                      >
                        {jobType.name.charAt(0).toUpperCase() +
                          jobType.name.slice(1)}
                      </div>
                    ))}
              </div>
            </div>
          </div>
          {/* End Type */}

          {/* Location, CareerPage,  Website */}
          <div className="mx-4 flex sm:flex-row flex-col sm:space-y-0 space-y-2 mb-4 justify-between items-center h-full bg-inherit font-Inter">
            {/* Location */}
            <div className="bg-inherit">
              <p className=" bg-inherit text-[#d0333c]  flex sm:flex-row flex-col items-center sm:items-baseline space-x-2 duration-300 ease-in-out">
                <span className="bg-transparent text-xl">
                  <FaLocationDot
                    size={24}
                    className="bg-transparent text-[#d4d7d7]"
                  />
                </span>
                <span className="bg-transparent flex space-x-2 justify-center items-center">
                  <span className="bg-transparent font-semibold text-xl tracking-normal flex flex-col sm:flex-row gap-2 items-center ">
                    {job.location
                      ? job.location
                      : `${job.city}, ${job.country}`}
                  </span>
                </span>
              </p>
            </div>

            {/* Career page */}
            <div className="bg-transparent flex flex-col justify-between items-start sm:justify-start sm:space-x-6">
              <div className="bg-inherit sm:space-y-0 space-x-2 flex">
                <p className="text-xl bg-inherit text-[#d0333c] flex items-center justify-center space-x-2">
                  <span className="bg-inherit text-[#d4d7d7]">
                    <FaLink className="bg-transparent" size={24} />
                  </span>
                  <a
                    href={careerPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d0333c] text-xl  font-bold hover:text-green-400/90 duration-300 ease-in-out "
                  >
                    Career Page
                  </a>
                </p>
                {/* Website */}
                <p className="text-xl bg-inherit text-[#d0333c] flex items-center justify-center space-x-2">
                  <span className="bg-inherit text-[#d4d7d7]">
                    <FaLink className="bg-transparent" size={24} />
                  </span>
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d0333c] text-xl  font-bold hover:text-green-400/90 duration-300 ease-in-out "
                  >
                    Company Site
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Skills  */}
        <div className="my-2 bg-transparent border-t border-t-[#d0333c] font-Inter">
          <div className="font-bold text-2xl uppercase bg-transparent text-center text-[#d4d7d7] tracking-[0.40em] mt-4">
            Skills
          </div>
          <div className="flex flex-wrap justify-center items-center bg-inherit gap-2 mt-2">
            {skills.slice().map((skill, index) => (
              <span
                key={index}
                className="bg-[#d0333c] tracking-widest font-normal flex  items-center justify-center
                 min-w-fit text-center  text-sm text-white px-2 py-1 rounded-md hover:text-[#d0333c] hover:bg-black/50 duration-300 ease-in-out"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skills End */}

        {/* About the Job */}
        <div className="w-full px-2 bg-transparent mt-4 font-Inter">
          <h4
            className="text-2xl md:text-3xl font-bold mb-4 text-center bg-transparent
            text-[#d4d7d7] tracking-[0.25em]"
          >
            About the Job
          </h4>
          <div
            className="select-text bg-transparent"
            id="jobDesc"
            dangerouslySetInnerHTML={{ __html: modifiedHTML }}
            style={customStyles} //
          ></div>
        </div>
        {/* Apply button */}
        {showApplyButton && (
          <div className="flex justify-center mt-8 bg-transparent">
            <button
              onClick={handleApply}
              className="btn btn-lg text-xl border bg-transparent text-[#d0333c] hover:bg-[#d0333c] hover:text-[#d4d7d7]
             border-[#d0333c] hover:border-[#d4d7d7] transition-colors duration-200 ease-in-out"
            >
              Apply Now
            </button>
            {applicationSubmitted && (
              <div className="popup">
                <p>Application Successful!</p>
              </div>
            )}
          </div>
        )}
        {/* Register button for unregistered users */}
        {showRegisterButton && (
          <div className="flex justify-center mt-8 bg-transparent">
            <a
              href="/register"
              className="btn btn-lg text-xl border bg-transparent text-[#d0333c] hover:bg-[#d0333c] hover:text-[#d4d7d7]
      border-[#d0333c] hover:border-[#d4d7d7] transition-colors duration-200 ease-in-out"
            >
              Register to Start Applying
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetailPage;

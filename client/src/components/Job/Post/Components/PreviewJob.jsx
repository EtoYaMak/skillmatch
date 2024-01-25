import { useContext, useEffect } from "react";
import { JobFormContext } from "../JobPost";
import { Link, useNavigate } from "react-router-dom";
import {
  RiMapPinLine,
  RiGlobalLine,
  RiLinkedinFill,
  RiTwitterFill,
  RiExternalLinkLine,
} from "react-icons/ri";
import DOMPurify from "dompurify";
import Departments from "../../../../assets/Departments.json";

export default function PreviewJob() {
  const { formData } = useContext(JobFormContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the necessary formData is present
    // You should tailor the condition to check for the actual required fields
    const isFormDataIncomplete =
      !formData || Object.keys(formData).length === 0;

    if (isFormDataIncomplete) {
      // If the formData is incomplete, redirect to /post
      navigate("/post");
    }
  }, [formData, navigate]);

  return (
    <div className="w-full max-w-[1100px] mx-auto mt-5 min-h-screen">
      <div className="job-card py-4">
        <h1 className="text-3xl font-Poppins font-semibold text-center border-b-2 pb-4 mb-4">
          Card
        </h1>
        <JobCard formData={formData} />
      </div>
      <div className="job-page ">
        <h1 className="text-3xl font-Poppins font-semibold text-center border-b-2  pb-4 mb-4">
          Page
        </h1>
        <JobPage formData={formData} />
      </div>
    </div>
  );
}

function JobCard({ formData }) {
  return (
    <>
      <h1 className="hiddenHSEO">
        Preview Your Job listing before submitting to Skillmint.io
      </h1>
      <h2 className="hiddenHSEO">
        This is how your job listing will look like to the applicants, visitors
        and other users
      </h2>
      <div
        className={`jobcomp jobItemCard max-[640px]:gap-2 py-2 max-h-[130px] sm:max-h-[115px] flex flex-row items-center sm:rounded-2xl font-Poppins max-w-[980px] mx-auto duration-200 ease-in-out cursor-pointer z-0 shadow-[0_3px_10px_rgb(0,0,0,0.35)]`}
      >
        <div className="w-full flex flex-row justify-between items-center">
          {/* LEFT FLEX DIR */}
          <div className="w-full sm:w-2/3 flex flex-col">
            {/* LEFT BOX */}
            <div className="flex flex-row justify-normal items-center">
              {/* LOGO CONTAINER */}
              <div className="w-32">
                <img
                  src={formData?.previewUrl}
                  alt={formData?.company}
                  className="mask mask-circle object-fill"
                />
              </div>
              {/* JOB title, company, country, setting */}
              <div className="flex flex-col min-h-full space-y-[0px] sm:space-y-[4px] w-full">
                <h1 className="font-Poppins text-[14px] sm:text-[18px] font-semibold sm:font-bold">
                  {formData?.position}
                </h1>
                <h3 className="font-Poppins font-normal sm:font-medium text-[13px] sm:text-[16px] hover:underline text-[#2e2e2e]">
                  {formData?.company}
                </h3>
                {/* country setting */}
                <div className="text-white select-none gap-[4px] sm:gap-2 flex flex-wrap w-full text-[10px] sm:text-[12px] py-1">
                  <h1 className="font-Poppins cursor-cell w-fit bg-[#C83055] rounded-sm sm:px-[0.50rem] px-[0.3rem] sm:py-[0.25rem] py-[0.14rem]">
                    {formData?.country}
                  </h1>

                  {/* Conditional rendering based on job settings */}
                  {formData?.remote && (
                    <h1 className="font-Poppins cursor-cell w-fit bg-[#C83055] rounded-sm sm:px-[0.50rem] px-[0.25rem] sm:py-[0.25rem] py-[0.14rem]">
                      Remote
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-transparent max-[640px]:hidden flex flex-wrap items-start justify-center sm:justify-start gap-1 text-sm text-white h-full w-full sm:w-1/2 max-[450px]:items-center">
            {/* Conditional render for 'Featured' label */}
            {formData?.remote && (
              <h1 className="font-Poppins text-[14px] cursor-cell w-fit text-black font-semibold px-3 py-1 bg-[#ffD500] rounded-[5px]">
                Featured
              </h1>
            )}
            {formData?.skills
              ? formData.skills.slice(0, 2).map((skill, index) => (
                  <span
                    key={index}
                    className={`max-[560px]:hidden font-Poppins font-semibold text-[12px] px-3 py-1 bg-[#3D4EE5] rounded-[9px]`}
                  >
                    {skill}
                  </span>
                ))
              : null}
          </div>

          <div className="sm:w-1/6 flex flex-col mr-3 w-fit justify-center items-center gap-1">
            {/* Conditional render for 'Featured' label */}
            {formData?.remote && (
              <h1 className="font-Poppins min-[640px]:hidden text-[12px] cursor-cell w-fit text-black font-semibold px-3 py-1 bg-[#ffD500] rounded-[5px]">
                Featured
              </h1>
            )}

            <Link className="flex justify-center items-center ease-in-out duration-200 bg-black uppercase font-Poppins px-3 py-2 text-white hover:text-white hover:scale-105 font-bold z-40 max-[640px]:h-8 max-[640px]:w-20 w-28 h-10 rounded-[2em]">
              Apply
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function JobPage({ formData }) {
  // Find the label for the category
  const formatCategory = (formData) => {
    const categoryLabel = Object.entries(Departments).find(
      ([key, value]) => key === formData?.department
    )?.[1];

    if (categoryLabel) {
      return categoryLabel; // Return the label from JSON if found
    } else {
      return formData.department; // Return the custom string if not found in JSON
    }
  };
  const sanitizedHTML = DOMPurify.sanitize(formData?.description, {
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
    <>
      <div className="main flex ">
        {/* JOB DETAILS LEFT */}
        <div className="jobdetails w-full">
          <div className="topdetails flex flex-col gap-2">
            <h1 className="uppercase text-[16px] font-medium font-Poppins">
              Posted JAN 20
            </h1>
            <h1 className="uppercase text-[16px] font-medium font-Poppins">
              🔥 100+ Applicants
            </h1>
            <h1 className="uppercase text-[2em] sm:text-[2.5rem] font-medium font-Poppins my-3">
              {formData?.position}
            </h1>
            <div className="others flex gap-3 flex-wrap">
              <span className="w-fit px-3 py-1 bg-slate-900  text-[18px] font-semibold text-white text-center  rounded-[4px]">
                {formData?.city}
              </span>
              <span className="w-fit px-3 py-1 bg-slate-900  text-[18px] font-semibold text-white text-center  rounded-[4px]">
                {formData?.category}
              </span>
              <span className="w-fit px-3 py-1 bg-slate-900  text-[18px] font-semibold text-white text-center rounded-[4px] ">
                {formData?.salary}
              </span>
            </div>
            <div className="worksetting flex gap-3 my-2 items-center justify-start flex-wrap">
              {formData?.fulltime === true ? (
                <span className="w-fit px-3 py-1 bg-gray-700 text-[15px] font-semibold text-white text-center rounded-[2px]">
                  Full-Time
                </span>
              ) : null}
              {formData?.internship === true ? (
                <span className="w-fit px-3 py-1 bg-gray-700 text-[15px] font-semibold text-white text-center rounded-[2px]">
                  Internship
                </span>
              ) : null}
              {formData?.contract === true ? (
                <span className="w-fit px-3 py-1 bg-gray-700 text-[15px] font-semibold text-white text-center rounded-[2px]">
                  Contract
                </span>
              ) : null}
              {formData?.remote === true ? (
                <span className="w-fit px-3 py-1 bg-gray-700 text-[15px] font-semibold text-white text-center rounded-[2px]">
                  Remote
                </span>
              ) : null}
              {formData?.hybrid === true ? (
                <span className="w-fit px-3 py-1 bg-gray-700 text-[15px] font-semibold text-white text-center rounded-[2px]">
                  Hybrid
                </span>
              ) : null}
              {formData?.onsite === true ? (
                <span className="w-fit px-3 py-1 bg-gray-700 text-[15px] font-semibold text-white text-center rounded-[2px]">
                  On-Site
                </span>
              ) : null}
            </div>
            <div className="skills flex gap-3 flex-wrap ">
              {formData?.skills
                ? formData.skills.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className={`max-[560px]:hidden font-Poppins font-semibold text-[12px] px-3 py-1 bg-[#3D4EE5] text-white rounded-[9px]`}
                    >
                      {skill}
                    </span>
                  ))
                : null}
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
            <div className="apply-bottom w-full flex items-center justify-between">
              <button className="px-4 py-3 text-lg font-Poppins font-semibold text-white bg-black rounded-sm pointer-events-none">
                Apply for this position
              </button>
              <span className="flex flex-col items-center">
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
        <div className="companydetails bg-slate-200 w-[30%] min-w-fit h-[340px] mx-2 mt-[8vh] px-8 hidden min-[760px]:flex flex-col justify-center items-center top-0 sticky">
          {/* LOGO CONTAINER */}
          <figure className="mb-4 mask mask-circle">
            <img
              src={formData?.previewUrl}
              alt={formData?.company}
              className="object-fill w-44 max-w-44 "
            />
          </figure>
          <h1 className="text-[24px] font-Poppins font-semibold mb-3  w-[90%] text-center">
            {formData?.company}
          </h1>
          <h1 className="text-[16px] font-Poppins font-semibold mb-1 w-[90%] text-center flex items-center justify-center gap-1">
            <RiMapPinLine size={20} /> {formData?.country}
          </h1>
          <Link className="text-[16px] font-Poppins font-semibold mb-4  w-[90%] text-center flex items-center justify-center gap-1">
            <RiGlobalLine size={20} /> Website
          </Link>
          <button className="px-4 py-2 text-lg font-Poppins font-semibold text-white bg-black rounded-sm pointer-events-none">
            Apply for this position
          </button>
        </div>
      </div>
    </>
  );
}

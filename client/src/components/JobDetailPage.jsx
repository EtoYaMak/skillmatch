import React from "react";
import DOMPurify from "dompurify";
import { FaLink } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function JobDetailPage({ job }) {
  const {
    company,
    logo,
    /*     isNew,
    featured, */
    position,
    location,
    type,
    setting,
    website,
    careerPage,
    description,
    skills,
  } = job;
  const sanitizedHTML = DOMPurify.sanitize(description, {
    USE_PROFILES: { html: true },
  });

  // Modify the HTML content to add the inline style
  const modifiedHTML = sanitizedHTML.replace(
    "<div",
    '<div style="background-color: #171a1c; padding: 1em; border-radius: 5px;"'
  );

  return (
    <div className="flex justify-center items-center overflow-hidden select-none">
      <div className="rounded-xl p-8 mt-8 mb-8 md:w-[1024px] max-w-screen-lg bg-black/30 font-Inter">
        {/* Company and Position */}
        <div className="flex flex-row items-center justify-center bg-transparent">
          <img
            src={logo}
            alt={company}
            className="w-32 h-32 mr-8 rounded-full md:w-64 md:h-64 object-cover bg-inherit "
          />
          <div className=" bg-inherit">
            <h2 className="text-3xl md:text-4xl md:font-bold bg-inherit text-[#d0333c] tracking-wide">
              {position}
            </h2>
            <h3 className="text-2xl font-mono font-semibold bg-inherit text-[#d4d7d7] tracking-widest">
              {company}
            </h3>
          </div>
        </div>

        {/* Type*/}
        <div className="w-full mt-4 flex  sm:flex-col bg-transparent select-none font-Inter">
          <div className="bg-inherit">
            {/* Type */}
            <div className="mb-4 bg-inherit ">
              <div className="text-center mb-2 bg-inherit">
                <p className=" font-bold text-xl uppercase bg-inherit text-[#d4d7d7] tracking-[0.25em]">
                  Type of work
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center bg-inherit">
                {type &&
                  type.map((jobType, index) => (
                    <div
                      key={index}
                      className="bg-black/70 tracking-widest w-40 text-center text-xl text-white px-4 py-2 rounded-md hover:bg-[#d0333c]"
                    >
                      {jobType.name.charAt(0).toUpperCase() +
                        jobType.name.slice(1)}
                    </div>
                  ))}
              </div>
            </div>
            {/* Work Setting */}
            <div className="sm:mb-4 col-start-2 bg-transparent font-Inter">
              <div className="text-center mb-2 bg-transparent">
                <p className=" font-bold text-xl uppercase bg-transparent text-[#d4d7d7] tracking-[0.25em]">
                  Work Setting
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center bg-transparent">
                {setting &&
                  setting.map((jobSetting, index) => (
                    <div
                      key={index}
                      className="bg-black/80 tracking-widest w-40 text-center text-xl text-white px-4 py-2 rounded-md hover:bg-[#d0333c]"
                    >
                      {jobSetting.name.charAt(0).toUpperCase() +
                        jobSetting.name.slice(1)}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* End Type */}

          {/* Location, CareerPage,  Website */}
          <div className="mx-4 flex sm:flex-row flex-col gap-5 justify-evenly items-center h-full bg-inherit font-Inter">
            {/* Location */}
            <div className="bg-inherit ">
              <p className="text-xl bg-inherit text-[#d0333c] hover:text-[#f3900b] flex items-baseline space-x-2">
                <span className="bg-transparent text-xl">
                  <FaLocationDot
                    size={24}
                    className="bg-transparent text-[#d4d7d7]"
                  />
                </span>
                <span className="bg-transparent font-bold ">{location}</span>
              </p>
            </div>

            {/* Career page */}
            <div className="bg-inherit">
              <p className="text-xl bg-inherit text-[#d0333c] flex items-center justify-center space-x-2">
                <span className="bg-inherit text-[#d4d7d7]">
                  <FaLink className="bg-transparent" size={24} />
                </span>
                <a
                  href={careerPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d0333c] text-xl  font-bold hover:text-[#f3900b] hover:font-semibold "
                >
                  Career Page Link
                </a>
              </p>
            </div>
            {/* Website */}
            <div className="bg-inherit ">
              <p className="text-xl bg-inherit text-[#d0333c] flex items-center justify-center space-x-2">
                <span className="bg-transparent text-white">
                  <FaLink className="bg-transparent" size={24} />
                </span>
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d0333c] text-xl  font-bold hover:text-[#f3900b] hover:font-semibold"
                >
                  <span className="bg-transparent font-bold">
                    Company Website
                  </span>
                </a>
              </p>
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
                className="bg-[#d0333c] tracking-widest font-bold flex items-center justify-center
                 w-40 text-center text-xl text-white px-4 py-2 rounded-md hover:text-[#d0333c] hover:bg-[#aba6a6]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skills End */}

        {/* About the Job */}
        <div className="w-full px-2 bg-transparent mt-4 font-Inter">
          <h4 className="text-2xl md:text-3xl font-bold mb-4 text-center bg-inherit  text-[#d4d7d7] tracking-[0.25em]">
            About the Job
          </h4>
          <div
            className="text-xl text-white  bg-transparent "
            id="jobDesc"
            dangerouslySetInnerHTML={{ __html: modifiedHTML }}
          ></div>

          {/* Apply button */}
          <div className="flex justify-center mt-4 bg-inherit">
            <a
              href={careerPage}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg text-xl border bg-transparent text-[#d0333c] hover:bg-[#d0333c] hover:text-[#d4d7d7]
               border-[#d0333c] hover:border-[#d4d7d7] transition-colors duration-200 ease-in-out"
            >
              Apply Now
            </a>
          </div>

          {/* New and Featured tags */}
          {/*           <div className="mt-4 flex justify-center">
            {isNew && (
              <span className="bg-blue-500 text-white px-4 py-2 rounded-sm text-lg mr-4">
                New!
              </span>
            )}
            {featured && (
              <span className="bg-yellow-500 text-white px-4 py-2 rounded-sm text-lg">
                Featured
              </span>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;

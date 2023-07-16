import React from "react";

function JobDetailPage({ job }) {
  const {
    company,
    logo,
    isNew,
    featured,
    position,
    location,
    type,
    setting,
    website,
    careerPage,
    description,
    skills,
  } = job;

  return (
    <div className="flex justify-center items-center overflow-hidden">
      <div className="rounded-md p-8 mt-8 mb-8 md:w-[1024px] max-w-screen-lg">
        {/* Company and Position */}
        <div className="flex flex-row items-center justify-center">
          <img
            src={logo}
            alt={company}
            className="w-32 h-32 mr-8 rounded-full md:w-40 md:h-40"
          />
          <div className="">
            <h2 className="text-3xl md:text-4xl md:font-bold ">{position}</h2>
            <h3 className="text-2xl font-mono font-semibold">{company}</h3>
          </div>
        </div>

        {/* Type*/}
        <div className="w-full mt-4 flex  sm:flex-col">
          <div>
            {/* Type */}
            <div className="mb-4  ">
              <div className="text-center mb-2">
                <p className=" font-bold text-xl uppercase">Type of work</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {type &&
                  type.map((jobType, index) => (
                    <div
                      key={index}
                      className="bg-stone-900 text-white px-4 py-2 rounded-sm"
                    >
                      {jobType.name.charAt(0).toUpperCase() +
                        jobType.name.slice(1)}
                    </div>
                  ))}
              </div>
            </div>
            {/* Work Setting */}
            <div className="sm:mb-4 col-start-2">
              <div className="text-center mb-2">
                <p className=" font-bold text-xl uppercase">Work Setting</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {setting &&
                  setting.map((jobSetting, index) => (
                    <div
                      key={index}
                      className="bg-stone-900 text-white px-4 py-2 rounded-sm"
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
          <div className="mx-4 flex sm:flex-row flex-col gap-5 justify-evenly h-full">
            {/* Location */}
            <div className="">
              <p className="text-lg">
                <strong>Location:</strong> {location}
              </p>
            </div>

            {/* Career page */}
            <div className="">
              <p className="text-lg">
                <strong>Career Page:</strong>{" "}
                <a
                  href={careerPage}
                  target="_blank"
                  to={website}
                  rel="noopener noreferrer"
                  className="text-blue-600  hover:text-blue-900 hover:font-semibold "
                >
                  Career Page Link
                </a>
              </p>
            </div>
            {/* Website */}
            <div className="">
              <p className="text-lg">
                <strong>Website:</strong>{" "}
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-900 hover:font-semibold "
                >
                  {website}
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* Skills  */}
        <div className="my-2">
          <div className="text-xl font-bold uppercase text-center">Skills</div>
          <div className="flex flex-wrap justify-center">
            {skills.slice().map((skill, index) => (
              <span
                key={index}
                className="text-white bg-blue-700 font-bold m-2 p-2 rounded-sm min-w-fit max-w-fit"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skills End */}
        {/* About the Job */}
        <div className="w-full px-2">
          <h4 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            About the Job
          </h4>
          <div
            className="text-lg px-2"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>

          {/* Apply button */}
          <div className="flex justify-center mt-4">
            <a
              href={careerPage}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-800 text-white px-4 py-2 rounded-sm text-lg hover:bg-blue-700 hover:text-white transition-colors duration-200 ease-in-out"
            >
              Apply Now
            </a>
          </div>

          {/* New and Featured tags */}
          <div className="mt-4 flex justify-center">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;

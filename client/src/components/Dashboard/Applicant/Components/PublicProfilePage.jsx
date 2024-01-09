import React, { useEffect } from "react";
import { RxDash } from "react-icons/rx";
import { FaFileAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getStudentProfile } from "../../../../features/profiles/profileSlice";
import { useParams } from "react-router-dom";

/* VIEW PROFILE COMPONENT START */
function StudentProfilePage({ profiles }) {
  console.log("Profiles in StundetProfilePage", profiles);
  const srcBanner =
    profiles.bannerImage ||
    "https://skillmint-job-images.s3.eu-west-2.amazonaws.com/Applicant-Profile-Images/profilebannerPlaceHolder.png";
  const srcProfile =
    profiles.profileImage ||
    "https://skillmint-job-images.s3.eu-west-2.amazonaws.com/Applicant-Profile-Images/profilePictureBlank.png";

  // Create a variable to store the topmost indexed uniName
  const topUniName =
    profiles?.education && profiles.education.length > 0
      ? profiles.education[0].uniName
      : null;
  return (
    <div className="space-y-5 min-h-screen max-w-7xl mx-auto pt-2 pb-5">
      {/* HEADER */}
      <div className="header flex flex-col gap-8 rounded-xl shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] relative z-0">
        <span className="banner relative ">
          <span className="h-[216px] w-[1584px]">
            <img
              src={srcBanner}
              alt="banner"
              className="rounded-t-xl object-fill w-full h-full max-h-[216px] max-w-[1584px]"
            />
          </span>
          <img
            src={srcProfile}
            alt="profile"
            className="dp absolute w-24 sm:w-36 mask mask-circle -bottom-10 left-10"
          />
        </span>
        <span className="headerContent flex w-full gap-8 p-3  pb-4 relative ">
          {profiles?.headerContent !== null ? (
            <>
              {profiles?.headerContent?.FirstName ||
              profiles?.headerContent?.MiddleName ||
              profiles?.headerContent?.LastName ||
              profiles?.headerContent?.Location ? (
                <>
                  <span className="headerContentLeft w-2/3 space-y-1">
                    <h1 className="name text-[20px] font-Poppins font-semibold">
                      {profiles?.headerContent?.FirstName}{" "}
                      {profiles?.headerContent?.MiddleName}{" "}
                      {profiles?.headerContent?.LastName}
                    </h1>
                    <h1 className="headline text-[15px] font-Poppins font-normal">
                      {profiles?.headerContent?.Headline}
                    </h1>
                    <h1 className="location text-[13px] font-Poppins pt-2">
                      {profiles?.headerContent?.Location}
                    </h1>
                  </span>
                </>
              ) : null}
              {profiles?.ApplicantCV || profiles?.education ? (
                <span className="headerContentRight w-1/3 flex flex-col justify-evenly items-center">
                  {profiles?.education ? (
                    <h1 className="text-[15px] font-Poppins font-normal text-center  ">
                      {topUniName}
                    </h1>
                  ) : (
                    <h1 className="text-[15px] font-Poppins font-normal text-center text-gray-400 ">
                      University
                    </h1>
                  )}
                  {profiles.ApplicantCV ? (
                    <a
                      href={profiles?.ApplicantCV}
                      target="_blank"
                      rel="noreferrer"
                      className="font-Poppins text-[16px] font-medium px-3 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 hover:text-white ease-in-out duration-150 uppercase w-fit flex items-center justify-center gap-2"
                    >
                      <FaFileAlt size={22} /> CV / RESUME
                    </a>
                  ) : (
                    <h1 className="text-[15px] font-Poppins font-normal text-center ">
                      No CV uploaded
                    </h1>
                  )}
                </span>
              ) : null}
            </>
          ) : null}
        </span>
      </div>

      {/* ABOUT */}
      <div className="about w-full bg-white rounded-xl  shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px]  ">
        <h1 className="text-[20px] font-Poppins font-semibold p-2  shadow-[rgba(0,_0,_0,_0.045)_0px_1px_5px] rounded-t-xl">
          About
        </h1>
        <div className="aboutsec text-[14px] p-3 font-Poppins">
          {profiles?.aboutSection && profiles.aboutSection !== "" ? (
            <p className=" ">{profiles.aboutSection}</p>
          ) : (
            <p className="  ">No personal statement.</p>
          )}
        </div>
      </div>
      {/* Experience */}
      <div className="experience w-full bg-white rounded-xl  shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] flex flex-col gap-2">
        <h1 className="text-[20px] font-Poppins font-semibold p-2  shadow-[rgba(0,_0,_0,_0.045)_0px_1px_5px] rounded-t-xl">
          Experience
        </h1>
        {profiles?.experiences?.length > 0 ? (
          profiles.experiences.map((experience, index) => (
            <div
              key={index}
              className="experience-entry p-3 mx-2 mb-2 pb-1 
              rounded-md rounded-tr-3xl rounded-bl-3xl"
            >
              <span className="experience-details flex w-full">
                <span className="w-1/2 mb-[2px] flex flex-col gap-1">
                  <span className="role font-Poppins text-[16px] font-normal flex items-end gap-2">
                    <p>{experience.roleTitle}</p>{" "}
                    <p className="text-[12px]">{experience.roleType}</p>
                  </span>
                  <h1 className="company font-Poppins text-[14px] font-medium">
                    {experience.roleCompany}
                  </h1>
                </span>
                <span className="w-1/2 text-end mb-[2px] flex flex-col gap-1">
                  <h1 className="date font-Poppins text-[14px] font-normal flex justify-end">
                    {experience.roleDateStart}{" "}
                    {experience.roleDateStart && experience.roleDateEnd ? (
                      <RxDash size={17} className="text-gray-500" />
                    ) : null}
                    {experience.roleDateEnd}
                  </h1>
                  <span className="location setting font-Poppins text-[14px] font-normal ">
                    {/*                   <span className="location setting font-Poppins text-[14px] font-normal flex w-full">
                    <p className="w-1/2 text-center"> {experience.roleType}</p>
                    <p className="w-1/2 text-center">
                      {experience.roleLocation}
                    </p>
                  </span> */}
                    <p className="">{experience.roleLocation}</p>
                  </span>
                </span>
              </span>
              <p className="job duties font-Poppins text-[14px] font-normal my-2">
                {experience.roleDuties}
              </p>
              <div className="skills my-2">
                <h1 className="font-Poppins text-[16px] font-medium border-b ">
                  {experience?.roleSkills ? "Skills" : null}
                </h1>
                <h1 className="skillist font-Poppins text-[14px] font-normal w-fit pt-2">
                  {experience.roleSkills}
                </h1>
              </div>
            </div>
          ))
        ) : (
          <p className="font-Poppins text-[14px] font-normal p-3">
            No experience listed.
          </p>
        )}
      </div>

      {/* Education */}
      <div className="education w-full bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] flex flex-col gap-2">
        <h1 className="text-[20px] font-Poppins font-semibold p-2  shadow-[rgba(0,_0,_0,_0.045)_0px_1px_5px] rounded-t-xl">
          Education
        </h1>
        {profiles?.education?.length > 0 ? (
          profiles.education.map((educationItem, index) => (
            <div
              key={index}
              className="experience-entry p-3 mx-2 mb-2 pb-1 rounded-md rounded-tr-3xl rounded-bl-3xl"
            >
              <span className="education1 flex w-full">
                <span className="w-1/2 flex flex-col gap-1">
                  <h1 className="degree font-Poppins text-[16px] font-semibold">
                    {educationItem.uniDegree}
                  </h1>
                  <span className="role font-Poppins flex items-end gap-2">
                    <p className="text-[14px] font-medium">
                      {educationItem.uniName}
                    </p>
                    <p className="text-[12px]">{educationItem?.uniGrade}</p>
                  </span>

                  {/*                   <h1 className="grade font-Poppins text-[14px] font-normal">
                    Grade:
                  </h1> */}
                </span>
                <span className="w-1/2 text-end flex flex-col gap-1">
                  <h1 className="date font-Poppins text-[14px] font-normal flex justify-end">
                    {educationItem.uniStartDate}{" "}
                    {educationItem.uniStartDate && educationItem.uniEndDate ? (
                      <RxDash size={17} className="text-gray-500" />
                    ) : null}{" "}
                    {educationItem.uniEndDate}
                  </h1>
                  <h1 className="location setting font-Poppins text-[14px] font-normal">
                    {educationItem.uniLocation}
                  </h1>
                </span>
              </span>
              <p className="academic about font-Poppins text-[14px] font-normal my-2">
                {educationItem.uniSection}
              </p>
              <div className="skills my-2">
                <h1 className="font-Poppins text-[16px] font-medium border-b ">
                  {educationItem?.uniSkills ? "Skills" : null}
                </h1>
                <h1 className="skillist font-Poppins text-[14px] font-normal w-fit pt-2">
                  {educationItem.uniSkills}
                </h1>
              </div>
            </div>
          ))
        ) : (
          <p className="font-Poppins text-[14px] font-normal p-3">
            No Education listed.
          </p>
        )}
      </div>
    </div>
  );
}
/* VIEW PROFILE COMPONENT END */

/* MAIN COMPONENT */
function PublicProfilePage({}) {
  const { studentId } = useParams();

  const { profiles, isLoading } = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      if (studentId) {
        await dispatch(getStudentProfile(studentId));
      } else {
        console.log("Invalid student ID");
      }
    };

    fetchData();
  }, [studentId, dispatch]);

  if (isLoading) {
    return (
      <>
        <div className="w-full flex justify-center items-center min-h-screen">
          <h1 className="loading loading-lg loading-spinner text-red-600"></h1>
        </div>
      </>
    );
  }
  return (
    <>
      {Array.isArray(profiles) &&
        profiles.map((profile) => {
          return <StudentProfilePage key={profile._id} profiles={profile} />;
        })}
    </>
  );
}

export default PublicProfilePage;

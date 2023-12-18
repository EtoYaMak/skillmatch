import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { MdOutlineFileUpload } from "react-icons/md";
import {
  FaRegImage,
  FaRegEdit,
  FaFileAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { LuListPlus } from "react-icons/lu";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createProfile,
  getProfile,
} from "../../../features/profiles/profileSlice";

function HeaderBlock({ formData, setFormData }) {
  /* Header Modal */
  const [selectedprofileImage, setprofileImage] = useState(
    "https://media.licdn.com/dms/image/D4E03AQHig7LtBns85Q/profile-displayphoto-shrink_400_400/0/1696993962952?e=1707955200&v=beta&t=WkndwQ9BKC5J23CFbn1GD1R1UZFk5fo4XshCGAxnLvg"
  );
  const [selectedbannerImage, setbannerImage] = useState(
    "https://media.licdn.com/dms/image/D4D16AQEz_eilIlP63w/profile-displaybackgroundimage-shrink_350_1400/0/1701948566295?e=1707955200&v=beta&t=bdsEFzJYqRI_Cb1HnVuTLnd1BbaGmvF8NOsUUPfXpZk"
  );

  const handleFileChangeBanner = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        bannerImage: file, // Store the File object directly
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setbannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileChangeDP = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profileImage: file, // Store the File object directly
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setprofileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [isHeaderModalOpen, setIsHeaderModaOpen] = useState(false);
  const openHeaderModal = () => {
    setIsHeaderModaOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling
  };

  const closeHeaderModal = () => {
    setIsHeaderModaOpen(false);
    document.body.style.overflow = ""; // Enable scrolling
  };
  const handleHeaderContentChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      headerContent: {
        ...prevData.headerContent,
        [field]: value,
      },
    }));
  };
  const handleSaveHeaderChanges = () => {
    // Implement the logic to save the header changes to your profile
    closeHeaderModal(); // Close the modal after saving changes
  };
  const handleFileCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        ApplicantCV: file, // Store the File object directly
      });
      /*       
      const reader = new FileReader();
      reader.onloadend = () => {
        setApplicantCV(reader.result);
      };
      reader.readAsDataURL(file); */
    }
  };
  return (
    <>
      {/* HEADER */}
      <div className="header flex flex-col gap-12 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] relative z-0">
        <span className="banner relative ">
          <span className="h-[216px] w-[1584px]">
            <img
              src={selectedbannerImage}
              alt="banner"
              className="rounded-t-xl object-fill w-full h-full max-h-[216px] max-w-[1584px]"
            />
          </span>
          {/* bannerImage upload */}
          <span className="w-40 h-40 opacity-0 hover:opacity-100">
            <label
              htmlFor="bannerImage"
              className="banner   absolute flex justify-center items-center w-full h-full top-0  cursor-pointer  hover:bg-white/50  rounded-t-xl shadow-[rgba(0,_0,_0,_0.1)_0px_1px_3px] hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            >
              <FaRegImage size={33} className="text-white" />
            </label>
            <input
              type="file"
              name="bannerImage"
              id="bannerImage"
              className="sr-only"
              onChange={handleFileChangeBanner}
            />
          </span>
          <img
            src={selectedprofileImage}
            alt=""
            className="dp absolute w-24 sm:w-36 mask mask-circle -bottom-10 left-10"
          />
          {/* profileImage upload */}
          <span className="w-40 h-40 opacity-0 hover:opacity-100">
            <label
              htmlFor="profileImage"
              className="dp absolute -bottom-10 left-10 cursor-pointer w-24 sm:w-36 h-24 sm:h-36 bg-white/40 hover:bg-white/50 flex justify-center items-center rounded-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_3px] hover:shadow-[rgba(255,_255,_255,_1)_0px_3px_8px]"
            >
              <MdOutlineFileUpload size={45} className="text-white" />
            </label>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              className="sr-only"
              onChange={handleFileChangeDP}
            />
          </span>
        </span>
        <Modal
          isOpen={isHeaderModalOpen}
          onRequestClose={closeHeaderModal}
          contentLabel="Add Header Modal"
          ariaHideApp={false}
          className=" flex flex-col justify-center items-center min-h-screen z-20"
        >
          <span className="max-w-3xl w-full p-8 flex flex-col gap-4 bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] font-Poppins">
            <h2>Profile Header</h2>
            {/* NAME */}
            <div className="mb-4">
              <span className="flex gap-4">
                <span className="">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="FirstName"
                    className="mt-1 p-2 w-full border rounded-md"
                    value={formData?.headerContent.FirstName}
                    onChange={(e) =>
                      handleHeaderContentChange("FirstName", e.target.value)
                    }
                  />
                </span>
                <span>
                  <label
                    htmlFor="MiddleName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="MiddleName"
                    className="mt-1 p-2 w-full border rounded-md"
                    alue={formData?.headerContent.MiddleName}
                    onChange={(e) =>
                      handleHeaderContentChange("MiddleName", e.target.value)
                    }
                  />
                </span>{" "}
                <span>
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="LastName"
                    className="mt-1 p-2 w-full border rounded-md"
                    value={formData?.headerContent.LastName}
                    onChange={(e) =>
                      handleHeaderContentChange("LastName", e.target.value)
                    }
                  />
                </span>
              </span>
            </div>
            {/* Headline */}
            <div className="mb-4">
              <label
                htmlFor="Headline"
                className="block text-sm font-medium text-gray-700"
              >
                Headline
              </label>
              <input
                type="text"
                id="Headline"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData?.headerContent.Headline}
                onChange={(e) =>
                  handleHeaderContentChange("Headline", e.target.value)
                }
              />
            </div>
            {/* Location */}
            <div className="mb-4">
              <label
                htmlFor="Location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="Location"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData?.headerContent.Location}
                onChange={(e) =>
                  handleHeaderContentChange("Location", e.target.value)
                }
              />
            </div>

            <span className="flex justify-between">
              <button type="button" onClick={handleSaveHeaderChanges}>
                Save Changes
              </button>
              <button type="button" onClick={closeHeaderModal}>
                Cancel
              </button>
            </span>
          </span>
        </Modal>
        <span className="headerContent flex w-full gap-8 p-3  pb-4 relative ">
          {formData?.headerContent ? (
            <>
              {formData?.headerContent?.FirstName ||
              formData?.headerContent?.MiddleName ||
              formData?.headerContent?.LastName ||
              formData?.headerContent?.Location ? (
                <>
                  <span className="headerContentLeft w-2/3 space-y-1">
                    <h1 className="name text-[20px] font-Poppins font-semibold">
                      {formData?.headerContent?.FirstName}{" "}
                      {formData?.headerContent?.MiddleName}{" "}
                      {formData?.headerContent?.LastName}
                    </h1>
                    <h1 className="headline text-[15px] font-Poppins font-normal">
                      {formData?.headerContent?.Headline}
                      {/*
                React Developer | SysAdmin | Networks | Cyber security | IT Support
                 */}
                    </h1>
                    <h1 className="location text-[13px] font-Poppins pt-2">
                      {formData?.headerContent?.Location}
                      {/* Birmingham, England, United Kingdom */}
                    </h1>
                  </span>
                </>
              ) : null}
              {formData?.ApplicantCV || formData.education?.uniName ? (
                <span className="headerContentRight w-1/3 flex flex-col justify-evenly items-center">
                  <h1 className="text-[15px] font-Poppins font-normal text-center "></h1>
                </span>
              ) : null}
            </>
          ) : null}

          <button
            type="button"
            onClick={openHeaderModal}
            className="w-fit absolute right-3 -top-6 "
          >
            <FaRegEdit className="text-black" size={22} />
          </button>
        </span>
      </div>

      {/* RESUME */}
      {formData.ApplicantCV === null ? (
        <div className="flex justify-end items-center">
          <label
            htmlFor="ApplicantCV"
            className="flex items-center justify-center px-3 py-1 bg-blue-700 rounded-md text-[15px] font-Poppins gap-2 text-white hover:bg-blue-500 hover:text-white ease-in-out duration-150"
          >
            <FaCloudUploadAlt size={20} />
            Upload CV
          </label>
          <input
            type="file"
            name="ApplicantCV"
            id="ApplicantCV"
            className="sr-only"
            onChange={handleFileCvChange}
          />
        </div>
      ) : (
        <a
          href={formData?.headerContent.ApplicantCV}
          target="_blank"
          rel="noreferrer"
          className="font-Poppins text-[16px] font-medium px-3 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 hover:text-white ease-in-out duration-150 uppercase w-fit flex items-center justify-center gap-2"
        >
          <FaFileAlt size={22} /> CV / RESUME
        </a>
      )}
    </>
  );
}

function AboutBlock({ formData, setFormData }) {
  /* About Modal */
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const openAboutModal = () => {
    setIsAboutModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling
    // Set the initial input value when opening the modal
  };

  const closeAboutModal = () => {
    setIsAboutModalOpen(false);
    document.body.style.overflow = ""; // Enable scrolling
  };
  // Function to handle changes in the about input
  const handleAboutChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      aboutSection: event.target.value,
    }));
  };

  // Function to handle the Save button click
  const handleSaveAbout = () => {
    closeAboutModal();
    // You can add additional logic here if needed
  };
  return (
    <>
      {/* ABOUT */}
      <div className="about w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col gap-4">
        <h1 className="text-[20px] font-Poppins font-semibold flex items-center py-1 justify-between">
          About{" "}
          <button type="button" onClick={openAboutModal} className="w-fit ">
            <FaRegEdit size={22} />
          </button>
        </h1>
        {/* MAP */}
        {formData?.aboutSection && (
          <span className="experience-entry flex flex-col gap-3 p-2 rounded-md bg-[#fafafa]">
            {formData?.aboutSection}
          </span>
        )}

        <Modal
          isOpen={isAboutModalOpen}
          onRequestClose={closeAboutModal}
          contentLabel="Add Experience Modal"
          ariaHideApp={false}
          className=" flex flex-col justify-center items-center min-h-screen"
        >
          <span className="max-w-3xl w-full p-8 flex flex-col gap-4 bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] font-Poppins">
            <h2>About</h2>
            <input
              type="text"
              id="aboutSection"
              className="w-full p-2 text-[14px] font-Poppins"
              value={formData.aboutSection}
              onChange={handleAboutChange}
            />
            <span className="flex justify-between">
              <button type="button" onClick={handleSaveAbout}>
                Save
              </button>
              <button type="button" onClick={closeAboutModal}>
                Cancel
              </button>
            </span>
          </span>
        </Modal>
      </div>
    </>
  );
}
function ExperienceBlock({ formData, setFormData }) {
  /* Experience Modal */
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const openExperienceModal = () => {
    setIsExperienceModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling
  };

  const closeExperienceModal = () => {
    setIsExperienceModalOpen(false);
    document.body.style.overflow = ""; // Enable scrolling
  };
  const handleAddExperience = () => {
    // Add an empty experience object to the array
    setFormData((prevData) => ({
      ...prevData,
      experiences: [
        ...prevData.experiences,
        {
          roleTitle: "",
          roleCompany: "",
          roleDateStart: "",
          roleDateEnd: "",
          roleLocation: "",
          roleType: "",
          roleDuties: "",
          roleSkills: "",
        },
      ],
    }));
    closeExperienceModal(); // Close the modal after adding experience
  };

  const handleExperienceChange = (index, field, value) => {
    // Update the specific experience field
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      experiences: updatedExperiences,
    });
  };
  /*   const handleAddExperience = () => {
    closeExperienceModal(); // Close the modal after adding experience
    setFormData((prevData) => {
      const newExperiences = [
        ...(prevData.experiences || []),
        {
          roleTitle: "",
          roleCompany: "",
          roleDateStart: "",
          roleDateEnd: "",
          roleLocation: "",
          roleType: "",
          roleDuties: "",
          roleSkills: "",
        },
      ];

      // Filter out empty experiences before updating the state
      const filteredExperiences = newExperiences.filter((experience) =>
        Object.values(experience).some(
          (value) => value !== "" || value === null
        )
      );

      return {
        ...prevData,
        experiences: filteredExperiences,
      };
    });
  };

  const handleExperienceChange = (index, field, value) => {
    setFormData((prevData) => {
      const newExperiences = [...prevData.experiences];
      newExperiences[index][field] = value;
      return { ...prevData, experiences: newExperiences };
    });
  }; */
  return (
    <>
      {" "}
      {/* Experience */}
      <div className="relative experience w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col gap-4">
        <h1 className="text-[20px] font-Poppins font-semibold flex items-center py-1 justify-between">
          Experience{" "}
          <button
            type="button"
            onClick={openExperienceModal}
            className="w-fit "
          >
            <LuListPlus size={24} />
          </button>
        </h1>

        {Array.isArray(formData.experiences) &&
          formData.experiences.map((experience, index) => {
            const essentialProperties = [
              "roleTitle",
              "roleCompany",
              "roleDateStart",
              "roleDateEnd",
              "roleLocation",
              "employmentType",
              "roleDuties",
              "roleSkills",
            ];

            // Check if at least one essential property is present
            if (essentialProperties.some((prop) => experience?.[prop])) {
              return (
                <div
                  key={index}
                  className="experience-entry flex flex-col gap-3 p-2 rounded-md bg-[#fafafa]"
                >
                  <span className="experience1 flex w-full">
                    <span className="w-1/2">
                      {experience?.roleTitle && (
                        <h1 className="uniName font-Poppins text-[16px] font-medium">
                          {experience.roleTitle}
                        </h1>
                      )}
                      {experience?.roleCompany && (
                        <h1 className="company font-Poppins text-[14px] font-normal">
                          {experience.roleCompany}
                        </h1>
                      )}
                    </span>
                    <span className="w-1/2 text-end">
                      {experience?.roleDateStart && experience?.roleDateEnd && (
                        <h1 className="date font-Poppins text-[14px] font-normal">
                          {experience.roleDateStart} {/* · */}{" "}
                          {experience.roleDateEnd}
                        </h1>
                      )}
                      {experience?.roleLocation &&
                        experience?.employmentType && (
                          <h1 className="location setting font-Poppins text-[14px] font-normal">
                            {experience.roleLocation} {/* · */}{" "}
                            {experience.employmentType}
                          </h1>
                        )}
                    </span>
                  </span>
                  {experience?.roleDuties && (
                    <p className="job duties font-Poppins text-[14px] font-normal">
                      {experience.roleDuties}
                    </p>
                  )}
                  {experience?.roleSkills && (
                    <div className="skills my-2">
                      <h1 className="font-Poppins text-[16px] font-semibold ">
                        Skills
                      </h1>
                      <h1 className="skillist font-Poppins text-[14px] font-normal">
                        {experience.roleSkills}
                      </h1>
                    </div>
                  )}
                  {/* Add similar display for other experience details */}
                </div>
              );
            }

            return null; // Skip rendering if no essential property is present
          })}
        <Modal
          isOpen={isExperienceModalOpen}
          onRequestClose={closeExperienceModal}
          contentLabel="Add Experience Modal"
          ariaHideApp={false}
          className=" flex flex-col justify-center items-center min-h-screen"
        >
          <span className="max-w-3xl w-full p-8 flex flex-col gap-4 bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] font-Poppins">
            <h2>Add Experience</h2>

            {/* Role Title and Company */}
            <div className="mb-4">
              <label
                htmlFor="roleTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Role Title
              </label>
              <input
                type="text"
                id="roleTitle"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.experiences.roleTitle}
                onChange={(e) =>
                  handleExperienceChange(
                    formData.experiences.length - 1,
                    "roleTitle",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="roleCompany"
                className="block text-sm font-medium text-gray-700"
              >
                Company
              </label>
              <input
                type="text"
                id="roleCompany"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.experiences.roleCompany}
                onChange={(e) =>
                  handleExperienceChange(
                    formData.experiences.length - 1,
                    "roleCompany",
                    e.target.value
                  )
                }
              />
            </div>

            {/* Start Date */}
            <div className="mb-4">
              <label
                htmlFor="roleDateStart"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id="roleDateStart"
                className="mt-1 p-2 w-full border rounded-md"
                value={
                  formData.experiences[formData.experiences.length - 1]
                    .roleDateStart
                }
                onChange={(e) =>
                  handleExperienceChange(
                    formData.experiences.length - 1,
                    "roleDateStart",
                    e.target.value
                  )
                }
              />
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label
                htmlFor="roleDateEnd"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="roleDateEnd"
                className="mt-1 p-2 w-full border rounded-md"
                value={
                  formData.experiences[formData.experiences.length - 1]
                    .roleDateEnd
                }
                onChange={(e) =>
                  handleExperienceChange(
                    formData.experiences.length - 1,
                    "roleDateEnd",
                    e.target.value
                  )
                }
              />
            </div>
            {/* Location */}
            <div className="mb-4 flex w-full gap-8">
              <span className="w-2/3">
                <label
                  htmlFor="roleLocation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="roleLocation"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.experiences.roleLocation}
                  onChange={(e) =>
                    handleExperienceChange(
                      formData.experiences.length - 1,
                      "roleLocation",
                      e.target.value
                    )
                  }
                />
              </span>
              <span className="w-1/3">
                <label
                  htmlFor="employmentType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employment Type
                </label>
                <select
                  id="employmentType"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.experiences.employmentType}
                  onChange={(e) =>
                    handleExperienceChange(
                      formData.experiences.length - 1,
                      "employmentType",
                      e.target.value
                    )
                  }
                >
                  <option value="" disabled hidden>
                    Employment Type
                  </option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </span>
            </div>

            {/* Job Duties */}
            <div className="mb-4">
              <label
                htmlFor="roleDuties"
                className="block text-sm font-medium text-gray-700"
              >
                Job Duties
              </label>
              <textarea
                id="roleDuties"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.experiences.roleDuties}
                onChange={(e) =>
                  handleExperienceChange(
                    formData.experiences.length - 1,
                    "roleDuties",
                    e.target.value
                  )
                }
              />
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label
                htmlFor="roleSkills"
                className="block text-sm font-medium text-gray-700"
              >
                Skills
              </label>
              <input
                type="text"
                id="roleSkills"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.experiences.roleSkills}
                onChange={(e) =>
                  handleExperienceChange(
                    formData.experiences.length - 1,
                    "roleSkills",
                    e.target.value
                  )
                }
              />
            </div>
            <span className="flex justify-between">
              <button type="button" onClick={handleAddExperience}>
                Save Experience
              </button>
              <button type="button" onClick={closeExperienceModal}>
                Cancel
              </button>
            </span>
          </span>
        </Modal>
      </div>
    </>
  );
}
function EducationBlock({ formData, setFormData }) {
  /* Education Modal */
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const openEducationModal = () => {
    setIsEducationModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling
  };

  const closeEducationModal = () => {
    setIsEducationModalOpen(false);
    document.body.style.overflow = ""; // Enable scrolling
  };

  const handleAddEducation = () => {
    closeEducationModal(); // Close the modal after adding education
    setFormData((prevData) => {
      const newEducation = [
        ...(prevData.education || []), // Ensure education is an array
        {
          uniName: "",
          uniDegree: "",
          uniGrade: "",
          uniStartDate: "",
          uniEndDate: "",
          uniLocation: "",
          uniSection: "",
          uniSkills: "",
        },
      ];

      // Filter out empty education entries before updating the state
      const filteredEducation = newEducation.filter((edu) =>
        Object.values(edu).some((value) => value !== "" || value === null)
      );

      return {
        ...prevData,
        education: filteredEducation,
      };
    });
  };

  const handleEducationChange = (index, field, value) => {
    setFormData((prevData) => {
      const newEducation = [...prevData.education];
      newEducation[index][field] = value;
      return { ...prevData, education: newEducation };
    });
  };
  return (
    <>
      {/* Education */}
      <div className="education w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col gap-4">
        <h1 className="text-[20px] font-Poppins font-semibold flex items-center py-1 justify-between">
          Education{" "}
          <button type="button" onClick={openEducationModal} className="w-fit ">
            <LuListPlus size={24} />
          </button>
        </h1>

        {Array.isArray(formData.education) &&
          formData.education.map((edu, index) => {
            const essentialProperties = [
              "uniName",
              "uniDegree",
              "uniGrade",
              "uniStartDate",
              "uniEndDate",
              "uniLocation",
              "uniSection",
              "uniSkills",
            ];

            // Check if at least one essential property is present
            if (essentialProperties.some((prop) => edu[prop])) {
              return (
                <div
                  key={index}
                  className="education-entry flex flex-col gap-3 p-2 rounded-md bg-[#fafafa]"
                >
                  <span className="education1 flex w-full">
                    <span className="w-1/2">
                      {edu?.uniName && (
                        <h1 className="uniName font-Poppins text-[16px] font-medium">
                          {edu.uniName}
                        </h1>
                      )}
                      {edu?.uniDegree && (
                        <h1 className="uniDegree font-Poppins text-[14px] font-normal">
                          {edu.uniDegree}
                        </h1>
                      )}
                      {edu?.uniGrade && (
                        <h1 className="uniGrade font-Poppins text-[14px] font-normal">
                          {edu.uniGrade}
                        </h1>
                      )}
                    </span>
                    <span className="w-1/2 text-end">
                      {edu?.uniStartDate && edu?.uniEndDate && (
                        <h1 className="date font-Poppins text-[14px] font-normal">
                          {edu.uniStartDate} {/* · */} {edu.uniEndDate}
                        </h1>
                      )}
                      {edu?.uniLocation && (
                        <h1 className="location setting font-Poppins text-[14px] font-normal">
                          {edu.uniLocation}
                        </h1>
                      )}
                    </span>
                  </span>
                  {edu?.uniSection && (
                    <p className="uniSection font-Poppins text-[14px] font-normal">
                      {edu.uniSection}
                    </p>
                  )}
                  {edu?.uniSkills && (
                    <div className="uniSkills my-2">
                      <h1 className="skillist font-Poppins text-[14px] font-normal">
                        {edu.uniSkills}
                      </h1>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}

        <Modal
          isOpen={isEducationModalOpen}
          onRequestClose={closeEducationModal}
          contentLabel="Add Education Modal"
          ariaHideApp={false}
          className=" flex flex-col justify-center items-center min-h-screen"
        >
          <span className="max-w-3xl w-full p-8 flex flex-col gap-4 bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] font-Poppins">
            <h2>Add Education</h2>
            <div className="mb-4">
              {/* University  */}
              <label
                htmlFor="uniName"
                className="block text-sm font-medium text-gray-700"
              >
                University
              </label>
              <input
                type="text"
                id="uniName"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.education.uniName}
                onChange={(e) =>
                  handleEducationChange(
                    formData.education.length - 1,
                    "uniName",
                    e.target.value
                  )
                }
              />
            </div>
            {/* Degree */}
            <div className="mb-4">
              <label
                htmlFor="uniDegree"
                className="block text-sm font-medium text-gray-700"
              >
                Degree
              </label>
              <input
                type="text"
                id="uniDegree"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.education.uniDegree}
                onChange={(e) =>
                  handleEducationChange(
                    formData.education.length - 1,
                    "uniDegree",
                    e.target.value
                  )
                }
              />
            </div>
            {/* DATES */}
            <span className="flex w-full justify-start gap-4">
              {/* Start Date */}
              <div className="">
                <label
                  htmlFor="uniStartDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="uniStartDate"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.education.uniStartDate}
                  onChange={(e) =>
                    handleEducationChange(
                      formData.education.length - 1,
                      "uniStartDate",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* End Date */}
              <div className="">
                <label
                  htmlFor="uniEndDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="uniEndDate"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.education.uniEndDate}
                  onChange={(e) =>
                    handleEducationChange(
                      formData.education.length - 1,
                      "uniEndDate",
                      e.target.value
                    )
                  }
                />
              </div>
            </span>
            {/* Location */}
            <div className="mb-4 w-full">
              <label
                htmlFor="uniLocation"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="uniLocation"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.education.uniLocation}
                onChange={(e) =>
                  handleEducationChange(
                    formData.education.length - 1,
                    "uniLocation",
                    e.target.value
                  )
                }
              />
            </div>

            {/* Uni Desc. */}
            <div className="mb-4">
              <label
                htmlFor="uniSection"
                className="block text-sm font-medium text-gray-700"
              >
                About
              </label>
              <textarea
                id="uniSection"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.education.uniSection}
                onChange={(e) =>
                  handleEducationChange(
                    formData.education.length - 1,
                    "uniSection",
                    e.target.value
                  )
                }
              />
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label
                htmlFor="uniSkills"
                className="block text-sm font-medium text-gray-700"
              >
                Skills
              </label>
              <input
                type="text"
                id="uniSkills"
                className="mt-1 p-2 w-full border rounded-md"
                value={formData.education.uniSkills}
                onChange={(e) =>
                  handleEducationChange(
                    formData.education.length - 1,
                    "uniSkills",
                    e.target.value
                  )
                }
              />
            </div>
            <span className="flex justify-between">
              <button type="button" onClick={handleAddEducation}>
                Save Education
              </button>
              <button type="button" onClick={closeEducationModal}>
                Cancel
              </button>
            </span>
          </span>
        </Modal>
      </div>
    </>
  );
}

function CreateProfilePage(student) {
  const dispatch = useDispatch();
  const { profiles, isLoading } = useSelector(
    (state) => state.profiles.profiles
  );
  /*   useEffect(() => {
    const fetchData = async () => {
      if (student) {
        await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay time as needed
        dispatch(getProfile());
      } else {
        console.log("Unauthorized");
      }
    };

    fetchData();
  }, [student, dispatch]); */
  const [formData, setFormData] = useState({
    bannerImage: null,
    profileImage: null,
    ApplicantCV: null,
    headerContent: {
      FirstName: "",
      MiddleName: "",
      LastName: "",
      Headline: "",
      Location: "",
    },
    aboutSection: "",
    experiences: [
      {
        roleTitle: "",
        roleCompany: "",
        roleDateStart: "",
        roleDateEnd: "",
        roleLocation: "",
        roleType: "",
        roleDuties: "",
        roleSkills: "",
      },
    ],
    education: [
      {
        uniName: "",
        uniDegree: "",
        uniGrade: "",
        uniStartDate: "",
        uniEndDate: "",
        uniLocation: "",
        uniSection: "",
        uniSkills: "",
      },
    ],
  });
  const [selectedApplicantCV, setApplicantCV] = useState("");

  /*  */

  const onSubmit = (e) => {
    e.preventDefault();

    // Dispatch the action to send the data to the backend
    console.log(formData);
    dispatch(createProfile(formData));
  };
  return (
    <>
      <form
        className="space-y-8 min-h-screen relative"
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <span className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="px-3 py-2 bg-black text-white font-Poppins text-[15px] font-semibold"
          >
            Save Changes
          </button>
        </span>
        <HeaderBlock formData={formData} setFormData={setFormData} />
        <AboutBlock formData={formData} setFormData={setFormData} />
        <ExperienceBlock formData={formData} setFormData={setFormData} />
        <EducationBlock formData={formData} setFormData={setFormData} />
      </form>
    </>
  );
}
function StudentProfilePage() {
  return (
    <div className="space-y-5 min-h-screen">
      {/* HEADER */}
      <div className="header flex flex-col gap-12 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] relative">
        <span className="banner relative">
          <img
            src="https://media.licdn.com/dms/image/D4E03AQHig7LtBns85Q/profile-displayphoto-shrink_400_400/0/1696993962952?e=1707955200&v=beta&t=WkndwQ9BKC5J23CFbn1GD1R1UZFk5fo4XshCGAxnLvg"
            alt=""
            className="dp absolute w-24 sm:w-36 mask mask-circle -bottom-10 left-10"
          />
          <img
            src="https://media.licdn.com/dms/image/D4D16AQEz_eilIlP63w/profile-displaybackgroundimage-shrink_350_1400/0/1701948566295?e=1707955200&v=beta&t=bdsEFzJYqRI_Cb1HnVuTLnd1BbaGmvF8NOsUUPfXpZk"
            alt="banner"
            className="rounded-t-xl"
          />
        </span>
        <span className="headerContent flex w-full gap-8 p-3  pb-4">
          <span className="headerContentLeft w-2/3 space-y-1">
            <h1 className="name text-[20px] font-Poppins font-semibold">
              Muhammad Abdul Karim
            </h1>
            <h1 className="headline text-[15px] font-Poppins font-normal">
              React Developer | SysAdmin | Networks | Cyber security | IT
              Support
            </h1>
            <h1 className="location text-[13px] font-Poppins pt-2">
              Birmingham, England, United Kingdom
            </h1>
          </span>
          <span className="headerContentRight w-1/3 flex justify-center">
            <h1 className="text-[15px] font-Poppins font-normal ">
              University of Sunderland
            </h1>
          </span>
        </span>
      </div>
      {/* ABOUT */}
      <div className="about w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <h1 className="text-[20px] font-Poppins font-semibold">About</h1>
        <p className="w-full p-2 text-[14px] font-Poppins ">
          🚀 Tech Enthusiast | Network & Cybersecurity Enthusiast | Digital
          Architect Hello, I'm Muhammad Abdul Karim, a tech aficionado based in
          Birmingham, UK. My journey in the tech world has evolved, with a
          growing focus on network and cybersecurity.
        </p>
      </div>
      {/* Experience */}
      <div className="experience w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col gap-4">
        <h1 className="text-[20px] font-Poppins font-semibold">Experience</h1>
        <span className="experience1 flex w-full">
          <span className="w-1/2">
            <h1 className="role font-Poppins text-[16px] font-medium">
              Full-Stack Developer
            </h1>
            <h1 className="company font-Poppins text-[14px] font-normal">
              Thrive Creative Media
            </h1>
          </span>
          <span className="w-1/2 text-end">
            <h1 className="date font-Poppins text-[14px] font-normal">
              Apr 2018 - Jul 2019{" "}
            </h1>
            <h1 className="location setting font-Poppins text-[14px] font-normal">
              Dubai, United Arab Emirates · Hybrid
            </h1>
          </span>
        </span>
        <p className="job duties font-Poppins text-[14px] font-normal">
          Collaborated as a Full Stack Developer within a dynamic team, using
          technologies like Flutter, Java, and JavaScript to design and develop
          web and mobile applications, contributing to the successful delivery
          of creative and functional solutions. <br /> <br /> Managed the
          integration of AWS and Azure services into project workflows,
          optimizing cloud resources, and enhancing application performance,
          which played a critical role in supporting the efficient deployment of
          applications.
        </p>
        <div className="skills my-2">
          <h1 className="font-Poppins text-[16px] font-semibold ">Skills</h1>
          <h1 className="skillist font-Poppins text-[14px] font-normal">
            Computer Hardware · Operating Systems · Active Directory · Amazon
            Web Services (AWS) · Teamwork · Full-Stack Development · Flutter ·
            JavaScript
          </h1>
        </div>
      </div>

      {/* Education */}
      <div className="education w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col gap-4">
        <h1 className="text-[20px] font-Poppins font-semibold">Education</h1>
        <span className="education1 flex w-full">
          <span className="w-1/2">
            <h1 className="university font-Poppins text-[16px] font-medium">
              University of Sunderland
            </h1>
            <h1 className="degree font-Poppins text-[14px] font-normal">
              Bachelor of Science - BSc, Networks & CyberSecurity
            </h1>
            <h1 className="grade font-Poppins text-[14px] font-normal">
              Grade: First Class Honours
            </h1>
          </span>
          <span className="w-1/2 text-end">
            <h1 className="date font-Poppins text-[14px] font-normal">
              Sep 2019 - Jul 2022
            </h1>
            <h1 className="location setting font-Poppins text-[14px] font-normal">
              Sunderland, England, United Kingdom
            </h1>
          </span>
        </span>
        <p className="academic about font-Poppins text-[14px] font-normal">
          Collaborated as a Full Stack Developer within a dynamic team, using
          technologies like Flutter, Java, and JavaScript to design and develop
          web and mobile applications, contributing to the successful delivery
          of creative and functional solutions.
        </p>
        <div className="skills my-2">
          <h1 className="font-Poppins text-[16px] font-semibold ">Skills</h1>
          <h1 className="skillist font-Poppins text-[14px] font-normal">
            Computer Hardware · Operating Systems · Active Directory · Amazon
            Web Services (AWS) · Teamwork · Full-Stack Development · Flutter ·
            JavaScript
          </h1>
        </div>
      </div>
    </div>
  );
}

export default CreateProfilePage;

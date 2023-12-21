import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { RxDash } from "react-icons/rx";

import { MdOutlineFileUpload } from "react-icons/md";
import {
  FaRegImage,
  FaRegEdit,
  FaFileAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { LuListPlus } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";

import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createProfile,
  getProfile,
} from "../../../features/profiles/profileSlice";

//
//
//
/* HEADER BLOCK START */
function HeaderBlock({ formData, setFormData, profiles }) {
  // Default images if not present in profiles
  const defaultProfileImage =
    "https://media.licdn.com/dms/image/D4E03AQHig7LtBns85Q/profile-displayphoto-shrink_400_400/0/1696993962952?e=1707955200&v=beta&t=WkndwQ9BKC5J23CFbn1GD1R1UZFk5fo4XshCGAxnLvg";
  const defaultBannerImage =
    "https://media.licdn.com/dms/image/D4D16AQEz_eilIlP63w/profile-displaybackgroundimage-shrink_350_1400/0/1701948566295?e=1707955200&v=beta&t=bdsEFzJYqRI_Cb1HnVuTLnd1BbaGmvF8NOsUUPfXpZk";

  const [selectedProfileImage, setSelectedProfileImage] = useState(
    profiles?.profileImage || defaultProfileImage
  );
  const [selectedBannerImage, setSelectedBannerImage] = useState(
    profiles?.bannerImage || defaultBannerImage
  );

  // Initialize formData with existing headerContent from profiles on mount
  useEffect(() => {
    if (profiles && profiles.headerContent) {
      setFormData((prevData) => ({
        ...prevData,
        headerContent: profiles.headerContent,
      }));
    }
  }, [profiles]);

  const handleFileChangeBanner = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        bannerImage: file, // Store the File object directly
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedBannerImage(reader.result);
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
        setSelectedProfileImage(reader.result);
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
    }
  };
  return (
    <>
      {/* HEADER */}
      <div className="header flex flex-col gap-12 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] relative z-0">
        <span className="banner relative ">
          <span className="h-[216px] w-[1584px]">
            <img
              src={selectedBannerImage}
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
            src={selectedProfileImage}
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
                  <h1 className="text-[15px] font-Poppins font-normal text-center ">
                    {formData.education?.uniName}
                  </h1>
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
/* HEADER BLOCK END */
//
//
//
/* ABOUT BLOCK START */
function AboutBlock({ formData, setFormData, profiles }) {
  // Initialize formData with existing headerContent from profiles on mount
  useEffect(() => {
    if (profiles && profiles.aboutSection) {
      setFormData((prevData) => ({
        ...prevData,
        aboutSection: profiles.aboutSection,
      }));
    }
  }, [profiles]);
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
/* ABOUT BLOCK END */
//
//
//
/* EXPERIENCE BLOCK START */
function ExperienceBlock({ formData, setFormData, profiles }) {
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Initialize formData experiences with profiles data on component mount
  useEffect(() => {
    if (profiles && profiles.experiences && profiles.experiences.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        experiences: profiles.experiences,
      }));
    }
  }, [profiles]);

  const openExperienceModal = (index) => {
    setIsExperienceModalOpen(true);
    setEditingIndex(index);

    if (index !== null) {
      // If index is not null, it's an edit, no need to initialize new entry
      document.body.style.overflow = "hidden";
      return;
    }

    // If index is null, it's for adding a new experience
    // Initialize a new entry in form data
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

    document.body.style.overflow = "hidden";
  };

  const closeExperienceModal = () => {
    setIsExperienceModalOpen(false);
    setEditingIndex(null);
    document.body.style.overflow = "";
  };

  const handleAddExperience = () => {
    if (editingIndex !== null) {
      // Editing existing experience
      const updatedExperiences = [...formData.experiences];
      updatedExperiences[editingIndex] = {
        ...updatedExperiences[editingIndex],
      };
      setFormData({ ...formData, experiences: updatedExperiences });
    } else {
      // Adding a new experience
      setFormData((prevData) => ({
        ...prevData,
        experiences: [
          ...prevData.experiences,
          {
            // Initialize all fields for the new experience
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
      // Update the index after setting the state to ensure it gets the correct index
      setEditingIndex(formData.experiences.length);
    }

    closeExperienceModal();
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    setFormData({ ...formData, experiences: updatedExperiences });
  };

  const handleEditExperience = (index) => {
    openExperienceModal(index);
  };

  const handleDeleteExperience = (index) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences.splice(index, 1);
    setFormData({ ...formData, experiences: updatedExperiences });
  };
  return (
    <>
      {/* Experience */}
      <div className="relative experience w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col gap-4">
        <h1 className="text-[20px] font-Poppins font-semibold flex items-center py-1 justify-between">
          Experience
          <button
            type="button"
            onClick={() => openExperienceModal(null)}
            className="w-fit"
          >
            <LuListPlus size={24} />
          </button>
        </h1>

        {formData.experiences.map((experience, index) => (
          <div
            key={index}
            className="experience-entry flex flex-col gap-3 p-2 rounded-md bg-[#fafafa]"
          >
            <span className="experience1 flex w-full gap-4">
              <span className="w-1/2 ">
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
                {experience?.roleLocation && experience?.roleType && (
                  <h1 className="location setting font-Poppins text-[14px] font-normal">
                    {experience.roleLocation} {/* · */} {experience.roleType}
                  </h1>
                )}
              </span>

              {experience?.roleTitle && (
                <span className=" bg-transparent right-5 flex gap-2 items-start">
                  <button
                    type="button"
                    onClick={() => handleEditExperience(index)}
                    className="text-black hover:text-blue-700 ease-in-out duration-150"
                  >
                    <FaRegEdit size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteExperience(index)}
                    className="text-black hover:text-blue-700 ease-in-out duration-150"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </span>
              )}
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
          </div>
        ))}

        {/* Modal for adding new experience */}
        <Modal
          isOpen={isExperienceModalOpen}
          onRequestClose={closeExperienceModal}
          contentLabel="Add Experience Modal"
          ariaHideApp={false}
          className="flex flex-col justify-center items-center min-h-screen"
        >
          <span className="max-w-3xl w-full p-8 flex flex-col gap-4 bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] font-Poppins">
            <h2>
              {editingIndex !== null ? "Edit Experience" : "Add Experience"}
            </h2>

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
                value={
                  editingIndex !== null
                    ? formData.experiences[editingIndex].roleTitle
                    : formData.experiences[formData.experiences.length - 1]
                        ?.roleTitle || ""
                }
                onChange={(e) =>
                  handleExperienceChange(
                    editingIndex !== null
                      ? editingIndex
                      : formData.experiences.length - 1,
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
                value={
                  formData.experiences[
                    editingIndex !== null
                      ? editingIndex
                      : formData.experiences.length - 1
                  ]?.roleCompany || ""
                }
                onChange={(e) =>
                  handleExperienceChange(
                    editingIndex !== null
                      ? editingIndex
                      : formData.experiences.length - 1,
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
                  formData.experiences[
                    editingIndex !== null
                      ? editingIndex
                      : formData.experiences.length - 1
                  ]?.roleDateStart || ""
                }
                onChange={(e) =>
                  handleExperienceChange(
                    editingIndex !== null
                      ? editingIndex
                      : formData.experiences.length - 1,
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
                  formData.experiences[
                    editingIndex !== null
                      ? editingIndex
                      : formData.experiences.length - 1
                  ]?.roleDateEnd || ""
                }
                onChange={(e) =>
                  handleExperienceChange(
                    editingIndex !== null
                      ? editingIndex
                      : formData.experiences.length - 1,
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
                  value={
                    formData.experiences[
                      editingIndex !== null
                        ? editingIndex
                        : formData.experiences.length - 1
                    ]?.roleLocation || ""
                  }
                  onChange={(e) =>
                    handleExperienceChange(
                      editingIndex !== null
                        ? editingIndex
                        : formData.experiences.length - 1,
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
                  value={
                    formData.experiences[
                      editingIndex !== null
                        ? editingIndex
                        : formData.experiences.length - 1
                    ]?.roleType || "" // Changed from employmentType to roleType
                  }
                  onChange={(e) =>
                    handleExperienceChange(
                      editingIndex !== null
                        ? editingIndex
                        : formData.experiences.length - 1,
                      "roleType", // Changed from employmentType to roleType
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
                value={
                  formData.experiences[
                    editingIndex !== null
                      ? editingIndex
                      : formData.experiences.length - 1
                  ]?.roleDuties || ""
                }
                onChange={(e) =>
                  handleExperienceChange(
                    editingIndex !== null
                      ? editingIndex
                      : formData.experiences.length - 1,
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
                value={
                  formData.experiences[
                    editingIndex !== null
                      ? editingIndex
                      : formData.experiences.length - 1
                  ]?.roleSkills || ""
                }
                onChange={(e) =>
                  handleExperienceChange(
                    editingIndex !== null
                      ? editingIndex
                      : formData.experiences.length - 1,
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
/* EXPERIENCE BLOCK END */
//
//
//
/* EDUCATION BLOCK START */
function EducationBlock({ formData, setFormData, profiles }) {
  /* Education Modal */
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Initialize formData experiences with profiles data on component mount
  useEffect(() => {
    if (profiles && profiles.education && profiles.education.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        education: profiles.education,
      }));
    }
  }, [profiles]);

  const openEducationModal = (index) => {
    setIsEducationModalOpen(true);
    setEditingIndex(index);

    if (index !== null) {
      // If index is not null, it's an edit, no need to initialize new entry
      document.body.style.overflow = "hidden";
      return;
    }
    // If index is null, it's for adding a new experience
    // Initialize a new entry in form data
    setFormData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
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
    }));
    document.body.style.overflow = "hidden";
  };

  const closeEducationModal = () => {
    setIsEducationModalOpen(false);
    setEditingIndex(null);
    document.body.style.overflow = "";
  };

  const handleAddEducation = () => {
    if (editingIndex !== null) {
      // Editing existing experience
      const updatedEducation = [...formData.education];
      updatedEducation[editingIndex] = {
        ...updatedEducation[editingIndex],
      };
      setFormData({ ...formData, education: updatedEducation });
    } else {
      // Adding a new experience
      setFormData((prevData) => ({
        ...prevData,
        education: [
          ...prevData.education,
          {
            // Initialize all fields for the new experience
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
      }));
      // Update the index after setting the state to ensure it gets the correct index
      setEditingIndex(formData.experiences.length);
    }

    closeEducationModal();
  };

  const handleEducationChange = (index, field, value) => {
    const updateEducation = [...formData.education];
    updateEducation[index] = {
      ...updateEducation[index],
      [field]: value,
    };
    setFormData({ ...formData, education: updateEducation });
  };

  const handleEditEducation = (index) => {
    openEducationModal(index);
  };

  const handleDeleteEducation = (index) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData({ ...formData, education: updatedEducation });
  };
  return (
    <>
      {/* Education */}
      <div className="education w-full bg-white rounded-xl p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col gap-4">
        <h1 className="text-[20px] font-Poppins font-semibold flex items-center py-1 justify-between">
          Education
          <button
            type="button"
            onClick={() => openEducationModal(null)}
            className="w-fit "
          >
            <LuListPlus size={24} />
          </button>
        </h1>
        {formData.education.map((edu, index) => (
          <div
            key={index}
            className="education-entry flex flex-col gap-3 p-2 rounded-md bg-[#fafafa]"
          >
            <span className="education1 flex w-full gap-4">
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
              {edu?.uniName && (
                <span className=" bg-transparent right-5 flex gap-2 items-start">
                  <button
                    type="button"
                    onClick={() => handleEditEducation(index)}
                    className="text-black hover:text-blue-700 ease-in-out duration-150"
                  >
                    <FaRegEdit size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteEducation(index)}
                    className="text-black hover:text-blue-700 ease-in-out duration-150"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </span>
              )}
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
        ))}
        <Modal
          isOpen={isEducationModalOpen}
          onRequestClose={closeEducationModal}
          contentLabel="Add Education Modal"
          ariaHideApp={false}
          className=" flex flex-col justify-center items-center min-h-screen"
        >
          <span className="max-w-3xl w-full p-8 flex flex-col gap-4 bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] font-Poppins">
            <h2>
              {editingIndex !== null ? "Edit Education" : "Add Education"}
            </h2>
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
                value={
                  editingIndex !== null
                    ? formData.education[editingIndex].uniName
                    : formData.education[formData.education.length - 1]
                        ?.uniName || ""
                }
                onChange={(e) =>
                  handleEducationChange(
                    editingIndex !== null
                      ? editingIndex
                      : formData.education.length - 1,
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
                value={
                  editingIndex !== null
                    ? formData.education[editingIndex].uniDegree
                    : formData.education[formData.education.length - 1]
                        ?.uniDegree || ""
                }
                onChange={(e) =>
                  handleEducationChange(
                    editingIndex !== null
                      ? editingIndex
                      : formData.education.length - 1,
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
                  value={
                    formData.education[
                      editingIndex !== null
                        ? editingIndex
                        : formData.education.length - 1
                    ]?.uniStartDate || ""
                  }
                  onChange={(e) =>
                    handleEducationChange(
                      editingIndex !== null
                        ? editingIndex
                        : formData.education.length - 1,
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
                  value={
                    formData.education[
                      editingIndex !== null
                        ? editingIndex
                        : formData.education.length - 1
                    ]?.uniEndDate || ""
                  }
                  onChange={(e) =>
                    handleEducationChange(
                      editingIndex !== null
                        ? editingIndex
                        : formData.education.length - 1,
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
                value={
                  formData.education[
                    editingIndex !== null
                      ? editingIndex
                      : formData.education.length - 1
                  ]?.uniLocation || ""
                }
                onChange={(e) =>
                  handleEducationChange(
                    editingIndex !== null
                      ? editingIndex
                      : formData.education.length - 1,
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
                value={
                  formData.education[
                    editingIndex !== null
                      ? editingIndex
                      : formData.education.length - 1
                  ]?.uniSection || ""
                }
                onChange={(e) =>
                  handleEducationChange(
                    editingIndex !== null
                      ? editingIndex
                      : formData.education.length - 1,
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
                value={
                  formData.education[
                    editingIndex !== null
                      ? editingIndex
                      : formData.education.length - 1
                  ]?.uniSkills || ""
                }
                onChange={(e) =>
                  handleEducationChange(
                    editingIndex !== null
                      ? editingIndex
                      : formData.education.length - 1,
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
/* EDUCATION BLOCK END */
//
//
//
/* CREATE COMPONENT START */
function CreateProfilePage({ setModeType, profiles }) {
  const dispatch = useDispatch();
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

  const onSubmit = (e) => {
    e.preventDefault();

    // Dispatch the action to send the data to the backend
    dispatch(createProfile(formData));

    // Introduce a delay of, for example, 1 second (1000 milliseconds)
    setTimeout(() => {
      setModeType("view");
      window.location.reload();
    }, 1000);
  };
  return (
    <>
      <form
        className="space-y-4 min-h-screen relative"
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <span className="w-full flex justify-center items-center gap-4 px-3 py-2 ">
          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 ease-in-out duration-200 text-white font-Poppins text-[15px] font-semibold rounded-md"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={(e) => setModeType("view")}
            className="px-3 py-2 bg-red-500 ease-in-out duration-200 opacity-75 hover:opacity-100 text-white font-Poppins text-[15px] font-semibold rounded-md"
          >
            Cancel
          </button>
        </span>
        <HeaderBlock
          formData={formData}
          setFormData={setFormData}
          profiles={profiles}
        />
        <AboutBlock
          formData={formData}
          setFormData={setFormData}
          profiles={profiles}
        />
        <ExperienceBlock
          formData={formData}
          setFormData={setFormData}
          profiles={profiles}
        />
        <EducationBlock
          formData={formData}
          setFormData={setFormData}
          profiles={profiles}
        />
        <span className="w-full flex justify-center items-center gap-4 px-3 py-2 ">
          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 ease-in-out duration-200 text-white font-Poppins text-[15px] font-semibold rounded-md"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={(e) => setModeType("view")}
            className="px-3 py-2 bg-red-500 ease-in-out duration-200 opacity-75 hover:opacity-100 text-white font-Poppins text-[15px] font-semibold rounded-md"
          >
            Cancel
          </button>
        </span>
      </form>
    </>
  );
}
/* CREATE COMPONENT END */
//
//
//
/* VIEW PROFILE COMPONENT START */
function StudentProfilePage({ profiles }) {
  // Create a variable to store the topmost indexed uniName
  const topUniName =
    profiles?.education && profiles.education.length > 0
      ? profiles.education[0].uniName
      : null;
  return (
    <div className="space-y-5 min-h-screen">
      {/* HEADER */}
      <div className="header flex flex-col gap-8 rounded-xl shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] relative z-0">
        <span className="banner relative ">
          <span className="h-[216px] w-[1584px]">
            <img
              src={profiles?.bannerImage}
              alt="banner"
              className="rounded-t-xl object-fill w-full h-full max-h-[216px] max-w-[1584px]"
            />
          </span>
          <img
            src={profiles?.profileImage}
            alt=""
            className="dp absolute w-24 sm:w-36 mask mask-circle -bottom-10 left-10"
          />
        </span>
        <span className="headerContent flex w-full gap-8 p-3  pb-4 relative ">
          {profiles?.headerContent ? (
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
                      {/*
                React Developer | SysAdmin | Networks | Cyber security | IT Support
                 */}
                    </h1>
                    <h1 className="location text-[13px] font-Poppins pt-2">
                      {profiles?.headerContent?.Location}
                      {/* Birmingham, England, United Kingdom */}
                    </h1>
                  </span>
                </>
              ) : (
                <>
                  <span className="headerContentLeft w-2/3 space-y-1">
                    <h1 className="name text-[20px] font-Poppins font-semibold">
                      Name goes here
                    </h1>
                    <h1 className="headline text-[15px] font-Poppins font-normal">
                      Headline goes here
                      {/*
            React Developer | SysAdmin | Networks | Cyber security | IT Support
             */}
                    </h1>
                    <h1 className="location text-[13px] font-Poppins pt-2">
                      Locaiton goes here
                      {/* Birmingham, England, United Kingdom */}
                    </h1>
                  </span>
                </>
              )}
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
        <div className="aboutsec pb-2 px-2 ">
          {profiles?.aboutSection !== null ? (
            <p className="w-full text-[14px] font-Poppins px-3 p-2 bg-[#f5f5f5] rounded-b-xl">
              {profiles.aboutSection}
            </p>
          ) : (
            <p className="w-full p-2 text-[14px] font-Poppins ">
              No Description.
            </p>
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
              className="experience-entry p-3 mx-2 mb-2 bg-[#f5f5f5] 
              rounded-md rounded-tr-3xl rounded-bl-3xl"
            >
              <span className="experience-details flex w-full">
                <span className="w-1/2 mb-[2px] flex flex-col gap-1">
                  <h1 className="role font-Poppins text-[16px] font-normal ">
                    {experience.roleTitle}
                  </h1>
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
                  <h1 className="location setting font-Poppins text-[14px] font-normal">
                    {experience.roleLocation} {experience.roleType}
                  </h1>
                </span>
              </span>
              <p className="job duties font-Poppins text-[14px] font-normal my-2">
                {experience.roleDuties}
              </p>
              <div className="skills my-2">
                <h1 className="font-Poppins text-[15px] font-medium text-gray-500 ">
                  {experience?.roleSkills ? "Skills" : null}
                </h1>
                <h1 className="skillist font-Poppins text-[14px] font-normal w-fit ">
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
              className="experience-entry p-3 mx-2 mb-2 bg-[#f5f5f5] rounded-md rounded-tr-3xl rounded-bl-3xl"
            >
              <span className="education1 flex w-full">
                <span className="w-1/2 flex flex-col gap-1">
                  <h1 className="university font-Poppins text-[14px] font-normal">
                    {educationItem.uniName}
                  </h1>
                  <h1 className="degree font-Poppins text-[16px] font-medium">
                    {educationItem.uniDegree}
                  </h1>
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
                <h1 className="font-Poppins text-[15px] font-medium text-gray-500  ">
                  {educationItem?.uniSkills ? "Skills" : null}
                </h1>
                <h1 className="skillist font-Poppins text-[14px] font-normal w-fit">
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
//
//
//
/* MAIN COMPONENT */
function Profile({ student }) {
  const [modeType, setModeType] = useState("view");
  const { profiles, isLoading } = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      if (student) {
        await dispatch(getProfile());
      } else {
        console.log("Unauthorized");
      }
    };

    fetchData();
  }, [student, dispatch]);
  console.log("Profiles in useEffect:", profiles);

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
      <span
        className={`w-full justify-end ${
          modeType === "edit" ? "hidden" : "flex"
        }`}
      >
        <button
          className={`px-3 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-500 ease-in-out duration-200 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] font-Poppins my-2`}
          onClick={(e) => setModeType("edit")}
        >
          Edit Profile
        </button>
      </span>
      {modeType === "view" && <StudentProfilePage profiles={profiles} />}
      {modeType === "edit" && (
        <CreateProfilePage setModeType={setModeType} profiles={profiles} />
      )}
    </>
  );
}
//export default CreateProfilePage;
export default Profile;
//export default Profile;

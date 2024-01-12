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
    "https://skillmint-job-images.s3.eu-west-2.amazonaws.com/Applicant-Profile-Images/profilePictureBlank.png";
  const defaultBannerImage =
    "https://skillmint-job-images.s3.eu-west-2.amazonaws.com/Applicant-Profile-Images/profilebannerPlaceHolder.png";

  const [selectedProfileImage, setSelectedProfileImage] = useState(
    profiles?.profileImage || defaultProfileImage
  );
  const [selectedBannerImage, setSelectedBannerImage] = useState(
    profiles?.bannerImage || defaultBannerImage
  );

  useEffect(() => {
    if (profiles) {
      setFormData((prevData) => ({
        ...prevData,
        headerContent: profiles.headerContent || prevData.headerContent, // Retains existing headerContent if profiles.headerContent is not available
        ApplicantCV: profiles.ApplicantCV || prevData.ApplicantCV, // Adds ApplicantCV from profiles, or retains the existing value in formData
      }));
    }
  }, [profiles, setFormData]);

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

  function extractFilename(url) {
    if (typeof url === "string") {
      const parts = url.split("/");
      const encodedFilename = parts[parts.length - 1];
      const decodedFilename = decodeURIComponent(encodedFilename);
      const nameParts = decodedFilename.split("-");
      // Remove the first part which is the timestamp and join the rest back together
      return nameParts.slice(1).join("-");
    } else {
      // Handle the case where url is not a string (null or some unexpected type)
      return "Invalid URL";
    }
  }

  return (
    <>
      {/* HEADER */}
      <div className="header flex flex-col gap-12 rounded-xl shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] relative z-0">
        <span className="banner relative ">
          <span className="h-[216px] w-[1584px]">
            <img
              src={selectedBannerImage}
              alt="banner"
              className="rounded-t-xl object-fill w-full h-full max-h-[216px] max-w-[1584px]"
            />
          </span>
          {/* bannerImage upload */}
          <span className="w-40 h-40 opacity-100">
            <label
              htmlFor="bannerImage"
              className="banner   absolute flex flex-col justify-center items-center w-full h-full top-0  cursor-pointer bg-black/50  rounded-t-xl shadow-[rgba(0,_0,_0,_0.1)_0px_1px_3px] hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            >
              <h1 className="font-Poppins text-white font-bold text-lg backdrop-blur-[1px] rounded-md p-1">
                Upload Banner
              </h1>
              <FaRegImage size={33} className="text-white mb-4" />
              <span className="font-Poppins text-white flex flex-col justify-center items-center font-semibold backdrop-blur-[1px] rounded-md p-1">
                <h1 className="text-[15px]">Max 5MB</h1>
                <h1>W: 1584px </h1>
                <h1>H: 396px</h1>
              </span>
            </label>
            <input
              type="file"
              name="bannerImage"
              id="bannerImage"
              className="sr-only"
              onChange={handleFileChangeBanner}
            />
          </span>

          {/* profileImage upload */}
          <span className="w-40 h-40 opacity-100 ">
            <img
              src={selectedProfileImage}
              alt=""
              className="dp absolute -bottom-10 left-10 cursor-pointer w-28 sm:w-36 h-28 sm:h-36  bg-transparent flex justify-center items-center rounded-full "
            />
            {/* opacity-0 hover: */}
            <label
              htmlFor="profileImage"
              className="dp absolute flex-col -bottom-10 left-10 cursor-pointer w-28 sm:w-36 h-28 sm:h-36  bg-black/50 flex justify-center items-center rounded-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_3px] hover:shadow-[rgba(0,0,0,_0.25)_0px_3px_8px]"
            >
              <MdOutlineFileUpload size={45} className="text-white" />
              <h1 className="font-Poppins text-white font-bold text-lg backdrop-blur-[1px] rounded-md p-1">
                Upload
              </h1>
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
                    value={formData?.headerContent.MiddleName}
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
        <span className="headerContent flex sm:flex-row flex-col w-full gap-8 p-3  pb-4 relative ">
          {formData?.headerContent ? (
            <>
              {formData?.headerContent?.FirstName ||
              formData?.headerContent?.MiddleName ||
              formData?.headerContent?.LastName ||
              formData?.headerContent?.Location ? (
                <>
                  <span className="headerContentLeft w-full sm:w-2/3 space-y-1">
                    <h1 className="name text-[20px] font-Poppins font-semibold">
                      {formData?.headerContent?.FirstName}{" "}
                      {formData?.headerContent?.MiddleName}{" "}
                      {formData?.headerContent?.LastName}
                    </h1>
                    <h1 className="headline text-[15px] font-Poppins font-normal">
                      {formData?.headerContent?.Headline}
                    </h1>
                    <h1 className="location text-[13px] font-Poppins pt-2">
                      {formData?.headerContent?.Location}
                    </h1>
                  </span>
                </>
              ) : null}
              {formData?.education?.uniName !== undefined &&
              formData.education.uniName.trim() !== "" ? (
                <span className="headerContentRight w-full sm:w-1/3 flex flex-col justify-evenly items-center">
                  <h1 className="text-[15px] font-Poppins font-normal text-center ">
                    {formData.education.uniName}
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
      {formData.ApplicantCV === null || formData.ApplicantCV === "" ? (
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
        <>
          <span className="flex items-center justify-end gap-2">
            <FaFileAlt size={24} />
            <a
              href={
                formData?.ApplicantCV instanceof File
                  ? URL.createObjectURL(formData?.ApplicantCV)
                  : formData?.ApplicantCV
              }
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-transparent text-black hover:text-black hover:bg-blue-50 rounded-md px-2 py-1 ease-in-out duration-150"
            >
              <p className="font-Poppins font-medium text-[12px] max-w-[180px]">
                {formData?.ApplicantCV instanceof File
                  ? formData.ApplicantCV.name
                  : extractFilename(formData?.ApplicantCV)}
              </p>
            </a>
            <label
              htmlFor="ApplicantCV"
              className="flex sm:flex-row flex-col items-center justify-end px-3 py-1 bg-blue-700 rounded-md text-[15px] font-Poppins gap-0 sm:gap-2 text-white hover:bg-blue-500 hover:text-white ease-in-out duration-150 min-w-max"
            >
              <FaCloudUploadAlt size={20} />
              Replace CV
            </label>
            <input
              type="file"
              name="ApplicantCV"
              id="ApplicantCV"
              className="sr-only"
              onChange={handleFileCvChange}
            />
          </span>
        </>
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
  }, [profiles, setFormData]);
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
      <div className="about w-full bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] flex flex-col">
        <h1 className="text-[20px] font-Poppins font-semibold flex items-center justify-between rounded-t-xl shadow-[rgba(0,_0,_0,_0.045)_0px_1px_5px] p-2 ">
          About{" "}
          <button type="button" onClick={openAboutModal} className="w-fit ">
            <FaRegEdit size={22} />
          </button>
        </h1>
        {/* MAP */}
        {formData?.aboutSection && (
          <span className="experience-entry p-3 text-[14px] font-Poppins">
            {formData.aboutSection}
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
  const [isNewEntry, setIsNewEntry] = useState(false); // Flag to track if the modal is for a new entry
  // Initialize formData experiences with profiles data on component mount

  useEffect(() => {
    if (profiles && profiles.experiences) {
      const nonEmptyExperiences = profiles.experiences.filter(
        (exp) => !isExperienceBlockEmpty(exp)
      );
      if (nonEmptyExperiences.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          experiences: nonEmptyExperiences,
        }));
      }
    }
  }, [profiles, setFormData]);
  // Additional useEffect for handling modal related actions
  useEffect(() => {
    // When a new experience is added, update the editing index
    if (isExperienceModalOpen && formData.experiences.length > 0) {
      setEditingIndex(formData.experiences.length - 1);
    }
    // This effect should depend on formData.experiences.length, not editingIndex
  }, [isExperienceModalOpen, formData.experiences.length]);
  const openExperienceModal = (index) => {
    setIsExperienceModalOpen(true);
    if (index === null) {
      // Flag that this is a new entry
      setIsNewEntry(true);
      // Adding a new experience
      setFormData((prevData) => {
        const newExperiences = [
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
        ];
        return { ...prevData, experiences: newExperiences };
      });
    } else {
      // This is an edit, not a new entry
      setIsNewEntry(false);
      // Ensure this action is not triggering the effect unnecessarily
      if (editingIndex !== index) {
        setEditingIndex(index);
      }
    }
    document.body.style.overflow = "hidden";
  };
  const closeExperienceModal = () => {
    // Only remove the last entry if it was a new entry
    if (isNewEntry && editingIndex === formData.experiences.length - 1) {
      setFormData((prevData) => ({
        ...prevData,
        experiences: prevData.experiences.slice(0, -1),
      }));
    }

    // Resets
    setIsNewEntry(false);
    setIsExperienceModalOpen(false);
    setEditingIndex(null);
    document.body.style.overflow = "";
  };
  const isExperienceBlockEmpty = (block) => {
    return (
      !block || Object.values(block).every((value) => !value || value === "")
    );
  };

  const handleAddExperience = () => {
    console.log("Before update:", formData.experiences);

    if (editingIndex !== null) {
      const editedExperience = formData.experiences[editingIndex];
      if (!isExperienceBlockEmpty(editedExperience)) {
        const updatedExperiences = [...formData.experiences];
        updatedExperiences[editingIndex] = editedExperience;
        setFormData({ ...formData, experiences: updatedExperiences });
      } else {
        // If it's empty, remove it from the array
        const updatedExperiences = [...formData.experiences];
        updatedExperiences.splice(editingIndex, 1);
        setFormData({ ...formData, experiences: updatedExperiences });
      }
    }

    console.log("After update:", formData.experiences);

    closeExperienceModal();
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...formData.experiences];
    const updatedExperience = { ...updatedExperiences[index], [field]: value };
    updatedExperiences[index] = updatedExperience;
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
      <div className="relative experience w-full bg-white rounded-xl  shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] flex flex-col gap-2">
        <h1 className="text-[20px] font-Poppins font-semibold flex items-center p-2 justify-between rounded-t-xl shadow-[rgba(0,_0,_0,_0.045)_0px_1px_5px]">
          Experience
          <button
            type="button"
            onClick={() => openExperienceModal(null)}
            className="w-fit"
          >
            <LuListPlus size={24} />
          </button>
        </h1>

        {formData?.experiences
          .filter((experience) => !isExperienceBlockEmpty(experience))
          .map((experience, index) => (
            <div
              key={index}
              className="experience-entry flex flex-col gap-3 mx-3 p-2 mb-2 rounded-md "
            >
              <span className="experience1 flex w-full gap-4">
                <span className="w-1/2 ">
                  {experience?.roleTitle && (
                    <span className="role font-Poppins text-[16px] font-medium flex items-end gap-2">
                      <p>{experience.roleTitle}</p>{" "}
                      <p className="text-[12px] font-normal">
                        {experience.roleType}
                      </p>
                    </span>
                  )}
                  {experience?.roleCompany && (
                    <h1 className="company font-Poppins text-[14px] font-medium">
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
                    <span className="location setting font-Poppins text-[14px] font-normal w-full">
                      <p className="">{experience.roleLocation}</p>
                    </span>
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
                  <h1 className="font-Poppins text-[16px] font-medium border-b ">
                    Skills
                  </h1>
                  <h1 className="skillist font-Poppins text-[14px] font-normal pt-2">
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
              {isNewEntry === true ? "Add Experience" : "Edit Experience"}
            </h2>

            {/* roleTitle */}
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
                value={formData.experiences[editingIndex]?.roleTitle || ""}
                onChange={(e) =>
                  handleExperienceChange(
                    editingIndex,
                    "roleTitle",
                    e.target.value
                  )
                }
              />
            </div>
            {/* roleCompany */}
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
                value={formData.experiences[editingIndex]?.roleCompany || ""}
                onChange={(e) =>
                  handleExperienceChange(
                    editingIndex,
                    "roleCompany",
                    e.target.value
                  )
                }
              />
            </div>

            {/* roleDateStart */}
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
                value={formData.experiences[editingIndex]?.roleDateStart || ""}
                onChange={(e) =>
                  handleExperienceChange(
                    editingIndex,
                    "roleDateStart",
                    e.target.value
                  )
                }
              />
            </div>

            {/* roleDateEnd */}
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
                value={formData.experiences[editingIndex]?.roleDateEnd || ""}
                onChange={(e) =>
                  handleExperienceChange(
                    editingIndex,
                    "roleDateEnd",
                    e.target.value
                  )
                }
              />
            </div>
            {/* roleLocation */}
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
                  value={formData.experiences[editingIndex]?.roleLocation || ""}
                  onChange={(e) =>
                    handleExperienceChange(
                      editingIndex,
                      "roleLocation",
                      e.target.value
                    )
                  }
                />
              </span>
              {/* RoleType */}
              <span className="w-1/3">
                <label
                  htmlFor="roleType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employment Type
                </label>
                <select
                  id="roleType"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.experiences[editingIndex]?.roleType || ""}
                  onChange={(e) =>
                    handleExperienceChange(
                      editingIndex,
                      "roleType",
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

            {/* roleDuties */}
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
                value={formData.experiences[editingIndex]?.roleDuties || ""}
                onChange={(e) =>
                  handleExperienceChange(
                    editingIndex,
                    "roleDuties",
                    e.target.value
                  )
                }
              />
            </div>

            {/* roleSkills */}
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
                value={formData.experiences[editingIndex]?.roleSkills || ""}
                onChange={(e) =>
                  handleExperienceChange(
                    editingIndex,
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
  const [isNewEntry, setIsNewEntry] = useState(false); // Flag to track if the modal is for a new entry

  // Initialize formData experiences with profiles data on component mount
  useEffect(() => {
    if (profiles && profiles.education) {
      const nonEmptyEducation = profiles.education.filter(
        (edu) => !isEducationBlockEmpty(edu)
      );
      if (nonEmptyEducation.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          education: nonEmptyEducation,
        }));
      }
    }
  }, [profiles, setFormData]);
  // Additional useEffect for handling modal related actions
  useEffect(() => {
    // When a new education is added, update the editing index
    if (isEducationModalOpen && formData.education.length > 0) {
      setEditingIndex(formData.education.length - 1);
    }
    // This effect should depend on formData.education.length, not editingIndex
  }, [isEducationModalOpen, formData.education.length]);

  const openEducationModal = (index) => {
    setIsEducationModalOpen(true);
    if (index === null) {
      // Flag that this is a new entry
      setIsNewEntry(true);
      // Adding a new education entry
      setFormData((prevData) => {
        const newEducation = [
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
        ];
        return { ...prevData, education: newEducation };
      });
    } else {
      // Ensure this action is not triggering the effect unnecessarily
      // This is an edit, not a new entry
      setIsNewEntry(false);
      if (editingIndex !== index) {
        setEditingIndex(index);
      }
    }
    document.body.style.overflow = "hidden";
  };
  const closeEducationModal = () => {
    // Only remove the last entry if it was a new entry
    if (isNewEntry && editingIndex === formData.education.length - 1) {
      setFormData((prevData) => ({
        ...prevData,
        education: prevData.education.slice(0, -1),
      }));
    }
    // Reset the flag regardless
    setIsNewEntry(false);
    setIsEducationModalOpen(false);
    setEditingIndex(null);
    document.body.style.overflow = "";
  };

  /*   const closeEducationModal = () => {
    if (
      editingIndex === null &&
      isEducationBlockEmpty(formData.education[formData.education.length - 1])
    ) {
      // Remove the last, blank education entry
      setFormData((prevData) => ({
        ...prevData,
        education: prevData.education.slice(0, -1),
      }));
    }
    setIsEducationModalOpen(false);
    setEditingIndex(null);
    document.body.style.overflow = "";
  }; */

  const isEducationBlockEmpty = (block) => {
    return (
      !block || Object.values(block).every((value) => !value || value === "")
    );
  };

  const handleAddEducation = () => {
    if (editingIndex !== null) {
      const editedEducation = formData.education[editingIndex];
      if (!isEducationBlockEmpty(editedEducation)) {
        const updatedEducation = [...formData.education];
        updatedEducation[editingIndex] = editedEducation;
        setFormData({ ...formData, education: updatedEducation });
      } else {
        const updatedEducation = [...formData.education];
        updatedEducation.splice(editingIndex, 1);
        setFormData({ ...formData, education: updatedEducation });
      }
    }
    closeEducationModal();
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    const updatedEdu = { ...updatedEducation[index], [field]: value };
    updatedEducation[index] = updatedEdu;
    setFormData({ ...formData, education: updatedEducation });
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
      <div className="education w-full bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] flex flex-col">
        <h1 className="text-[20px] font-Poppins font-semibold flex items-center justify-between w-full p-2 shadow-[rgba(0,_0,_0,_0.045)_0px_1px_5px] rounded-t-xl">
          Education
          {/* ADD NEW EDUCATION */}
          <button
            type="button"
            onClick={() => openEducationModal(null)}
            className="w-fit "
          >
            <LuListPlus size={24} />
          </button>
        </h1>

        {formData?.education
          .filter((edu) => !isEducationBlockEmpty(edu))
          .map((edu, index) => (
            <div
              key={index}
              className="education-entry flex flex-col gap-3 m-3 p-2 pb-0 rounded-md "
            >
              <span className="education1 flex w-full gap-4">
                <span className="w-1/2">
                  {edu?.uniDegree && (
                    <h1 className="degree font-Poppins text-[16px] font-semibold">
                      {edu.uniDegree}
                    </h1>
                  )}
                  {edu?.uniName && (
                    <span className="role font-Poppins flex items-end gap-2">
                      <p className="text-[14px] font-medium">{edu.uniName}</p>
                      <p className="text-[12px]">{edu?.uniGrade}</p>
                    </span>
                  )}
                </span>
                <span className="w-1/2 text-end flex flex-col justify-between">
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
                  <h1 className="font-Poppins text-[16px] font-medium border-b ">
                    Skills
                  </h1>
                  <h1 className="skillist font-Poppins text-[14px] font-normal pt-2">
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
            <h2>{isNewEntry === true ? "Add Education" : "Edit Education"}</h2>
            <div className="mb-4">
              {/* uniName  */}
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
                value={formData.education[editingIndex]?.uniName || ""}
                onChange={(e) =>
                  handleEducationChange(editingIndex, "uniName", e.target.value)
                }
              />
            </div>
            {/* uniDegree */}
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
                value={formData.education[editingIndex]?.uniDegree || ""}
                onChange={(e) =>
                  handleEducationChange(
                    editingIndex,
                    "uniDegree",
                    e.target.value
                  )
                }
              />
            </div>
            {/* uniGrade */}
            <span className="flex">
              <div className="">
                <label
                  htmlFor="uniGrade"
                  className="block text-sm font-medium text-gray-700"
                >
                  Grade
                </label>
                <input
                  type="text"
                  id="uniGrade"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.education[editingIndex]?.uniGrade || ""}
                  onChange={(e) =>
                    handleEducationChange(
                      editingIndex,
                      "uniGrade",
                      e.target.value
                    )
                  }
                />
              </div>
              {/* DATES */}
              <span className="flex w-full justify-end gap-4">
                {/* uniStartDate */}
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
                    value={formData.education[editingIndex]?.uniStartDate || ""}
                    onChange={(e) =>
                      handleEducationChange(
                        editingIndex,
                        "uniStartDate",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* uniEndDate */}
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
                    value={formData.education[editingIndex]?.uniEndDate || ""}
                    onChange={(e) =>
                      handleEducationChange(
                        editingIndex,
                        "uniEndDate",
                        e.target.value
                      )
                    }
                  />
                </div>
              </span>
            </span>
            {/* uniLocation */}
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
                value={formData.education[editingIndex]?.uniLocation || ""}
                onChange={(e) =>
                  handleEducationChange(
                    editingIndex,
                    "uniLocation",
                    e.target.value
                  )
                }
              />
            </div>

            {/* uniSection */}
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
                value={formData.education[editingIndex]?.uniSection || ""}
                onChange={(e) =>
                  handleEducationChange(
                    editingIndex,
                    "uniSection",
                    e.target.value
                  )
                }
              />
            </div>

            {/* uniSkills */}
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
                value={formData.education[editingIndex]?.uniSkills || ""}
                onChange={(e) =>
                  handleEducationChange(
                    editingIndex,
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
    experiences: [],
    education: [],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    // Dispatch the action to send the data to the backend
    console.log("9 onSubmit Data: ", formData.experiences);
    dispatch(createProfile(formData));
    setModeType("view");
  };
  return (
    <>
      <form
        className=" relative"
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <span className="w-full flex justify-end items-center gap-4 my-2">
          <button
            type="submit"
            className="px-3 py-2 bg-blue-700 text-white hover:bg-blue-500 hover:text-white shadow-[rgba(0,_0,_0,_0.25)_0px_3px_4px] ease-in-out duration-200  font-Poppins   font-semibold rounded-md"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={(e) => setModeType("view")}
            className="px-3 py-2 bg-gray-800 text-white hover:text-white hover:bg-black shadow-[rgba(0,_0,_0,_0.25)_0px_3px_4px]  ease-in-out duration-200 font-Poppins  font-semibold rounded-md"
          >
            Cancel
          </button>
        </span>
      </form>
      <span className="space-y-4">
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
      </span>
    </>
  );
}
/* CREATE COMPONENT END */
//
//
//
/* VIEW PROFILE COMPONENT START */
function StudentProfilePage({ profiles }) {
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
    <div className="space-y-5 min-h-screen max-w-7xl">
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
            className="dp absolute -bottom-10 left-10 cursor-pointer w-28 sm:w-36 h-28 sm:h-36  bg-transparent flex justify-center items-center rounded-full"
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
              ) : null}
              {profiles?.ApplicantCV || profiles?.education ? (
                <span className="headerContentRight w-1/3 flex flex-col justify-evenly items-center ">
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
      <div className="experience w-full bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] flex flex-col gap-2">
        <h1 className="text-[20px] font-Poppins font-semibold p-2 shadow-[rgba(0,_0,_0,_0.045)_0px_1px_5px] rounded-t-xl">
          Experience
        </h1>
        {profiles?.experiences?.length > 0 ? (
          profiles.experiences.map((experience, index) => {
            // Check if required fields have values
            if (
              experience.roleTitle ||
              experience.roleType ||
              experience.roleCompany ||
              experience.roleDateStart ||
              experience.roleDateEnd ||
              experience.roleLocation ||
              experience.roleDuties ||
              experience.roleSkills
            ) {
              return (
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
              );
            } else {
              return (
                <p
                  key={index}
                  className="font-Poppins text-[14px] font-normal p-3"
                >
                  No experience listed.
                </p>
              ); // Skip rendering empty experience entries
            }
          })
        ) : (
          <p className="font-Poppins text-[14px] font-normal p-3">
            No experience listed.
          </p>
        )}
      </div>
      {/* Education */}
      <div className="education w-full bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] flex flex-col gap-2">
        <h1 className="text-[20px] font-Poppins font-semibold p-2 shadow-[rgba(0,_0,_0,_0.045)_0px_1px_5px] rounded-t-xl">
          Education
        </h1>
        {profiles?.education?.length > 0 ? (
          profiles.education.map((educationItem, index) => {
            // Check if required fields have values
            if (
              educationItem.uniDegree ||
              educationItem.uniName ||
              educationItem.uniGrade ||
              educationItem.uniStartDate ||
              educationItem.uniEndDate ||
              educationItem.uniLocation ||
              educationItem.uniSection ||
              educationItem.uniSkills
            ) {
              return (
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
                        {educationItem.uniStartDate &&
                        educationItem.uniEndDate ? (
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
              );
            } else {
              return null; // Skip rendering empty education entries
            }
          })
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
          className={`px-3 py-2 bg-black text-white  font-semibold  ease-in-out duration-200 rounded-md hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] font-Poppins my-2`}
          onClick={(e) => setModeType("edit")}
        >
          Personalize Profile
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

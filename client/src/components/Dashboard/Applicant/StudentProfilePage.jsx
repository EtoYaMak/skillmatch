import React, { useEffect, useRef, useState } from "react";
import { format, parseISO } from "date-fns";
import { RxDash } from "react-icons/rx";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoIosCheckmark } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";

import {
  FaRegImage,
  FaRegEdit,
  FaFileAlt,
  FaCloudUploadAlt,
  FaAsterisk,
  FaCheck,
  FaCheckDouble,
} from "react-icons/fa";
import { LuListPlus } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegHandPointRight } from "react-icons/fa6";

import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createProfile,
  getProfile,
} from "../../../features/profiles/profileSlice";

//////////////////////////////////////////////////////////////////////
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
      <div className=" header flex flex-col gap-12 rounded-xl shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] relative z-0">
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
            className="w-fit absolute right-2 -top-6 "
          >
            <FaRegEdit
              className="text-black hover:text-red-600 ease-in-out duration-150"
              size={22}
            />
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
//////////////////////////////////////////////////////////////////////
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
            <FaRegEdit
              size={22}
              className="text-black hover:text-red-600 ease-in-out duration-150"
            />
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
//////////////////////////////////////////////////////////////////////
/* EXPERIENCE BLOCK START */
function ExperienceBlock({ formData, setFormData, profiles }) {
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(true);
  const [deleteIndex, setDeleteIndex] = useState(null);
  // Create a ref
  const modalRef = useRef(null);
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
  }, [profiles]);

  //VALIDATION
  const isFormValid = () => {
    // Check if formData.experiences is defined and has at least one entry
    if (!formData.experiences || formData.experiences.length === 0) {
      return false;
    }

    const experience =
      editingIndex !== null
        ? formData.experiences[editingIndex]
        : formData.experiences[formData.experiences.length - 1];

    // Check if experience is defined
    if (!experience) {
      return false;
    }

    return (
      experience.roleTitle &&
      experience.roleTitle.trim() !== "" &&
      experience.roleCompany &&
      experience.roleCompany.trim() !== "" &&
      experience.roleDateStart &&
      experience.roleDateStart.trim() !== "" &&
      experience.roleDateEnd &&
      experience.roleDateEnd.trim() !== "" &&
      experience.roleLocation &&
      experience.roleLocation.trim() !== "" &&
      experience.roleType &&
      experience.roleType.trim() !== "" &&
      experience.roleDuties &&
      experience.roleDuties.trim() !== "" &&
      experience.roleSkills &&
      experience.roleSkills.trim() !== ""
    );
  };
  const isFieldValid = (fieldName) => {
    if (!formData.experiences || formData.experiences.length === 0) {
      return false;
    }

    const experience =
      editingIndex !== null
        ? formData.experiences[editingIndex]
        : formData.experiences[formData.experiences.length - 1];

    const fieldValue = experience[fieldName];
    return fieldValue && fieldValue.trim() !== "";
  };
  //
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

  //
  const closeExperienceModal = () => {
    setIsExperienceModalOpen(false);

    // Check if a new experience was being added (editingIndex is null)
    if (editingIndex === null) {
      // Get the last experience entry
      const lastExperience =
        formData.experiences[formData.experiences.length - 1];

      // Check if the last experience entry is empty
      if (isExperienceBlockEmpty(lastExperience)) {
        // Remove the last experience entry if it's empty
        const updatedExperiences = formData.experiences.slice(0, -1);
        setFormData({ ...formData, experiences: updatedExperiences });
      }
    }

    setEditingIndex(null);
    document.body.style.overflow = "";
  };

  //
  const isExperienceBlockEmpty = (block) => {
    return (
      !block || Object.values(block).every((value) => !value || value === "")
    );
  };

  //
  const handleAddExperience = () => {
    if (!isFormValid()) return; // Prevent saving if validation fails

    if (editingIndex !== null) {
      // Check if the edited entry is empty
      if (!isExperienceBlockEmpty(formData.experiences[editingIndex])) {
        const updatedExperiences = [...formData.experiences];
        updatedExperiences[editingIndex] = {
          ...updatedExperiences[editingIndex],
        };
        setFormData({ ...formData, experiences: updatedExperiences });
      } else {
        // If it's empty, remove it from the array
        const updatedExperiences = [...formData.experiences];
        updatedExperiences.splice(editingIndex, 1);
        setFormData({ ...formData, experiences: updatedExperiences });
      }
    } else {
      // Adding a new experience
      const newExperienceBlock = {
        roleTitle: "",
        roleCompany: "",
        roleDateStart: "",
        roleDateEnd: "",
        roleLocation: "",
        roleType: "",
        roleDuties: "",
        roleSkills: "",
      };

      // Only add the new block if it's not empty
      if (!isExperienceBlockEmpty(newExperienceBlock)) {
        setFormData((prevData) => ({
          ...prevData,
          experiences: [...prevData.experiences, newExperienceBlock],
        }));
      }
    }

    closeExperienceModal();
  };

  //
  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    setFormData({ ...formData, experiences: updatedExperiences });
  };

  //
  const handleEditExperience = (index) => {
    openExperienceModal(index);
  };
  // Function to show modal
  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  // Function to close modal
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const showDeleteModal = (index) => {
    setDeleteIndex(index);
    showModal();
  };

  const handleDeleteExperience = () => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences.splice(deleteIndex, 1);
    setFormData({ ...formData, experiences: updatedExperiences });
    closeModal();
  };

  const cancelDelete = () => {
    closeModal();
    setDeleteIndex(null);
  };
  return (
    <>
      {isDeleteModalOpen && (
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white">
            <span className="flex justify-center items-center">
              <RiErrorWarningLine size={36} />
            </span>
            <p className="py-4 text-[15px] font-Poppins text-center">
              Are you sure you want to <strong>delete</strong> this Experience?
            </p>
            <div className="modal-action justify-center">
              <button
                className="p-2 px-3 w-[4rem] bg-red-600 text-white font-Poppins font-semibold rounded-md"
                onClick={() => handleDeleteExperience()}
              >
                Yes
              </button>
              <button
                className="p-2 px-3 w-[4rem] bg-gray-600 text-white font-Poppins font-semibold rounded-md"
                onClick={() => cancelDelete()}
              >
                No
              </button>
            </div>
          </div>
        </dialog>
      )}
      {/* Experience */}
      <div className="relative experience w-full bg-white rounded-xl  shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] flex flex-col gap-2">
        <h1 className="text-[20px] font-Poppins font-semibold flex items-center p-2 justify-between rounded-t-xl shadow-[rgba(0,_0,_0,_0.045)_0px_1px_5px]">
          Experience
          <button
            type="button"
            onClick={() => openExperienceModal(null)}
            className="w-fit text-black hover:text-red-600 ease-in-out duration-150"
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
              <span className="experience1 flex w-full flex-col sm:flex-row ">
                <span className="w-full sm:w-1/2 ">
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
                <span className="w-full sm:w-1/2 tex-start sm:text-end">
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
                {/* BUTTONS */}
                {experience && (
                  <span className="sm:px-2 bg-transparent right-5 flex gap-2 justify-end items-center">
                    <button
                      type="button"
                      onClick={() => handleEditExperience(index)}
                      className="text-white rounded-md px-2 py-1 bg-black hover:text-blue-700 ease-in-out duration-150"
                    >
                      <FaRegEdit size={20} />
                    </button>
                    <button
                      className="text-white rounded-md px-2 py-1 bg-red-600 hover:text-blue-700 ease-in-out duration-150"
                      onClick={() => showDeleteModal(index)}
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
            <h2 className="font-semibold font-Poppins text-lg w-full text-center">
              {editingIndex !== null ? "Update Experience" : "Add Experience"}
            </h2>

            {/* roleTitle */}
            <div className="mb-4">
              <label
                htmlFor="roleTitle"
                className="text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
              >
                Role Title
                {isFieldValid("roleTitle") ? (
                  <FaCheck
                    className="text-green-600 absolute top-0 -right-3"
                    size={8}
                  />
                ) : (
                  <FaAsterisk
                    className="text-red-700 absolute top-0 -right-3"
                    size={6}
                  />
                )}
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
            {/* roleCompany */}
            <div className="mb-4">
              <label
                htmlFor="roleCompany"
                className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
              >
                Company
                {isFieldValid("roleCompany") ? (
                  <FaCheck
                    className="text-green-600 absolute top-0 -right-3"
                    size={8}
                  />
                ) : (
                  <FaAsterisk
                    className="text-red-700 absolute top-0 -right-3"
                    size={6}
                  />
                )}
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

            {/* roleDateStart */}
            <div className="mb-4">
              <label
                htmlFor="roleDateStart"
                className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
              >
                Start Date
                {isFieldValid("roleDateStart") ? (
                  <FaCheck
                    className="text-green-600 absolute top-0 -right-3"
                    size={8}
                  />
                ) : (
                  <FaAsterisk
                    className="text-red-700 absolute top-0 -right-3"
                    size={6}
                  />
                )}
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

            {/* roleDateEnd */}
            <div className="mb-4">
              <label
                htmlFor="roleDateEnd"
                className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
              >
                End Date
                {isFieldValid("roleDateEnd") ? (
                  <FaCheck
                    className="text-green-600 absolute top-0 -right-3"
                    size={8}
                  />
                ) : (
                  <FaAsterisk
                    className="text-red-700 absolute top-0 -right-3"
                    size={6}
                  />
                )}
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
            {/* roleLocation */}
            <div className="mb-4 flex w-full gap-8">
              <span className="w-2/3">
                <label
                  htmlFor="roleLocation"
                  className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
                >
                  Location
                  {isFieldValid("roleLocation") ? (
                    <FaCheck
                      className="text-green-600 absolute top-0 -right-3"
                      size={8}
                    />
                  ) : (
                    <FaAsterisk
                      className="text-red-700 absolute top-0 -right-3"
                      size={6}
                    />
                  )}
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
              {/* roleType */}
              <span className="w-1/3">
                <label
                  htmlFor="roleType"
                  className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
                >
                  Employment Type
                  {isFieldValid("roleType") ? (
                    <FaCheck
                      className="text-green-600 absolute top-0 -right-3"
                      size={8}
                    />
                  ) : (
                    <FaAsterisk
                      className="text-red-700 absolute top-0 -right-3"
                      size={6}
                    />
                  )}
                </label>
                <select
                  id="roleType"
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
                  <option value="Full-Time">Full Time</option>
                  <option value="Part-Time">Part Time</option>
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
                className="text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
              >
                Job Duties
                {isFieldValid("roleDuties") ? (
                  <FaCheck
                    className="text-green-600 absolute top-0 -right-3"
                    size={8}
                  />
                ) : (
                  <FaAsterisk
                    className="text-red-700 absolute top-0 -right-3"
                    size={6}
                  />
                )}
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

            {/* roleSkills */}
            <div className="mb-4">
              <label
                htmlFor="roleSkills"
                className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
              >
                Skills
                {isFieldValid("roleSkills") ? (
                  <FaCheck
                    className="text-green-600 absolute top-0 -right-3"
                    size={8}
                  />
                ) : (
                  <FaAsterisk
                    className="text-red-700 absolute top-0 -right-3"
                    size={6}
                  />
                )}
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
            <span className="flex justify-between font-Poppins font-medium">
              <button
                type="button"
                disabled={!isFormValid()}
                onClick={handleAddExperience}
                className="disabled:text-gray-400 disabled:bg-black/5 p-2 rounded-md bg-black text-white"
              >
                {editingIndex !== null ? (
                  <p className="font-medium">Update Experience</p>
                ) : (
                  <p className="font-medium">Save Experience</p>
                )}
              </button>
              <button
                type="button"
                onClick={closeExperienceModal}
                className="bg-red-500 text-white p-2 rounded-md"
              >
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
//////////////////////////////////////////////////////////////////////
/* EDUCATION BLOCK START */
function EducationBlock({ formData, setFormData, profiles }) {
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(true);
  const [deleteIndex, setDeleteIndex] = useState(null);
  // Create a ref
  const modalRef = useRef(null);

  // Initialize formData education with profiles data on component mount
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

  //VALIDATION
  const isFormValid = () => {
    // Check if formData.education is defined and has at least one entry
    if (!formData.education || formData.education.length === 0) {
      return false;
    }

    const education =
      editingIndex !== null
        ? formData.education[editingIndex]
        : formData.education[formData.education.length - 1];

    // Check if experience is defined
    if (!education) {
      return false;
    }

    return (
      education.uniName &&
      education.uniName.trim() !== "" &&
      education.uniDegree &&
      education.uniDegree.trim() !== "" &&
      education.uniGrade &&
      education.uniGrade.trim() !== "" &&
      education.uniStartDate &&
      education.uniStartDate.trim() !== "" &&
      education.uniEndDate &&
      education.uniEndDate.trim() !== "" &&
      education.uniLocation &&
      education.uniLocation.trim() !== "" &&
      education.uniSection &&
      education.uniSection.trim() !== "" &&
      education.uniSkills &&
      education.uniSkills.trim() !== ""
    );
  };
  const isFieldValid = (fieldName) => {
    if (!formData.education || formData.education.length === 0) {
      return false;
    }

    const education =
      editingIndex !== null
        ? formData.education[editingIndex]
        : formData.education[formData.education.length - 1];

    const fieldValue = education[fieldName];
    return fieldValue && fieldValue.trim() !== "";
  };

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

    // Check if a new education was being added (editingIndex is null)
    if (editingIndex === null) {
      // Get the last education entry
      const lastEducation = formData.education[formData.education.length - 1];

      // Check if the last education entry is empty
      if (isEducationBlockEmpty(lastEducation)) {
        // Remove the last education entry if it's empty
        const updatedEducation = formData.education.slice(0, -1);
        setFormData({ ...formData, education: updatedEducation });
      }
    }
    setEditingIndex(null);
    document.body.style.overflow = "";
  };

  const isEducationBlockEmpty = (block) => {
    return (
      !block || Object.values(block).every((value) => !value || value === "")
    );
  };

  const handleAddEducation = () => {
    if (!isFormValid()) return; // Prevent saving if validation fails

    // If we are editing an existing entry
    if (editingIndex !== null) {
      // Check if the edited entry is empty
      if (!isEducationBlockEmpty(formData.education[editingIndex])) {
        const updatedEducation = [...formData.education];
        updatedEducation[editingIndex] = {
          ...updatedEducation[editingIndex],
        };
        setFormData({ ...formData, education: updatedEducation });
      } else {
        // If it's empty, remove it from the array
        const updatedEducation = [...formData.education];
        updatedEducation.splice(editingIndex, 1);
        setFormData({ ...formData, education: updatedEducation });
      }
    } else {
      // If we're adding a new entry
      const newEducationBlock = {
        uniName: "",
        uniDegree: "",
        uniGrade: "",
        uniStartDate: "",
        uniEndDate: "",
        uniLocation: "",
        uniSection: "",
        uniSkills: "",
      };

      // Only add the new block if it's not empty
      if (!isEducationBlockEmpty(newEducationBlock)) {
        setFormData((prevData) => ({
          ...prevData,
          education: [...prevData.education, newEducationBlock],
        }));
      }
    }
    closeEducationModal();
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleEditEducation = (index) => {
    openEducationModal(index);
  };
  // Function to show modal
  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  // Function to close modal
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const showDeleteModal = (index) => {
    setDeleteIndex(index);
    showModal();
  };
  const handleDeleteEducation = (index) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(deleteIndex, 1);
    setFormData({ ...formData, education: updatedEducation });
    closeModal();
  };
  const cancelDelete = () => {
    closeModal();
    setDeleteIndex(null);
  };

  return (
    <>
      {isDeleteModalOpen && (
        <dialog ref={modalRef} className="modal modal-top sm:modal-middle">
          <div className="modal-box bg-white">
            <span className="flex justify-center items-center">
              <RiErrorWarningLine size={36} />
            </span>
            <p className="py-4 text-[15px] font-Poppins text-center">
              Are you sure you want to <strong>delete</strong> this Education?
            </p>
            <div className="modal-action justify-center">
              <button
                className="p-2 px-3 w-[4rem] bg-red-600 text-white font-Poppins font-semibold rounded-md"
                onClick={() => handleDeleteEducation()}
              >
                Yes
              </button>
              <button
                className="p-2 px-3 w-[4rem] bg-gray-600 text-white font-Poppins font-semibold rounded-md"
                onClick={() => cancelDelete()}
              >
                No
              </button>
            </div>
          </div>
        </dialog>
      )}
      {/* Education */}
      <div className="education w-full bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] flex flex-col">
        <h1 className="text-[20px] font-Poppins font-semibold flex items-center justify-between w-full p-2 shadow-[rgba(0,_0,_0,_0.045)_0px_1px_5px] rounded-t-xl">
          Education
          {/* ADD NEW EDUCATION */}
          <button
            type="button"
            onClick={() => openEducationModal(null)}
            className="w-fit  text-black hover:text-red-600 ease-in-out duration-150  "
          >
            <LuListPlus size={24} />
          </button>
        </h1>

        {formData?.education
          .filter((edu) => !isEducationBlockEmpty(edu))
          .map((edu, index) => (
            <div
              key={index}
              className="education-entry flex flex-col gap-3 m-3 p-2 pb-0 rounded-md relative"
            >
              <span className="education1 flex flex-col sm:flex-row w-full">
                <span className="w-full sm:w-1/2">
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
                <span className="w-full sm:w-1/2 sm:text-end flex flex-col justify-between">
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
                {edu && (
                  <span className="sm:px-2 bg-transparent right-5 flex gap-2 justify-end items-start">
                    <button
                      type="button"
                      onClick={() => handleEditEducation(index)}
                      className="text-white rounded-md px-2 py-1 bg-black hover:text-blue-700 ease-in-out duration-150"
                    >
                      <FaRegEdit size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => showDeleteModal(index)}
                      className="text-white rounded-md px-2 py-1 bg-red-600 hover:text-blue-700 ease-in-out duration-150"
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
            <h2 className="font-semibold font-Poppins text-lg w-full text-center">
              {editingIndex !== null ? "Update Education" : "Add Education"}
            </h2>
            {/* uniName  */}
            <div className="mb-4">
              <label
                htmlFor="uniName"
                className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
              >
                University
                {isFieldValid("uniName") ? (
                  <FaCheck
                    className="text-green-600 absolute top-0 -right-3"
                    size={8}
                  />
                ) : (
                  <FaAsterisk
                    className="text-red-700 absolute top-0 -right-3"
                    size={6}
                  />
                )}
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
            {/* uniDegree */}
            <div className="mb-4">
              <label
                htmlFor="uniDegree"
                className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
              >
                Degree
                {isFieldValid("uniDegree") ? (
                  <FaCheck
                    className="text-green-600 absolute top-0 -right-3"
                    size={8}
                  />
                ) : (
                  <FaAsterisk
                    className="text-red-700 absolute top-0 -right-3"
                    size={6}
                  />
                )}
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
            {/* uniGrade */}
            <span className="flex">
              <div className="">
                <label
                  htmlFor="uniGrade"
                  className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
                >
                  Grade
                  {isFieldValid("uniGrade") ? (
                    <FaCheck
                      className="text-green-600 absolute top-0 -right-3"
                      size={8}
                    />
                  ) : (
                    <FaAsterisk
                      className="text-red-700 absolute top-0 -right-3"
                      size={6}
                    />
                  )}
                </label>
                <input
                  type="text"
                  id="uniGrade"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={
                    editingIndex !== null
                      ? formData.education[editingIndex].uniGrade
                      : formData.education[formData.education.length - 1]
                          ?.uniGrade || ""
                  }
                  onChange={(e) =>
                    handleEducationChange(
                      editingIndex !== null
                        ? editingIndex
                        : formData.education.length - 1,
                      "uniGrade",
                      e.target.value
                    )
                  }
                />
              </div>
              {/* DATES */}
              <span className="flex w-full justify-end gap-4">
                {/* Start Date */}
                <div className="">
                  <label
                    htmlFor="uniStartDate"
                    className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
                  >
                    Start Date
                    {isFieldValid("uniStartDate") ? (
                      <FaCheck
                        className="text-green-600 absolute top-0 -right-3"
                        size={8}
                      />
                    ) : (
                      <FaAsterisk
                        className="text-red-700 absolute top-0 -right-3"
                        size={6}
                      />
                    )}
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
                    className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
                  >
                    End Date
                    {isFieldValid("uniEndDate") ? (
                      <FaCheck
                        className="text-green-600 absolute top-0 -right-3"
                        size={8}
                      />
                    ) : (
                      <FaAsterisk
                        className="text-red-700 absolute top-0 -right-3"
                        size={6}
                      />
                    )}
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
            </span>
            {/* uniLocation */}
            <div className="mb-4 w-full">
              <label
                htmlFor="uniLocation"
                className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
              >
                Location
                {isFieldValid("uniLocation") ? (
                  <FaCheck
                    className="text-green-600 absolute top-0 -right-3"
                    size={8}
                  />
                ) : (
                  <FaAsterisk
                    className="text-red-700 absolute top-0 -right-3"
                    size={6}
                  />
                )}
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

            {/* uniSection */}
            <div className="mb-4">
              <label
                htmlFor="uniSection"
                className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
              >
                About
                {isFieldValid("uniSection") ? (
                  <FaCheck
                    className="text-green-600 absolute top-0 -right-3"
                    size={8}
                  />
                ) : (
                  <FaAsterisk
                    className="text-red-700 absolute top-0 -right-3"
                    size={6}
                  />
                )}
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

            {/* uniSkills */}
            <div className="mb-4">
              <label
                htmlFor="uniSkills"
                className=" text-sm font-medium text-gray-700 flex gap-1 relative w-fit"
              >
                Skills
                {isFieldValid("uniSkills") ? (
                  <FaCheck
                    className="text-green-600 absolute top-0 -right-3"
                    size={8}
                  />
                ) : (
                  <FaAsterisk
                    className="text-red-700 absolute top-0 -right-3"
                    size={6}
                  />
                )}
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
              <button
                type="button"
                onClick={handleAddEducation}
                disabled={!isFormValid()}
                className="disabled:text-gray-400 disabled:bg-black/5 p-2 rounded-md bg-black text-white"
              >
                {editingIndex !== null ? (
                  <p className="font-medium">Update Education</p>
                ) : (
                  <p className="font-medium">Save Education</p>
                )}
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
//////////////////////////////////////////////////////////////////////
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
            className="px-3 py-2 bg-black text-white shadow-[rgba(0,_0,_0,_0.25)_0px_3px_4px] ease-in-out duration-200  font-Poppins   font-semibold rounded-md"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={(e) => setModeType("view")}
            className="px-3 py-2 bg-red-600 text-white  shadow-[rgba(0,_0,_0,_0.25)_0px_3px_4px]  ease-in-out duration-200 font-Poppins  font-semibold rounded-md"
          >
            Exit Edit
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
//////////////////////////////////////////////////////////////////////
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
        <span className="headerContent flex  w-full gap-8 p-3  pb-4 relative ">
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
              ) : (
                <>
                  <span className="headerContentLeft w-2/3 space-y-1">
                    <h1 className="name text-[20px] font-Poppins font-semibold">
                      Create A Profile
                    </h1>
                    <h1 className="headline text-[15px] font-Poppins font-normal">
                      Impress Employers and Improve your chances of approval
                    </h1>
                    <h1 className="location text-[13px] font-Poppins pt-2"></h1>
                  </span>
                </>
              )}
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
                      <FaFileAlt size={22} /> CV
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
            <p className="  ">
              Provide a brief introduction and your experience.
            </p>
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
                  <span className="experience-details flex flex-col sm:flex-row w-full">
                    <span className="w-full sm:w-1/2 mb-[2px] flex flex-col  gap-1">
                      <span className="role font-Poppins text-[16px] font-normal flex items-end gap-2">
                        <p>{experience.roleTitle}</p>{" "}
                        <p className="text-[12px]">{experience.roleType}</p>
                      </span>
                      <h1 className="company font-Poppins text-[14px] font-medium">
                        {experience.roleCompany}
                      </h1>
                    </span>
                    <span className="w-full sm:w-1/2 text-start sm:text-end mb-[2px] flex flex-col gap-1">
                      <h1 className="date font-Poppins text-[14px] font-normal flex justify-start sm:justify-end">
                        {experience.roleDateStart}{" "}
                        {experience.roleDateStart && experience.roleDateEnd ? (
                          <RxDash size={17} className="text-gray-500" />
                        ) : null}
                        {experience.roleDateEnd}
                      </h1>
                      <span className="location setting font-Poppins text-[14px] font-normal ">
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
            Show your professional journey.
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
                  <span className="education1 flex flex-col sm:flex-row w-full">
                    <span className="w-full sm:w-1/2 flex flex-col gap-1">
                      <h1 className="degree font-Poppins text-[16px] font-semibold">
                        {educationItem.uniDegree}
                      </h1>
                      <span className="role font-Poppins flex items-end gap-2">
                        <p className="text-[14px] font-medium">
                          {educationItem.uniName}
                        </p>
                        <p className="text-[12px]">{educationItem?.uniGrade}</p>
                      </span>
                    </span>
                    <span className="w-full sm:w-1/2 text-start sm:text-end flex flex-col gap-1">
                      <h1 className="date font-Poppins text-[14px] font-normal flex justify-start sm:justify-end">
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
            Show your academic journey.
          </p>
        )}
      </div>
    </div>
  );
}
/* VIEW PROFILE COMPONENT END */
//////////////////////////////////////////////////////////////////////
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
      <h1 className="hiddenHSEO">
        Skillmint Applicant Profile Page on Dashboard
      </h1>
      <h2 className="hiddenHSEO">Applicant Dashboard Profile Page</h2>
      <span
        className={`w-full justify-end ${
          modeType === "edit" ? "hidden" : "flex"
        }`}
      >
        {!profiles || profiles.length === 0 || profiles === null ? (
          <span className="flex flex-row  font-Poppins justify-end items-center px-2 gap-2">
            <p>
              <strong>Create</strong> your Profile & Start{" "}
              <strong>Applying</strong>
            </p>
            <FaRegHandPointRight size={24} className="text-red-600" />
          </span>
        ) : null}
        <button
          className={` px-3 py-2 bg-black text-white  font-semibold  ease-in-out duration-200 rounded-md hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] font-Poppins my-2`}
          onClick={(e) => setModeType("edit")}
        >
          {!profiles || profiles.length === 0 || profiles === null
            ? "Create Profile"
            : "Personalize Profile"}
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

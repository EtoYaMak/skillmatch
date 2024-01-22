import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { LuListPlus } from "react-icons/lu";
import Modal from "react-modal";

function editEducationBlock({
  formData,
  openEducationModal,
  closeEducationModal,
  handleEditEducation,
  handleDeleteEducation,
  editingIndex,
  isNewEntry,
  isEducationBlockEmpty,
  isEducationModalOpen,
  handleEducationChange,
  handleAddEducation,
}) {
  return (
    <>
      {/*       <div>
        <educationBlockReturn
          formData={formData}
          openEducationModal={openEducationModal}
          closeEducationModal={closeEducationModal}
          handleAddEducation={handleAddEducation}
          handleEducationChange={handleEducationChange}
          handleEditEducation={handleEditEducation}
          handleDeleteEducation={handleDeleteEducation}
          editingIndex={editingIndex}
          isNewEntry={isNewEntry}
          isEducationBlockEmpty={isEducationBlockEmpty}
          isEducationModalOpen={isEducationModalOpen}
        />
      </div> */}
      {/* Education */}
      <div className="education w-full bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.1)0px_1px_5px] flex flex-col h-full">
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
            {/* uniName  */}
            <div className="mb-4">
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
                {isNewEntry === true ? (
                  <p className="font-medium">Save Education</p>
                ) : (
                  <p className="font-medium">Save Changes</p>
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

export default editEducationBlock;

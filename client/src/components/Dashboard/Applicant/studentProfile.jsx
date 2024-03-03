import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../../../features/profiles/profileSlice";

// Separate component for the profile form
function ProfileForm({ handleView, handleDownload, profile }) {
  return (
    <form
      className="space-y-4 px-4 w-full select-none mx-auto font-Poppins h-fit"
      encType="multipart/form-data"
    >
      {/* Profile form content */}
      {/* EXISTING PROFILE VIEW */}
      <div className="space-y-1 flex flex-col">
        <label className="text-xl  text-black ml-2 font-Poppins ">
          University
        </label>
        <input
          type="text"
          name="University"
          className=" font-Poppins input input-primary border-2 border-[#d0333c] text-white/90 text-xl w-full "
          value={profile.University}
          disabled
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="space-y-1 w-24 flex flex-col">
          <label className="font-Poppins text-xl text-black ml-2">Degree</label>
          <input
            type="text"
            name="DegreeTitle"
            value={profile.Degree}
            className="font-Poppins input input-primary border-2 border-[#d0333c] text-white/90 text-xl w-full "
            disabled
          />
        </div>
        <div className="space-y-1 font-Poppins w-full flex flex-col ">
          <label className="text-xl text-black ml-2">Degree Title</label>
          <input
            type="text"
            name="DegreeTitle"
            value={profile.DegreeTitle}
            className="font-Poppins input input-primary border-2 border-[#d0333c] text-white/90 text-xl w-full "
            disabled
          />
        </div>
      </div>

      <div className="space-y-2 flex flex-col font-Poppins ">
        {/*  <label htmlFor="cv" className="text-xl text-white ml-2">
              CV
            </label>
                        {fileNameWithoutPrefix && (
              <p className="text-lg text-white/60 w-full border-t border-[#ff0] select-none">
                {fileNameWithoutPrefix}
              </p>
            )} */}
      </div>
      <div className="flex flex-row space-x-4 w-full justify-center font-Poppins  text-xl">
        {/* If you prefer a button instead of a link */}
        <a
          href={profile.cv}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline bg-black/80 text-white  rounded-3xl hover:bg-white"
        >
          View CV
        </a>
        {/*         <a
          href={profile.cv}
          download="CV_Muhammad_Abdul_Karim.pdf"
          className="btn btn-outline bg-black/80 text-white  rounded-3xl hover:bg-white"
        >
          Download CV
        </a> */}
      </div>
    </form>
  );
}

// Separate component for creating a new profile
function CreateNewProfileForm({
  formData,
  handleSubmitNew,
  handleFileChange,
  setFormData,
}) {
  return (
    <form
      className="space-y-4 px-4 sm:px-0 w-full select-none mx-auto font-Poppins h-fit"
      encType="multipart/form-data"
    >
      {/* Create new profile form content */}

      <div className="space-y-1 font-Poppins flex flex-col">
        <label className="text-xl text-black ml-1">University</label>
        <input
          type="text"
          name="University"
          className="input input-primary border-none outline-none focus:border-none focus:ring-2 focus:ring-red-500 focus:outline-none placeholder:text-white bg-black/80  text-white/90 text-xl w-full "
          value={formData.University}
          onChange={(e) =>
            setFormData({ ...formData, University: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col sm:flex-row w-full gap-2 font-Poppins">
        <div className="space-y-1 flex flex-col">
          <label className="text-xl text-black ml-1">Degree</label>
          <select
            id="Degree"
            name="Degree"
            className="select select-bordered  border-none outline-none focus:border-none focus:ring-2 focus:ring-red-500 focus:outline-none placeholder:text-white bg-black/80  text-white/90 text-xl w-full font-Poppins"
            value={formData.Degree}
            onChange={(e) =>
              setFormData({ ...formData, Degree: e.target.value })
            }
          >
            <option value="BSc">BSc</option>
            <option value="MSc">MSc</option>
            <option value="PhD">PhD</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-1 flex flex-col font-Poppins">
          <label className="text-xl text-black ml-1">Degree Title</label>
          <input
            type="text"
            name="DegreeTitle"
            value={formData.DegreeTitle}
            className="input input-bordered border-none outline-none focus:border-none focus:ring-2 focus:ring-red-500 focus:outline-none placeholder:text-white bg-black/80  text-white/90 text-xl "
            onChange={(e) =>
              setFormData({ ...formData, DegreeTitle: e.target.value })
            }
          />
        </div>
      </div>
      <div className="space-y-1 flex flex-col">
        <label
          htmlFor="cv"
          className="block text-xl text-black ml-1 font-Poppins"
        >
          CV
        </label>
        <input
          type="file"
          accept=".pdf"
          id="cv"
          name="cv"
          onChange={handleFileChange}
          className="file-input file-input-error  text-black bg-black/25 text-lg"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmitNew}
          className="btn btn-outline bg-black text-white  rounded-3xl hover:bg-white font-Poppins"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
}
//
function StudeProfile() {
  const dispatch = useDispatch();
  // Get the profile data from the Redux store
  const profile = useSelector((state) => state.profiles.profiles);

  const [formData, setFormData] = useState({
    Degree: "BSc",
    DegreeTitle: "",
    University: "",
    cv: null, // Initialize cv as null, not an empty string
  });
  // Define state to track the active form
  const [activeForm, setActiveForm] = useState("profile");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      await dispatch(getProfile());
    };
    fetchProfile();
  }, [dispatch]);
  const profileExists = profile && Object.keys(profile).length > 0;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Function to switch to the Profile form
  const switchToProfileForm = () => {
    setActiveForm("profile");
    setIsChecked(false);
  };

  // Function to switch to the Update Profile form
  const switchToUpdateForm = () => {
    setActiveForm("updateProfile");
    setIsChecked(false);
  };

  // Function to switch to the Delete Profile form
  const switchToDeleteForm = () => {
    setActiveForm("deleteProfile");
    setIsChecked(false);
  };
  const handleDeleteProfile = () => {
    // Implement the logic for deleting the profile here
    // This function should be called when the button is clicked
    // Only if the checkbox is checked (isChecked === true)
    if (isChecked === true) {
      const profileId = profile._id; // Get the profile ID
      dispatch(deleteProfile(profileId))
        .unwrap() // This unwraps the promise returned by createAsyncThunk
        .then(() => {
          // Handle success if needed

          setFormData({
            Degree: "BSc",
            DegreeTitle: "",
            University: "",
            cv: null,
          });
          // Optionally, you can perform any actions after successful deletion
          // For example, redirecting the user or showing a success message
        })
        .catch((error) => {
          // Handle error if needed
          console.error("Error deleting profile:", error);
          // Optionally, you can show an error message to the user
        });
    }
    // Reload the page
    window.location.reload();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, cv: file });
  };
  // Function to handle file view
  /*   const handleView = () => {
    if (fileFromDatabase) {
      const fileURL = process.env.PUBLIC_URL + fileFromDatabase;
      window.open(fileURL, "_blank");
    }
  }; */
  // Function to handle file view
  const handleView = () => {
    if (fileFromDatabase) {
      const fileURL = process.env.PUBLIC_URL + fileFromDatabase;
      // Create an anchor element to open the file in a new tab
      const link = document.createElement("a");
      link.href = fileURL;
      link.target = "_blank"; // Open in a new tab
      link.click(); // Trigger the click event
    }
  };

  // Function to handle file download
  const handleDownload = () => {
    const fileURL = formData.cv;
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", "MY_CV_SKILLMATCH_DOWNLOAD.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fileFromDatabase = process.env.PUBLIC_URL + profile.cv; // Replace this with the actual path fetched from the database

  const handleSubmitNew = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData));
    // Reload the page
    window.location.reload();
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    // Add the _id field to the formData before updating the profile
    const updatedFormData = { ...formData, _id: profile._id };

    // Dispatch the updateProfile action and pass the FormData object as data
    try {
      await dispatch(updateProfile(updatedFormData));
      // Optionally, you can reset the form fields after successful update
      setFormData({
        studentName: "", // Add other fields here as needed
        Degree: "BSc",
        DegreeTitle: "",
        University: "",
        /*         cv: null, */
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="Container flex flex-col items-center  w-full max-w-2xl mx-auto p-4 rounded-3xl h-screen">
      <div className="Buttons flex flex-col w-full md:flex-row gap-4 justify-center py-10 font-Poppins">
        <button
          className={`btn btn-ghost ${
            activeForm === "profile"
              ? "font-bold btn-active text-black scale-105"
              : "text-black"
          } `}
          onClick={switchToProfileForm}
        >
          Active
        </button>
        {profile && Object.keys(profile).length > 0 && (
          <>
            <button
              className={`btn btn-ghost ${
                activeForm === "updateProfile"
                  ? "font-bold btn-active text-black scale-105"
                  : "text-black"
              } `}
              onClick={switchToUpdateForm}
            >
              Update
            </button>
            <button
              className={`btn btn-ghost ${
                activeForm === "deleteProfile"
                  ? "font-bold btn-active text-black scale-105"
                  : "text-black"
              } `}
              onClick={switchToDeleteForm}
            >
              Delete
            </button>
          </>
        )}
      </div>
      {activeForm === "profile" && !profileExists ? (
        <CreateNewProfileForm
          formData={formData}
          handleSubmitNew={handleSubmitNew}
          handleFileChange={handleFileChange}
          setFormData={setFormData}
        />
      ) : activeForm === "profile" && profileExists ? (
        <ProfileForm
          formData={formData}
          handleView={handleView}
          handleDownload={handleDownload}
          profile={profile}
        />
      ) : activeForm === "updateProfile" && profileExists ? (
        <form
          onSubmit={handleSubmitUpdate}
          className="space-y-4 px-4 sm:px-0 w-full select-none mx-auto font-Inter"
          encType="multipart/form-data"
        >
          {/* Your Update Profile Form Content */}
          <form
            onSubmit={handleSubmitUpdate}
            className="space-y-4 px-1 sm:px-0 w-full  select-none mx-auto font-Inter"
            encType="multipart/form-data"
          >
            {/* UPDATE EXISTING PROFILE */}
            <div className="space-y-1 font-Poppins flex flex-col">
              <label className="text-xl text-black ml-2">University</label>
              <input
                type="text"
                name="University"
                className="input input-primary border-none outline-none focus:border-none focus:ring-2 focus:ring-red-500 focus:outline-none placeholder:text-white bg-black/80  text-white/90 text-xl w-full "
                placeholder={profile.University}
                onChange={(e) =>
                  setFormData({ ...formData, University: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-2">
              <div className="space-y-1 font-Poppins w-32  flex flex-col">
                <label className="text-xl text-black ml-2">Degree</label>
                <select
                  id="Degree"
                  name="Degree"
                  className="select select-primary border-none outline-none focus:border-none focus:ring-2 focus:ring-red-500 focus:outline-none placeholder:text-white bg-black/80  text-white/90 text-xl w-full "
                  placeholder={profile.Degree}
                  onChange={(e) =>
                    setFormData({ ...formData, Degree: e.target.value })
                  }
                >
                  <option value="BSc">BSc</option>
                  <option value="MSc">MSc</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1 font-Poppins w-full  flex flex-col">
                <label className="text-xl text-black ml-2">Degree Title</label>
                <input
                  type="text"
                  name="DegreeTitle"
                  placeholder={profile.DegreeTitle}
                  className="input input-primary border-none outline-none focus:border-none focus:ring-2 focus:ring-red-500 focus:outline-none placeholder:text-white bg-black/80  text-white/90 text-xl w-full "
                  onChange={(e) =>
                    setFormData({ ...formData, DegreeTitle: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-center font-Poppins">
              <button
                type="submit"
                className="btn btn-outline bg-black text-white  rounded-3xl hover:bg-white"
              >
                Update Profile
              </button>
            </div>
          </form>
        </form>
      ) : activeForm === "deleteProfile" ? (
        <div className="mx-auto flex flex-col items-center justify-evenly space-y-4 font-Poppins">
          {/* Your Delete Profile Form Content */}
          <div className="mx-auto flex flex-col items-center justify-evenly space-y-4">
            <div className="mx-auto flex flex-col items-center justify-evenly space-y-4 ">
              <h1 className="text-2xl text-black">
                Are you sure you want do delete your profile?
              </h1>
              <span className="flex flex-row items-center justify-center space-x-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-warning"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <p className="text-black font-bold text-lg">
                  Yes, I would like to delete my profile!
                </p>
              </span>

              <button
                className={`btn  ${
                  isChecked
                    ? "btn btn-outline bg-black text-white  rounded-3xl hover:bg-white"
                    : " text-black"
                } text-lg btn-wide border-none`}
                onClick={handleDeleteProfile}
                disabled={!isChecked}
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default StudeProfile;

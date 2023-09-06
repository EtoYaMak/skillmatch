import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../features/profiles/profileSlice";

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
          console.log("Profile successfully deleted!");
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
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Dispatch the getProfile thunk to fetch the profile data
        const fetchedProfile = await dispatch(getProfile()).unwrap();

        if (!fetchedProfile) {
          // No profile exists, allow student to create a new one
          // Reset the form fields
          setFormData({
            Degree: "BSc",
            DegreeTitle: "",
            University: "",
            cv: null,
          });
        } else {
          // Profile exists, update the form data
          setFormData({
            Degree: fetchedProfile.Degree,
            DegreeTitle: fetchedProfile.DegreeTitle,
            University: fetchedProfile.University,
            cv: fetchedProfile.cv,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, cv: file });
  };
  // Function to handle file view
  const handleView = () => {
    if (fileFromDatabase) {
      const fileURL = process.env.PUBLIC_URL + fileFromDatabase;
      window.open(fileURL, "_blank");
    }
  };

  // Function to handle file download
  const handleDownload = () => {
    const fileURL = process.env.PUBLIC_URL + formData.cv;
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", "MY_CV_SKILLMINT_DOWNLOAD.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fileFromDatabase = process.env.PUBLIC_URL + formData.cv; // Replace this with the actual path fetched from the database

  const handleSubmitNew = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData));
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
      console.log("Error updating profile:", error);
    }
  };

  return (
    <div className="Container flex flex-col items-center bg-[#2c3033] h-full">
      <div className="Buttons flex flex-col w-full md:flex-row gap-4 sm:w-full justify-center py-10">
        <button
          className="btn w-full md:btn-wide h-fit py-2 text-white text-lg bg-black/40 hover:bg-[#d0333c] border-none"
          onClick={switchToProfileForm}
        >
          Profile
        </button>
        {profile && Object.keys(profile).length > 0 && (
          <button
            className="btn w-full md:btn-wide h-fit py-2 text-white text-lg bg-black/40 hover:bg-[#d0333c] border-none"
            onClick={switchToUpdateForm}
          >
            Update Profile
          </button>
        )}
        <button
          className="btn  w-full md:btn-wide h-fit py-2 text-white text-lg bg-black/40 hover:bg-[#d0333c] border-none"
          onClick={switchToDeleteForm}
        >
          Delete Profile
        </button>
      </div>
      {activeForm === "profile" && !profile && (
        <form
          className="space-y-4 px-4 sm:px-0 w-full sm:w-2/4 select-none mx-auto font-Inter"
          encType="multipart/form-data"
        >
          {/* NO EXISTING PROFILE // CREATE NEW PROFILE */}
          <div className="space-y-1">
            <label className="text-xl text-white ml-1">University</label>
            <input
              type="text"
              name="University"
              className="input input-bordered border-2 border-[#d0333c] text-white/90 text-xl w-full "
              value={formData.University}
              onChange={(e) =>
                setFormData({ ...formData, University: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-xl text-white ml-1">Degree</label>
            <select
              id="Degree"
              name="Degree"
              className="select select-bordered border-2 border-[#d0333c] text-white/90 text-xl w-full"
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
          <div className="space-y-1">
            <label className="text-xl text-white ml-1">Degree Title</label>
            <input
              type="text"
              name="DegreeTitle"
              value={formData.DegreeTitle}
              className="input input-bordered border-2 border-[#d0333c] text-white/90 text-xl w-full "
              onChange={(e) =>
                setFormData({ ...formData, DegreeTitle: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="cv" className="block text-xl text-white ml-1">
              CV
            </label>
            <input
              type="file"
              id="cv"
              name="cv"
              onChange={handleFileChange}
              className="file-input file-input-bordered border-2 hover:text-[#d0333c] border-[#d0333c] text-white/80 "
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmitNew}
              className="btn btn-block bg-black/40 text-white text-lg hover:bg-[#d0333c] border-none"
            >
              Submit
            </button>
          </div>
        </form>
      )}
      {activeForm === "profile" && profile && (
        <form
          className="space-y-4 px-4 sm:px-0 sm:w-2/4 select-none mx-auto font-Inter"
          encType="multipart/form-data"
        >
          {/* EXISTING PROFILE VIEW */}
          <div className="space-y-1 ">
            <label className="text-xl text-white ml-2">University</label>
            <input
              type="text"
              name="University"
              className="input input-primary border-2 border-[#d0333c] text-white/90 text-xl w-full "
              value={formData.University}
              disabled
            />
          </div>
          <div className="space-y-1 ">
            <label className="text-xl text-white ml-2">Degree</label>
            <select
              id="Degree"
              name="Degree"
              className="select select-disabled border-2 border-[#d0333c] text-white/90 text-xl w-full "
              value={formData.Degree}
              disabled
            >
              <option value="BSc">BSc</option>
              <option value="MSc">MSc</option>
              <option value="PhD">PhD</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-1 ">
            <label className="text-xl text-white ml-2">Degree Title</label>
            <input
              type="text"
              name="DegreeTitle"
              value={formData.DegreeTitle}
              className="input input-primary border-2 border-[#d0333c] text-white/90 text-xl w-full "
              disabled
            />
          </div>
          <div className="space-y-2 flex flex-col ">
            {/*  <label htmlFor="cv" className="text-xl text-white ml-2">
              CV
            </label>
                        {fileNameWithoutPrefix && (
              <p className="text-lg text-white/60 w-full border-t border-[#ff0] select-none">
                {fileNameWithoutPrefix}
              </p>
            )} */}
          </div>
          <div className="flex flex-row space-x-4 w-full justify-center font-Inter text-lg">
            {/* If you prefer a button instead of a link */}
            <button
              onClick={handleView}
              className="btn btn-outline text-white w-1/3 rounded-sm hover:bg-white"
            >
              View CV
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-outline text-white w-1/3 rounded-sm hover:bg-white"
            >
              Download CV
            </button>
          </div>
        </form>
      )}
      {activeForm === "updateProfile" && profile && (
        <form
          onSubmit={handleSubmitUpdate}
          className="space-y-4 px-4 sm:px-0 w-full sm:w-2/4 select-none mx-auto font-Inter"
          encType="multipart/form-data"
        >
          {/* UPDATE EXISTING PROFILE */}
          <div className="space-y-1">
            <label className="text-xl text-white ml-2">University</label>
            <input
              type="text"
              name="University"
              className="input input-primary border-2 border-[#d0333c] text-white/90 text-xl w-full "
              value={formData.University}
              onChange={(e) =>
                setFormData({ ...formData, University: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-xl text-white ml-2">Degree</label>
            <select
              id="Degree"
              name="Degree"
              className="select select-primary border-2 border-[#d0333c] text-white/90 text-xl w-full "
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
          <div className="space-y-1">
            <label className="text-xl text-white ml-2">Degree Title</label>
            <input
              type="text"
              name="DegreeTitle"
              value={formData.DegreeTitle}
              className="input input-primary border-2 border-[#d0333c] text-white/90 text-xl w-full "
              onChange={(e) =>
                setFormData({ ...formData, DegreeTitle: e.target.value })
              }
            />
          </div>
          <div className="flex justify-center font-Inter">
            <button
              type="submit"
              className="btn btn-block bg-black/40 text-white text-lg hover:bg-[#d0333c] border-none"
            >
              Update Profile
            </button>
          </div>
        </form>
      )}
      {activeForm === "deleteProfile" && (
        <div className="mx-auto flex flex-col items-center justify-evenly space-y-4">
          <div className="mx-auto flex flex-col items-center justify-evenly space-y-4 ">
            <h1 className="text-2xl text-white">
              Are you sure you want do delete your profile?
            </h1>
            <span className="flex flex-row items-baseline space-x-4">
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <p className="text-red-600 font-bold text-lg">
                I agree and understand this action!
              </p>
            </span>

            <button
              className={`btn  ${
                isChecked
                  ? " bg-black/80 hover:bg-[#d0333c] text-white"
                  : " text-white/20"
              } text-lg btn-wide border-none`}
              onClick={handleDeleteProfile}
              disabled={!isChecked}
            >
              Delete Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudeProfile;

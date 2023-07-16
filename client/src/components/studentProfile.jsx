import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfile,
} from "../features/profiles/profileSlice";
import { Slogout } from "../features/students/studentSlice";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profiles.profiles);
  const student = useSelector((state) => state.students.student);
  const isLoading = useSelector((state) => state.profiles.isLoading);

  const [formData, setFormData] = useState({
    studentName: "",
    Degree: "BSc",
    DegreeTitle: "",
    University: "",
    cv: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        dispatch(getProfile())
          .unwrap()
          .then((fetchedProfile) => {
            if (!fetchedProfile) {
              // No profile exists, allow student to create a new one
              // Reset the form fields
              setFormData({
                Degree: "",
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
                cv: null, // Set cv to null if you're not displaying the existing CV in the form
              });
            }
          })
          .catch((error) => {
            console.log("Error fetching profile:", error);
          });
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, cv: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createProfile(formData));
  };

  const handleDeleteProfile = () => {
    const profileId = profile._id; // Get the profile ID
    dispatch(deleteProfile(profileId));
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(Slogout());
    navigate("/Slogin");
  };

  return (
    <div className="container mx-auto px-4">
      <nav className="py-4">
        <ul className="flex space-x-4">
          <li>
            <button onClick={() => console.log("My Profile clicked")}>
              My Profile
            </button>
          </li>
          <li>
            <button onClick={handleDeleteProfile}>Delete Profile</button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Student Profile</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="studentName" className="block font-bold mb-1">
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={student.name}
                disabled
                required
                className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="Degree" className="block font-bold mb-1">
                Degree
              </label>
              <select
                id="Degree"
                name="Degree"
                value={formData.Degree}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="BSc">BSc</option>
                <option value="MSc">MSc</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="DegreeTitle" className="block font-bold mb-1">
                Degree Title
              </label>
              <input
                type="text"
                id="DegreeTitle"
                name="DegreeTitle"
                value={formData.DegreeTitle}
                onChange={handleInputChange}
                required
                className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="University" className="block font-bold mb-1">
                University
              </label>
              <input
                type="text"
                id="University"
                name="University"
                value={formData.University}
                onChange={handleInputChange}
                required
                className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="cv" className="block font-bold mb-1">
                CV
              </label>
              <input
                type="file"
                id="cv"
                name="cv"
                onChange={handleFileChange}
                className="border-gray-300 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {!profile ? "Update Profile" : "Submit Profile"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;

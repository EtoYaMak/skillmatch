import axios from "axios";

/* const API_URL = "http://18.169.159.127/api/profiles/"; */
const API_URL = "/api/profiles/";

const createProfile = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(API_URL, formData, config);
  return response.data;
};

const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getStudentProfile = async (studentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `view/${studentId}`, config);
  return response.data;
};
const SAgetStudentProfile = async (studentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `view/${studentId}`, config);
  return response.data;
};

const updateProfile = async (updatedFormData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + updatedFormData._id,
    updatedFormData,
    config
  );

  return response.data;
};

const deleteProfile = async (profileId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + profileId, config);
  return response.data;
};

const profileService = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getStudentProfile,
  SAgetStudentProfile,
};

export default profileService;

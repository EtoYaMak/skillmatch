import axios from "axios";

const API_URL = "http://35.178.166.193:4000/api/profiles/";
/* const API_URL = "http://localhost:4000/api/profiles/"; */

const createProfile = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(API_URL, formData, config);
  console.table(...formData);
  return response.data;
};

const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const updateProfile = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.put(API_URL + formData.id, formData, config);
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
  updateProfile,
  getProfile,
  deleteProfile,
};

export default profileService;

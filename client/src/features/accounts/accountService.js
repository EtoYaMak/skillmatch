import axios from "axios";
const API_USERS = "/api/users/";
const API_STUDENTS = "/api/students/";

// Get account
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_USERS + "all", config);
  return response.data;
};
// Get account
const getAllStudents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_STUDENTS + "all", config);
  return response.data;
};

const accountService = {
  getAllUsers,
  getAllStudents,
};

export default accountService;

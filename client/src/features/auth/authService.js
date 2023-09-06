// Making HTTP request
import axios from "axios";

/* const API_URL = "http://18.169.159.127/api/users/"; */
const API_URL = "http://localhost:4000/api/users/";

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Activate Account
const activate = async (type, token) => {
  const response = await axios.post(API_URL + `activate/${type}/${token}`);
  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Forgot Password
const forgotPassword = async (email) => {
  const response = await axios.post(API_URL + "forgot", { email });
  return response.data;
};

// Reset Password
const resetPassword = async (type, token, password) => {
  const response = await axios.post(API_URL + `reset/${type}/${token}`, {
    password,
  });
  return response.data;
};

// Logout User
const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  register,
  login,
  logout,
  activate,
  forgotPassword,
  resetPassword,
};

export default authService;

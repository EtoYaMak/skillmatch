// Making HTTP request
import axios from "axios";

const API_URL = "/api/superusers/";

// Register Admin
const SAregister = async (SAuserData) => {
  const response = await axios.post(API_URL, SAuserData);

  if (response.data) {
    localStorage.setItem("SAuser", JSON.stringify(response.data));
  }

  return response.data;
};

// Activate Account
const SAactivate = async (type, token) => {
  const response = await axios.post(API_URL + `activate/${type}/${token}`);
  return response.data;
};

// Login User
const SAlogin = async (SAuserData) => {
  const response = await axios.post(API_URL + "login", SAuserData);

  if (response.data) {
    localStorage.setItem("SAuser", JSON.stringify(response.data));
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
const SAlogout = () => {
  localStorage.removeItem("SAuser");
};

const authService = {
  SAregister,
  SAlogin,
  SAlogout,
  SAactivate,
  forgotPassword,
  resetPassword,
};

export default authService;

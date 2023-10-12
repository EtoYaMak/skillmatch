// Making HTTP request
import axios from "axios";

/* const API_URL = "http://18.169.159.127/api/students/"; */
const API_URL = "/api/students/";

// Register Student
const Sregister = async (studentData) => {
  const response = await axios.post(API_URL, studentData);

  if (response.data) {
    localStorage.setItem("student", JSON.stringify(response.data));
  }

  return response.data;
};

// Login Student
const Slogin = async (studentData) => {
  const response = await axios.post(API_URL + "login", studentData);

  if (response.data) {
    localStorage.setItem("student", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout Student
const Slogout = () => {
  localStorage.removeItem("student");
};

//
const fetchStudentData = async (token) => {
  try {
    const response = await axios.get(API_URL + "me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

//
// Activate Account
const activateS = async (type, token) => {
  const response = await axios.post(API_URL + `activate/${type}/${token}`);
  return response.data;
};

// Forgot Password
const forgotPasswordS = async (email) => {
  const response = await axios.post(API_URL + "forgot", { email });
  return response.data;
};

// Reset Password
const resetPasswordS = async (type, token, password) => {
  const response = await axios.post(API_URL + `reset/${type}/${token}`, {
    password,
  });
  return response.data;
};
//

const studentService = {
  Sregister,
  Slogout,
  Slogin,
  fetchStudentData,
  activateS,
  forgotPasswordS,
  resetPasswordS,
};

export default studentService;

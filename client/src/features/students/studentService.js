// Making HTTP request
import axios from "axios";
const SERVER_IP = "16.170.201.227";
const API_URL = `http://16.170.247.204/api/students/`;
/* const API_URL = "http://localhost:4000/api/students/"; */

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
const studentService = {
  Sregister,
  Slogout,
  Slogin,
};

export default studentService;

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StudentProfile from "../components/studentProfile";

function StudentDash() {
  const { student } = useSelector((state) => state.students);

  // Get the navigate function
  const navigate = useNavigate();

  // Check if the student exists in the state
  if (!student) {
    // If no student, redirect to the login page or show an "Unauthorized" message
    navigate("/loginS"); // Replace this with your login page path
    // You can also display an "Unauthorized access" message here
    return <p>Unauthorized access ~ Login to view your profile</p>;
  }

  // If student exists, render the StudentProfile component
  return <StudentProfile />;
}

export default StudentDash;

import { useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import "./App.css";
import UserDash from "./pages/UserDash";
import StudentRegister from "./pages/StudentRegister";
import StudentLogin from "./pages/StudentLogin";
import StudentDash from "./pages/StudentDash";
import JobDetailComponent from "./components/JobDetailComponent";
import JobUpdatePage from "./components/JobUpdatePage";
import StudentProfile from "./components/studentProfile";
import ActivateAccount from "./components/ActivateAccount";
import { useSelector } from "react-redux";

function App() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.auth.user); // Access the user data in your state

  useEffect(() => {
    /* fetch("http://18.169.159.127") */
    fetch("http://localhost:4000")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => setMessage(data.message))
      .catch((error) => {
        setMessage("Error: " + error.message);
      });
  }, []);

  return (
    <div className="App bg-[#2c3033] h-fit">
      <Navbar />
      {user && !user.isActive && (
        <div className="w-2/4 mt-4 select-none hover:scale-[100.4%] mx-auto text-lg font-Inter text-white text-center bg-[#d0333c] rounded-xl">
          Account not activated, Check your email for activation link!
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/post" element={<Post />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginS" element={<StudentLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:token" component={<ActivateAccount />} />
        <Route path="/registerS" element={<StudentRegister />} />
        <Route path="/dash" element={<UserDash />} />
        <Route path="/dashboardS" element={<StudentDash />} />
        <Route path="/jobs/:jobId" element={<JobDetailComponent />} />
        <Route path="/jobs/:jobId/update" element={<JobUpdatePage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

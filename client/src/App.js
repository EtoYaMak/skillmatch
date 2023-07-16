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

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <h1 className="text-white hover:text-black text-center">{message}</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/post" element={<Post />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginS" element={<StudentLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerS" element={<StudentRegister />} />
        <Route path="/dash" element={<UserDash />} />
        <Route path="/studentDash" element={<StudentDash />} />

        <Route path="/jobs/:jobId" element={<JobDetailComponent />} />
        <Route path="/jobs/:jobId/update" element={<JobUpdatePage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

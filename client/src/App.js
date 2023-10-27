import { useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Contact from "./pages/Contact";
import Post from "./pages/Post";

import Register from "./pages/Register";
import Login from "./pages/Login";
import PasswordResetUser from "./components/PasswordResetUser";
import PasswordResetUserForm from "./components/PasswordResetUserForm";

import RegisterAdmin from "./components/RegisterAdmin";
import LoginAdmin from "./components/LoginAdmin";
import PasswordResetAdmin from "./components/PasswordResetAdmin";
import PasswordResetAdminForm from "./components/PasswordResetAdminForm";
import AdminDash from "./components/AdminDash";

import UserDash from "./pages/UserDash";
import JobApplicants from "./components/JobApplicants";
import UserDashJobs from "./components/UserDashJobs";

import StudentDash from "./pages/StudentDash";
import StudentApplications from "./components/StudentApplications";

import ActivateAccount from "./components/ActivateAccount";
import ActivationModal from "./components/ActivationModal";

import JobDetailComponent from "./components/JobDetailComponent";
import JobUpdatePage from "./components/JobUpdatePage";

import { useSelector, useDispatch } from "react-redux";
import PaymentForm from "./components/PaymentForm";
import StripeContainer from "./components/StripeContainer";

import Footer from "./components/Footer";

function App() {
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.auth.user);
  const student = useSelector((state) => state.students.student);

  /*   useEffect(() => {
    fetch("http://18.169.159.127")
      // fetch("http://localhost:4000") 
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
  }, []); */
  // State to control the modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  useEffect(() => {
    if (user && user.isActive) {
      setModalOpen(false);
    } else if (user && !user.isActive) {
      setModalType("user");
      setModalOpen(true);
    } else if (student && !student.isActive) {
      setModalType(`student-${student.type}`);
      setModalOpen(true);
    } else if (student && student.isActive) {
      setModalOpen(false);
    }
  }, [user, student]);

  return (
    <>
      <div className="App bg-[#2c3033] min-h-screen">
        <Navbar />
        <ActivationModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          type={modalType}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/post" element={<Post />} />
          <Route path="/contact" element={<Contact />} />
          {/* Normal */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-reset" element={<PasswordResetUser />} />
          <Route
            path="/reset/:type/:token"
            element={<PasswordResetUserForm />}
          />
          {/* Super */}
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/registerAdmin" element={<RegisterAdmin />} />
          <Route
            path="/password-reset-admin"
            element={<PasswordResetAdmin />}
          />
          <Route
            path="/reset/:type/:token"
            element={<PasswordResetAdminForm />}
          />
          <Route path="/adminDash" element={<AdminDash />} />

          {/* Admin End */}
          <Route path="/activate/:type/:token" element={<ActivateAccount />} />

          <Route path="/dash" element={<UserDash />} />
          <Route path="/userjobs" element={<UserDashJobs />} />
          <Route path="/dashboardS" element={<StudentDash />} />

          <Route path="/myapplications" element={<StudentApplications />} />
          <Route path="/jobapplicants/:jobId" element={<JobApplicants />} />

          <Route path="/jobs/:jobId" element={<JobDetailComponent />} />
          <Route path="/jobs/:jobId/update" element={<JobUpdatePage />} />
          <Route path="/payment" element={<StripeContainer />} />
        </Routes>
        <ToastContainer />
      </div>
      <div className="bg-[#2c3033]">
        <Footer />
      </div>
    </>
  );
}

export default App;

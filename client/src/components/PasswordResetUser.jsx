import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { forgotPassword, reset } from "../features/auth/authSlice";
import { forgotPasswordS, Sreset } from "../features/students/studentSlice";

function PasswordResetUser() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Initialize state for selected role
  const [selectedRole, setSelectedRole] = useState("poster");

  // Function to handle role selection change
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    console.log(selectedRole);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email) {
      const action =
        selectedRole === "Job Poster Account"
          ? forgotPassword
          : forgotPasswordS;
      try {
        dispatch(action(email));
        toast.success("Password reset link sent to your email");
      } catch (error) {
        toast.error(error.message);
      }

      if (selectedRole == "poster") {
        dispatch(reset());
      } else if (selectedRole == "applicant") {
        dispatch(Sreset());
      }
    } else {
      toast.error("Please enter your email to reset password");
    }
    navigate("/login");
  };

  return (
    <div className="w-2/3 mx-auto h-[75vh] my-5 font-Inter">
      <div className="hero  rounded-lg h-full px-4">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="sm:px-12 text-center lg:text-left text-white">
            <h1 className="text-5xl font-bold">Request password reset</h1>
            <p className="py-6">
              Enter your email to request a password reset link
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-xl shadow-black/60 bg-base-300">
            <form onSubmit={onSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered text-white"
                  required
                />
              </div>

              {/* ROLE SELECTION */}
              <div className="flex flex-col justify-center w-full mt-4">
                <span className="text-center text-gray-300 text-sm">
                  Select Your Role
                </span>

                <div className="flex flex-row justify-around mt-2">
                  <label
                    htmlFor="poster"
                    className={`btn btn-ghost  w-36 ${
                      selectedRole === "poster"
                        ? "bg-white/10 text-white"
                        : "text-white/25"
                    }`}
                  >
                    <input
                      type="radio"
                      id="poster"
                      name="role"
                      value="poster"
                      className=" radio radio-mark"
                      onChange={handleRoleChange}
                      checked={selectedRole === "poster"}
                    />
                    Poster
                  </label>
                  <label
                    htmlFor="applicant"
                    className={`btn btn-ghost w-36 ${
                      selectedRole === "applicant"
                        ? "bg-white/10 text-white "
                        : "text-white/25"
                    }`}
                  >
                    <input
                      type="radio"
                      id="applicant"
                      name="role"
                      value="applicant"
                      className="radio radio-mark"
                      onChange={handleRoleChange}
                      checked={selectedRole === "applicant"}
                    />
                    Applicant
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-ghost text-[#fff] bg-[#d0333c]/70 hover:bg-[#d0333c] hover:text-[#fff]
                  flex text-lg font-Inter tracking-wide"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetUser;

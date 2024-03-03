import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { forgotPassword, reset } from "../../features/auth/authSlice";
import { forgotPasswordS, Sreset } from "../../features/students/studentSlice";

function PasswordResetUser() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Initialize state for selected role
  const [selectedRole, setSelectedRole] = useState("poster");

  // Function to handle role selection change
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
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
    <>
      <h1 className="hiddenHSEO">Request a Password Reset for your account</h1>
      <h2 className="hiddenHSEO">Skillmatch Password Reset page</h2>
      <div className="flex-shrink-0 h-screen ">
        <div className=" translate-y-36 w-fit mx-auto">
          <form
            onSubmit={onSubmit}
            className="w-[480px] h-[420px] mx-auto bg-black/5 rounded-[6px] text-black p-12"
          >
            <h1 className="bg-transparent font-Poppins leading-[1.4rem] uppercase tracking-tighter text-3xl font-extrabold hover:text-[#d0333c] ease-in-out duration-300 w-fit mx-auto ">
              Skill
              <br />
              Mint
            </h1>
            <h1 className="w-fit text-[2.1em] font-Poppins mx-auto my-6">
              Request Reset Email
            </h1>
            <div className="form-control  max-w-[340px] mx-auto">
              <label className="text-[15px] mb-1 ">Email Address*</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-[340px] text-black bg-white placeholder:text-black/40 text-[14px] py-4 border border-black/40 rounded-[3px]"
                required
              />
            </div>

            {/* ROLE SELECTION */}
            <div className="flex flex-row items-center gap-2 font-Poppins max-w-[340px] mx-auto justify-center my-6">
              <p className="h-8 rounded-md w-fit px-2 py-1 text-center font-bold text-black/75 select-none">
                Role
              </p>
              <label
                htmlFor="poster"
                className={` h-8 rounded-md w-fit px-2 py-1 text-center cursor-pointer  ${
                  selectedRole === "poster"
                    ? "font-medium underline underline-offset-2"
                    : "opacity-70"
                }`}
              >
                <input
                  type="radio"
                  id="poster"
                  name="role"
                  value="poster"
                  className=" radio radio-mark "
                  onChange={handleRoleChange}
                  checked={selectedRole === "poster"}
                />
                Poster
              </label>
              <label
                htmlFor="applicant"
                className={`h-8 rounded-md w-fit px-2 py-1 cursor-pointer ${
                  selectedRole === "applicant"
                    ? "font-medium underline underline-offset-2 "
                    : "opacity-70"
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

            <div className="form-control  max-w-[340px] mx-auto my-12">
              <button className="text-lg font-Poppins tracking-wide bg-black text-white py-3 rounded-[3px]">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PasswordResetUser;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { forgotPassword } from "../features/auth/authSlice";
import { forgotPasswordS } from "../features/students/studentSlice";

function PasswordResetUser() {
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();

    if (email) {
      const action =
        accountType === "Job Poster Account" ? forgotPassword : forgotPasswordS;
      try {
        await dispatch(action(email)); // Dispatch action
        toast.success("Password reset link sent to your email");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Please enter your email to reset password");
    }
  };

  return (
    <div className="w-1/2 mx-auto py-[5vh] font-Inter">
      <div className="bg-black/20 p-8 rounded shadow-md w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">Reset Password</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              className="block text-white text-md font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control input bg-white/5 text-xl text-white focus:outline-none focus:shadow-outline focus:border-none focus:ring-[#d0333c] w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-md font-bold mb-2"
              htmlFor="accountType"
            >
              Account Type
            </label>
            <input
              type="checkbox"
              id="jobPosterAccount"
              name="accountType"
              value="Job Poster Account"
              className="checkbox checkbox-ghost"
              checked={accountType === "Job Poster Account"}
              onChange={(e) => setAccountType(e.target.value)}
            />
            <label htmlFor="jobPosterAccount" className="text-white mx-2">
              Job Poster Account
            </label>
            <input
              type="checkbox"
              id="jobSeekerAccount"
              name="accountType"
              value="Job Seeker Account"
              className="checkbox checkbox-ghost"
              checked={accountType === "Job Seeker Account"}
              onChange={(e) => setAccountType(e.target.value)}
            />
            <label htmlFor="jobSeekerAccount" className="text-white mx-2">
              Job Seeker Account
            </label>
          </div>
          <div className="flex justify-center my-4 ">
            <button
              type="submit"
              className="btn btn-ghost bg-white/20 hover:bg-white text-white hover:text-[#d0333c] font-bold ease-in-out duration-300"
            >
              Reset Password
            </button>
          </div>
          <div className="flex justify-center ">
            <Link
              to="/login"
              className="btn btn-ghost text-white hover:bg-white/10 hover:text-[#d0333c] ease-in-out duration-300"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetUser;

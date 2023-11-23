import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { forgotPassword, SAreset } from "../../features/SAuser/adminSlice";

function PasswordResetAdmin() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(forgotPassword(email));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(SAreset());
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

export default PasswordResetAdmin;

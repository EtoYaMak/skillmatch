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
    <>
      {" "}
      <div className="flex-shrink-0 h-screen ">
        <div className=" translate-y-36 w-fit mx-auto">
          <form
            onSubmit={onSubmit}
            className="w-[480px] h-[420px] mx-auto bg-black/5 rounded-[6px] text-black p-12"
          >
            <h1 className="bg-transparent font-Poppins leading-[1.4rem] uppercase tracking-tighter text-3xl font-extrabold hover:text-[#d0333c] ease-in-out duration-300 w-fit mx-auto ">
              Skill
              <br />
              MATCH
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

export default PasswordResetAdmin;

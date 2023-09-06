import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPassword } from "../features/auth/authSlice";
import { resetPasswordS } from "../features/students/studentSlice";
import { toast } from "react-toastify";

function PasswordResetUserForm() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const { type, token } = useParams();

  const relevantState = useSelector((state) => {
    if (type === "1") return state.auth;
    if (type === "2") return state.students;
    return null;
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "1") {
        await dispatch(resetPassword({ type, token, password }));
      } else if (type === "2") {
        await dispatch(resetPasswordS({ type, token, password }));
      }
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-1/2 mx-auto py-[5vh] font-Inter">
      <div className="bg-black/20 p-8 rounded shadow-md w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">Set New Password</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              className="block text-white text-md font-bold mb-2"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control input bg-white/5 text-xl text-white focus:outline-none focus:shadow-outline focus:border-none focus:ring-[#d0333c] w-full"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center my-4 ">
            <button
              type="submit"
              className="btn btn-ghost bg-white/20 hover:bg-white text-white hover:text-[#d0333c] font-bold ease-in-out duration-300"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetUserForm;

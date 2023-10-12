import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPassword } from "../features/auth/authSlice";
import { resetPasswordS } from "../features/students/studentSlice";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function PasswordResetUserForm() {
  const dispatch = useDispatch();
  //FormData
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });
  const { password, password2 } = formData;
  const passwordsMatch = password === password2;

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  //Funcs
  const isPasswordValid = (password) => {
    // Define your password criteria
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*]/.test(password);
    const hasNoSpaces = !/\s/.test(password);

    // Create an array to store validation messages
    const validationMessages = [];

    // Check each criterion and add a message if not met
    if (password.length < minLength) {
      validationMessages.push(
        `Password should be at least ${minLength} characters.`
      );
    }
    if (!hasUppercase) {
      validationMessages.push(
        `Password should include at least one uppercase letter.`
      );
    }
    if (!hasLowercase) {
      validationMessages.push(
        `Password should include at least one lowercase letter.`
      );
    }
    if (!hasSpecialCharacter) {
      validationMessages.push(
        `Password should include at least one special character.`
      );
    }
    if (!hasNoSpaces) {
      validationMessages.push(`Password should not contain spaces.`);
    }

    // Return the validation messages or an empty array if all criteria are met
    return validationMessages;
  };
  //onChange form fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
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
        dispatch(resetPassword({ type, token, password }));
      } else if (type === "2") {
        dispatch(resetPasswordS({ type, token, password }));
      }
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="w-2/3 mx-auto h-[75vh] my-5 font-Inter">
        <div className="hero h-fit px-4">
          <div className="hero-content flex-col  ">
            <div className="sm:px-12 text-center lg:text-left text-white">
              <h1 className="text-5xl font-bold">Password Reset</h1>
              <p className="py-6 text-center">Enter a new password</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-xl shadow-black/60 bg-base-300">
              <form onSubmit={onSubmit} className="card-body">
                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">New Password</span>
                  </label>
                  <div className="flex flex-row items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      placeholder="Enter password"
                      onChange={onChange}
                      className="input input-bordered text-white w-full focus:outline-none focus:shadow-outline focus:border-none focus:ring-[#d0333c]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="toggle-password-button ml-2 text-white"
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible size={24} />
                      ) : (
                        <AiFillEye size={24} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <div className="flex flex-row items-center mb-4">
                    <input
                      type={showPassword2 ? "text" : "password"}
                      className="input input-bordered text-white w-full focus:outline-none focus:shadow-outline focus:border-none focus:ring-[#d0333c]"
                      name="password2"
                      value={password2}
                      placeholder="Confirm password"
                      onChange={onChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword2(!showPassword2)}
                      className="toggle-password-button ml-2 text-white"
                    >
                      {showPassword2 ? (
                        <AiFillEyeInvisible size={24} />
                      ) : (
                        <AiFillEye size={24} />
                      )}
                    </button>
                  </div>
                  {/* Password matching feedback */}
                  {password !== "" && password2 !== "" && !passwordsMatch && (
                    <div className="text-sm font-Inter text-center ">
                      <p className="ml-1 text-red-500">
                        Passwords do not match
                      </p>
                    </div>
                  )}

                  {/* Password validation feedback */}
                  {password !== "" && isPasswordValid(password).length > 0 && (
                    <div className="text-white text-xs font-Inter toast toast-center">
                      {isPasswordValid(password).map((message, index) => (
                        <p className="alert bg-red-700 text-white" key={index}>
                          {message}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-control mt-4">
                  <button
                    className="btn btn-ghost text-[#fff] bg-[#d0333c]/70 hover:bg-[#d0333c] hover:text-[#fff]
                  flex text-lg font-Inter tracking-wide"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordResetUserForm;

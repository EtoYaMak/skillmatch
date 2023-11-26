import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPassword, reset } from "../../features/auth/authSlice";
import { resetPasswordS, Sreset } from "../../features/students/studentSlice";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function PasswordResetUserForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (type === "1") {
      dispatch(reset());
    } else if (type === "2") {
      dispatch(Sreset());
    }
    navigate("/login");
  };

  return (
    <>
      <div className=" w-full font-Poppins h-screen">
        <div className=" translate-y-24 w-fit mx-auto">
          <form
            onSubmit={onSubmit}
            className="w-[540px] h-[560px] bg-black/5 rounded-[6px] p-8 pt-12"
          >
            <h1 className="select-none bg-transparent font-Poppins leading-[1.4rem] uppercase tracking-tighter text-3xl font-extrabold hover:text-[#d0333c] ease-in-out duration-300 w-fit mx-auto ">
              Skill
              <br />
              Mint
            </h1>
            <h1 className="w-fit text-[2.1em] font-Poppins mx-auto my-12 select-none">
              New Password
            </h1>
            {/* Password */}
            <div className="form-control  max-w-[340px] mx-auto mt-3">
              <label className="text-[15px] mb-1 select-none">Password*</label>
              <div className="relative inline-block">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={onChange}
                  className="w-full text-black bg-white placeholder:text-black/40 text-[14px] py-4 border border-black/40 rounded-[3px]"
                  required
                />
                {/* <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password-button absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={24} />
                ) : (
                  <AiFillEye size={24} />
                )}
              </button> */}
              </div>
            </div>
            <div className="form-control  max-w-[340px] mx-auto mt-3">
              <label className="text-[15px] mb-1 select-none">
                Confirm Password*
              </label>
              <div className="relative inline-block">
                <input
                  type={showPassword2 ? "text" : "password"}
                  name="password2"
                  value={password2}
                  placeholder="Enter password"
                  onChange={onChange}
                  className="w-full text-black bg-white placeholder:text-black/40 text-[14px] py-4 border border-black/40 rounded-[3px]"
                  required
                />
                {/* <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password-button absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={24} />
                ) : (
                  <AiFillEye size={24} />
                )}
              </button> */}
              </div>

              {/* Password matching feedback */}
              {password !== "" && password2 !== "" && !passwordsMatch && (
                <div className=" text-black text-[9px]  max-w-[340px] font-Poppins font-medium">
                  <p className=" text-black ">Passwords do not match</p>
                </div>
              )}

              {/* Password validation feedback */}
              {password !== "" && isPasswordValid(password).length > 0 && (
                <div className="relative  font-Poppins max-w-[340px] font-medium">
                  {isPasswordValid(password).map((message, index) => (
                    <p className="text-black text-[9px]" key={index}>
                      {message}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="form-control  max-w-[340px] mx-auto my-12">
              <button className="text-lg font-Poppins tracking-wide bg-black text-white py-3 rounded-[3px]">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PasswordResetUserForm;

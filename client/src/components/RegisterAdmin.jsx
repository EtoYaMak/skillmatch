import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { SAregister, SAreset } from "../features/SAuser/adminSlice";

import Spinner from "../components/Spinner";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function RegisterAdmin() {
  //FormData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const passwordsMatch = password === password2;

  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Redux State
  const {
    SAuser,
    isLoading: SAuserIsLoading,
    isError: SAuserIsError,
    isSuccess: SAuserSuccess,
    message: SAuserMessage,
  } = useSelector((state) => state.SAuser);

  //State Hooks

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  useEffect(() => {
    if (SAuserIsError) {
      toast.error(SAuserIsError, SAuserMessage);
    }
    if (SAuserSuccess || SAuser) {
      navigate("/");
    }

    if (SAuserSuccess) {
      dispatch(SAreset());
    }
  }, [SAuser, SAuserIsError, SAuserSuccess, SAuserMessage, navigate, dispatch]);

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
  //Submit

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const SAuserData = {
        name,
        email,
        password,
      };

      dispatch(SAregister(SAuserData));
    } catch (error) {
      toast.error(error.message);
    }
  };

  //
  if (SAuserIsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="hero min-h-[91vh] z-1">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left font-Inter">
            <h1 className="text-5xl font-bold text-white">Admin Register</h1>
            <p className="py-6 text-xl text-white">Unlock the power</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl shadow-black/60 bg-[#1c1f21]">
            <form onSubmit={onSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Enter your name"
                  onChange={onChange}
                  className="input input-bordered text-white"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={onChange}
                  className="input input-bordered text-white"
                  required
                />
              </div>
              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
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
              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <div className="flex flex-row items-center">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    className="input input-bordered text-white w-full focus:outline-none focus:shadow-outline focus:border-none focus:ring-[#d0333c]"
                    name="password2"
                    value={password2}
                    placeholder="Confirm password"
                    onChange={onChange}
                    //className="input input-bordered text-white w-full "
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
                  <div className="mt-1 text-white text-xs font-Inter text-center ">
                    <p className="ml-1 text-white">Passwords do not match</p>
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
              {/* REGISTER BUTTON */}
              <div className="form-control mt-4">
                <button
                  type="submit"
                  className="btn btn-ghost text-[#fff] bg-[#d0333c]/70 hover:bg-[#d0333c] hover:text-[#fff]
                  flex text-lg font-Inter tracking-wide"
                >
                  Register
                </button>
              </div>
              {/* LOGIN REDIRECT */}
              <Link
                to="/adminLogin"
                className="form-control mt-4 justify-center flex flex-row gap-1 items-baseline"
              >
                <h1 className="text-white">Already have an account? </h1>
                <a className="text-white">Login now</a>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterAdmin;

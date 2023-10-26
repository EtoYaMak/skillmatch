import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import { Sregister, Sreset } from "../features/students/studentSlice";

import Spinner from "../components/Spinner";
import PrivacyPolicyModal from "../components/level_2/PrivacyPolicyModal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Register() {
  //FormData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const passwordsMatch = password === password2;

  // Initialize state for selected role
  const [selectedRole, setSelectedRole] = useState("poster");

  // Function to handle role selection change
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Redux State
  const {
    user,
    isLoading: authIsLoading,
    isError: authIsError,
    isSuccess: authIsSuccess,
    message: authMessage,
  } = useSelector((state) => state.auth);

  const {
    student,
    isLoading: studentsIsLoading,
    isError: studentsIsError,
    isSuccess: studentsIsSuccess,
    message: studentsMessage,
  } = useSelector((state) => state.students);

  //State Hooks
  const [isTCOpen, setTCOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  useEffect(() => {
    if (authIsError || studentsIsError) {
      toast.error(authIsError ? authMessage : studentsMessage);
    }
    if (studentsIsSuccess || authIsSuccess || user || student) {
      navigate("/");
    }

    if (authIsSuccess) {
      dispatch(reset());
    } else if (studentsIsSuccess) {
      dispatch(Sreset());
    }
  }, [
    user,
    student,
    authIsError,
    studentsIsError,
    authIsSuccess,
    studentsIsSuccess,
    authMessage,
    studentsMessage,
    navigate,
    dispatch,
  ]);

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

  const openTC = () => {
    setTCOpen(true);
  };

  const closeTC = () => {
    setTCOpen(false);
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
    const termsConditionsCheckbox = document.getElementById("tc");
    if (termsConditionsCheckbox.checked) {
      // Dispatch the registration action based on the selected role
      if (selectedRole === "poster") {
        // Dispatch the action for poster registration
        const userData = {
          name,
          email,
          password,
        };

        dispatch(register(userData));
      } else if (selectedRole === "applicant") {
        // Dispatch the action for applicant registration
        const studentData = {
          name,
          email,
          password,
        };

        dispatch(Sregister(studentData));
      }
    } else {
      toast.error("Please accept the Privacy Policy before registering.");
    }
  };

  //
  if (authIsLoading || studentsIsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="hero min-h-[91vh] z-1">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left font-Inter">
            <h1 className="text-5xl font-bold text-white">Register!</h1>
            <p className="py-6 text-xl text-white">
              Unlock Your Career Opportunities or Start Building Your Team
              Today!
            </p>
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
                {/* ROLE SELECTION */}
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

                {/* TERMS & CONDITIONS */}
                <div className="flex items-end">
                  <input
                    type="checkbox"
                    name="tc"
                    id="tc"
                    className="mt-4 mx-1 checkbox "
                  />
                  <p className="mt-4 mx-1 text-white">
                    I accept{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        openTC();
                      }}
                      className="text-red-600 underline"
                    >
                      terms & conditions
                    </a>
                    .
                  </p>
                </div>
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
                to="/login"
                className="form-control mt-4 justify-center flex flex-row gap-1 items-baseline"
              >
                <h1 className="text-white">Already have an account? </h1>
                <a className="text-white">Login now</a>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <div className="h-full z-99">
        <PrivacyPolicyModal isOpen={isTCOpen} onClose={closeTC} />
      </div>
    </>
  );
}

export default Register;

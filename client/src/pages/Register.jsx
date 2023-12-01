import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import { Sregister, Sreset } from "../features/students/studentSlice";

import Spinner from "../components/Misc/Spinner";
import PrivacyPolicyModal from "../components/Misc/PrivacyPolicyModal";
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

  if (authIsLoading || studentsIsLoading) {
    return (
      <div className="w-full flex-1 flex justify-center items-start h-screen">
        <span className="loading loading-spinner text-error w-14 mt-[10%]"></span>
      </div>
    );
  }
  return (
    <>
      <div className=" w-full font-Poppins h-full">
        <div className="translate-y-12 sm:translate-y-24 max-[780px]:w-full min-[780px]:w-fit mx-auto">
          <form
            onSubmit={onSubmit}
            className="max-[780px]:w-full min-[780px]:w-[780px] h-full sm:h-[760px] bg-black/5 rounded-[6px] p-8 pt-12"
          >
            <h1 className="select-none bg-transparent font-Poppins leading-[1.4rem] uppercase tracking-tighter text-3xl font-extrabold hover:text-[#d0333c] ease-in-out duration-300 w-fit mx-auto ">
              Skill
              <br />
              Mint
            </h1>
            <h1 className="w-fit text-[2.1em] font-Poppins mx-auto my-12 select-none">
              {selectedRole === "poster" ? "Employer" : " Applicant"} Register
            </h1>
            <div className="form-control  max-w-[340px] mx-auto">
              <label className="text-[15px] mb-1 select-none">Full Name*</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={onChange}
                className="w-full text-black bg-white placeholder:text-black/40 text-[14px] py-4 pl-[12px] border border-black/40 rounded-[3px]"
                required
              />
            </div>
            <div className="form-control  max-w-[340px] mx-auto mt-3">
              <label className="text-[15px] mb-1 select-none">
                Email Address*
              </label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
                className="w-full text-black bg-white placeholder:text-black/40 text-[14px] py-4 border border-black/40 rounded-[3px]"
                required
              />
            </div>
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
            </div>
            {/* Password matching feedback */}
            {password !== "" && password2 !== "" && !passwordsMatch && (
              <div className=" text-black text-[9px] mx-auto max-w-[340px] font-Poppins font-medium">
                <p className=" text-black ">Passwords do not match</p>
              </div>
            )}

            {/* Password validation feedback */}
            {password !== "" && isPasswordValid(password).length > 0 && (
              <div className="relative mx-auto font-Poppins max-w-[340px] font-medium">
                {isPasswordValid(password).map((message, index) => (
                  <p className="text-black text-[9px]" key={index}>
                    {message}
                  </p>
                ))}
              </div>
            )}
            <div className="form-control  max-w-[340px] mx-auto my-6">
              <button className="text-lg font-Poppins tracking-wide bg-black text-white py-3 rounded-[3px] select-none">
                Register
              </button>
            </div>
            <div className=" max-w-[340px] text-center mx-auto my-14">
              <Link to="/login" className="text-[17px]">
                Already have an Account ?
              </Link>
              {/* ROLE SELECTION */}
              <div className="absolute right-3 top-3 font-Poppins">
                <div className="flex flex-col sm:flex-row items-center gap-2">
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
              </div>
            </div>

            {/* LOGIN REDIRECT */}
          </form>
          {/*           <Link
            to="/register"
            className="form-control mt-4 justify-center flex flex-row gap-1 items-baseline"
          >
            <h1 className="text-black">Not registered? </h1>
            <a className="text-black hover:text-[#d0333c] hover:underline hover:decoration-black font-medium">
              Register now
            </a>
          </Link> */}
        </div>
      </div>
    </>
  );
}

export default Register;

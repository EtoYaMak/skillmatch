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
    //const termsConditionsCheckbox = document.getElementById("tc");
    // Dispatch the registration action based on the selected role
    if (selectedRole === "poster") {
      // Dispatch the action for poster registration
      const userData = {
        name,
        email,
        password,
      };
      //console.log("is User", userData);
      dispatch(register(userData));
    } else if (selectedRole === "applicant") {
      // Dispatch the action for applicant registration
      const studentData = {
        name,
        email,
        password,
      };
      //console.log("is Student", studentData);
      dispatch(Sregister(studentData));
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
      <div className="w-full min-h-screen font-Poppins flex justify-center items-center">
        <h1 className="hiddenHSEO">Skillmint Register Page</h1>
        <h2 className="hiddenHSEO">
          Register as an Employer. Register as an Applicant
        </h2>
        <form
          onSubmit={onSubmit}
          className="mx-auto sm:max-w-[780px] p-8 pt-12 bg-black/5 rounded-[6px] w-full"
        >
          <h1 className="select-none bg-transparent font-Poppins leading-[1.4rem] uppercase tracking-tighter text-3xl font-extrabold hover:text-[#d0333c] ease-in-out duration-300 w-fit mx-auto ">
            Skill <br /> Mint
          </h1>
          <h1 className="text-[2.1em] font-Poppins mx-auto my-12 select-none w-fit">
            {selectedRole === "poster" ? "Employer" : " Applicant"} Register
          </h1>
          {/* ROLE SELECTION */}
          <div className="font-Poppins flex flex-col justify-center items-center mb-8 gap-2">
            <p className="h-8 rounded-md w-fit px-2 py-1 text-center font-bold text-black/75 select-none">
              Role
            </p>
            <div className="flex flex-row  items-center gap-2">
              {["poster", "applicant"].map((role) => (
                <label
                  key={role}
                  htmlFor={role}
                  className={`h-8 rounded-md w-fit px-2 py-1 cursor-pointer ${
                    selectedRole === role
                      ? "font-medium underline underline-offset-2"
                      : "opacity-70"
                  }`}
                >
                  <input
                    type="radio"
                    id={role}
                    name="role"
                    value={role}
                    className="radio radio-mark"
                    onChange={handleRoleChange}
                    checked={selectedRole === role}
                  />
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </label>
              ))}
            </div>
          </div>
          {[
            { label: "Full Name*", name: "name", type: "text" },
            {
              label: "Email Address*",
              name: "email",
              type: "email",
              autocomplete: "email",
            },
            {
              label: "Password*",
              name: "password",
              type: showPassword ? "text" : "password",
              autocomplete: "new-password",
            },
            {
              label: "Confirm Password*",
              name: "password2",
              type: showPassword2 ? "text" : "password",
              autocomplete: "new-password",
            },
          ].map((input, index) => (
            <div
              key={index}
              className="form-control max-w-[340px] mx-auto mt-3"
            >
              <label className="text-[15px] mb-1 select-none">
                {input.label}
              </label>
              <div className="relative inline-block">
                <input
                  type={input.type}
                  name={input.name}
                  /*                   value={
                    input.name === "password"
                      ? password
                      : input.name === "password2"
                      ? password2
                      : ""
                  } */ value={formData[input.name]}
                  placeholder={`Enter ${input.label.toLowerCase()}`}
                  onChange={onChange}
                  className="w-full text-black bg-white placeholder:text-black/40 text-[14px] py-4 pl-[12px] border rounded-[3px]"
                  required
                  autoComplete={input.autocomplete}
                />
              </div>
            </div>
          ))}
          {/* Password matching feedback */}
          {password !== "" && password2 !== "" && !passwordsMatch && (
            <div className="text-black text-[14px] mx-auto max-w-[340px] font-Poppins font-medium">
              <p>Passwords do not match</p>
            </div>
          )}

          {/* Password validation feedback */}
          {password !== "" && isPasswordValid(password).length > 0 && (
            <div className="relative mx-auto font-Poppins max-w-[340px]  font-medium">
              {isPasswordValid(password).map((message, index) => (
                <p key={index} className="text-black text-[14px] pb-[2px]">
                  {message}
                </p>
              ))}
            </div>
          )}
          <div className="form-control max-w-[340px] mx-auto my-6">
            <button className="text-lg font-Poppins tracking-wide bg-black text-white py-3 rounded-[3px] select-none">
              Register
            </button>
          </div>
          <div className="max-w-[340px] text-center mx-auto my-14">
            <Link
              to="/login"
              className="form-control mt-4 justify-center flex flex-row gap-1 items-baseline"
            >
              <h1 className="text-[15px] text-black font-Poppins">
                Already have an Account?{" "}
              </h1>
              <h1 className="text-[17px] text-black hover:text-[#d0333c] hover:underline hover:decoration-black font-medium font-Poppins">
                Login
              </h1>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;

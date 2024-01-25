import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { Slogin, Sreset } from "../features/students/studentSlice";
import Spinner from "../components/Misc/Spinner";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const [showPassword, setShowPassword] = useState(false);

  // Initialize state for selected role
  const [selectedRole, setSelectedRole] = useState("poster");

  // Function to handle role selection change
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      if (selectedRole === "poster") {
        // Dispatch the action for poster registration
        const userData = {
          email,
          password,
        };
        dispatch(login(userData));
      } else if (selectedRole === "applicant") {
        const studentData = {
          email,
          password,
        };
        dispatch(Slogin(studentData));
      }
    } catch (error) {
      toast.error(error.message);
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
    <div className="w-full min-h-screen font-Poppins flex justify-center items-center">
      <h1 className="hiddenHSEO">Skillmint Login Page</h1>
      <h2 className="hiddenHSEO">
        Login to Post Job Listings. Login To Start Applying to Jobs Roles
        Positions.
      </h2>
      <form
        onSubmit={onSubmit}
        className="mx-auto  sm:max-w-[780px] p-8 pt-12 bg-black/5 rounded-[6px] w-full"
      >
        <h1 className="bg-transparent font-Poppins leading-[1.4rem] uppercase tracking-tighter text-3xl font-extrabold hover:text-[#d0333c] ease-in-out duration-300 w-fit mx-auto ">
          Skill <br /> Mint
        </h1>
        <h1 className="text-[2.1em] font-Poppins mx-auto my-8 text-center w-full">
          Sign In
        </h1>
        {/* ROLE SELECTION */}
        <div className="font-Poppins flex flex-col justify-center items-center mb-8 gap-2">
          <p className="h-8 rounded-md w-fit px-2 py-1 text-center font-bold text-black/75 select-none">
            Role
          </p>
          <div className="flex flex-row items-center gap-4 justify-center">
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
        <div className="form-control max-w-[340px] mx-auto">
          <label className="text-[15px] mb-1">Email Address*</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            autoComplete="email"
            onChange={onChange}
            className="max-w-[340px] text-black bg-white placeholder:text-black/40 text-[14px] py-4 border rounded-[3px]"
            required
          />
        </div>
        <div className="form-control max-w-[340px] mx-auto mt-3">
          <label className="text-[15px] mb-1">Password*</label>
          <div className="relative inline-block">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder="Enter password"
              autoComplete="current-password"
              onChange={onChange}
              className="w-full text-black bg-white placeholder:text-black/40 text-[14px] py-4 border rounded-[3px]"
              required
            />
          </div>
        </div>
        <div className="form-control max-w-[340px] mx-auto my-6">
          <button className="text-lg font-Poppins tracking-wide bg-black text-white py-3 rounded-[3px]">
            Login
          </button>
        </div>
        <div className="max-w-[340px] text-center mx-auto my-12">
          <Link to="/password-reset" className="text-[17px]">
            Forgot password?
          </Link>
          <Link
            to="/register"
            className="form-control mt-4 justify-center flex flex-row gap-1 items-baseline"
          >
            <h1 className="text-[15px] text-black font-Poppins">
              Not registered?{" "}
            </h1>
            <h1 className="text-[17px] text-black hover:text-[#d0333c] hover:underline hover:decoration-black font-medium font-Poppins">
              Register now
            </h1>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
/*  */

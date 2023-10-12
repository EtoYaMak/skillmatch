import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { Slogin, Sreset } from "../features/students/studentSlice";
import Spinner from "../components/Spinner";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /*   const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { student, isLoading, isError, isSuccess, message } = useSelector((state) => state.students); */
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
    console.log(selectedRole);
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
    return <Spinner />;
  }

  return (
    <div className="loginPageMain w-2/3 mx-auto h-[75vh] my-5 font-Inter">
      <div className="hero  rounded-lg h-full px-4">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="sm:px-12 text-center lg:text-left text-white">
            <h1 className="text-5xl font-bold">Login</h1>
            <p className="py-6">
              Unlock Your Career Opportunities or Start Building Your Team
              Today!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-xl shadow-black/60 bg-[#1c1f21]">
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
                  onChange={onChange}
                  className="input input-bordered text-white"
                  required
                />
              </div>
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
                <label className="ForgotPassword">
                  <Link
                    to="/password-reset"
                    className="text-xs font-medium text-[#d0333c]/80 hover:text-[#d0333c] hover:underline "
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>

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
              <div className="form-control mt-6">
                <button
                  className="btn btn-ghost text-[#fff] bg-[#d0333c]/70 hover:bg-[#d0333c] hover:text-[#fff]
                  flex text-lg font-Inter tracking-wide"
                >
                  Login
                </button>
              </div>
              {/* LOGIN REDIRECT */}
              <Link
                to="/register"
                className="form-control mt-4 justify-center flex flex-row gap-1 items-baseline"
              >
                <h1 className="text-white">Not registered? </h1>
                <a href="" className="text-white">
                  Register now
                </a>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
/*  */

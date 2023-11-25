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
  /*   const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        emai: "test",
        password,
      };
      await dispatch(login(userData));
    } catch (error) {
      try {
        const studentData = {
          email,
          password,
        };
        // If login fails, try Slogin
        await dispatch(Slogin(studentData));
      } catch (secondError) {
        toast.error(secondError.message);
      }
      toast.error(error.message);
    }
  }; */

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
    <div className=" w-full font-Poppins">
      <div className=" translate-y-36 w-fit mx-auto">
        <form
          onSubmit={onSubmit}
          className="w-[780px] h-[540px] bg-black/5 rounded-[6px] p-8 pt-12"
        >
          <h1 className="bg-transparent font-Poppins leading-[1.4rem] uppercase tracking-tighter text-3xl font-extrabold hover:text-[#d0333c] ease-in-out duration-300 w-fit mx-auto ">
            Skill
            <br />
            Mint
          </h1>
          <h1 className="w-fit text-[2.1em] font-Poppins mx-auto my-12">
            Sign In
          </h1>
          <div className="form-control  max-w-[340px] mx-auto">
            <label className="text-[15px] mb-1">Email Address*</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              className="max-w-[340px] text-black bg-white placeholder:text-black/40 text-[14px] py-4 border border-black/40 rounded-[3px]"
              required
            />
          </div>
          <div className="form-control  max-w-[340px] mx-auto mt-3">
            <label className="text-[15px] mb-1">Password*</label>
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
          <div className="form-control  max-w-[340px] mx-auto my-6">
            <button className="text-lg font-Poppins tracking-wide bg-black text-white py-3 rounded-[3px]">
              Login
            </button>
          </div>
          <div className=" max-w-[340px] text-center mx-auto my-12">
            <Link to="/password-reset" className="text-[17px]">
              Forgot password?
            </Link>
            {/* ROLE SELECTION */}
            <div className="absolute right-3 top-3 font-Poppins">
              <div className="flex flex-row gap-2">
                <label
                  htmlFor="poster"
                  className={` h-8 rounded-md w-fit px-2 py-1 text-center ${
                    selectedRole === "poster"
                      ? "font-bold underline underline-offset-2"
                      : ""
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
                  className={`h-8 rounded-md w-fit px-2 py-1 ${
                    selectedRole === "applicant"
                      ? "font-bold underline underline-offset-2"
                      : ""
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
        <Link
          to="/register"
          className="form-control mt-4 justify-center flex flex-row gap-1 items-baseline"
        >
          <h1 className="text-black">Not registered? </h1>
          <a className="text-black hover:text-[#d0333c] hover:underline hover:decoration-black font-medium">
            Register now
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Login;
/*  */

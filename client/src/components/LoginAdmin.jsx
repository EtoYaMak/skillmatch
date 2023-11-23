import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SAlogin, SAreset } from "../features/SAuser/adminSlice";
import Spinner from "../components/Spinner";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function LoginAdmin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    SAuser,
    isLoading: SAuserIsLoading,
    isError: SAuserIsError,
    isSuccess: SAuserSuccess,
    message: SAuserMessage,
  } = useSelector((state) => state.SAuser);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (SAuserIsError) {
      toast.error(SAuserIsError, SAuserMessage);
    }

    if (SAuserSuccess || SAuser) {
      navigate("/adminDash");
    }

    if (SAuserSuccess) {
      dispatch(SAreset());
    }
  }, [SAuser, SAuserIsError, SAuserSuccess, SAuserMessage, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      // Dispatch the action for poster registration
      const SAuserData = {
        email,
        password,
      };
      dispatch(SAlogin(SAuserData));
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (SAuserIsLoading) {
    return <Spinner />;
  }

  return (
    <div className="loginPageMain w-2/3 mx-auto h-[75vh] my-5 font-Poppins">
      <div className="hero  rounded-lg h-full px-4">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="sm:px-12 text-center lg:text-left text-black py-4">
            <h1 className="text-5xl font-bold">ADMIN</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-xl shadow-black/60 bg-[#fff]">
            <form onSubmit={onSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[14px] text-black">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={onChange}
                  className="input input-bordered text-white bg-black placeholder:text-white/80
                focus:outline-none focus:ring-0 focus:border-0 selection:text-white focus:shadow-[2px_2px_5px_rgb(0,0,0,0.7)]"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[14px] text-black">
                    Password
                  </span>
                </label>
                <div className="flex flex-row items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={onChange}
                    className="input input-bordered text-white bg-black placeholder:text-white/80
                  focus:outline-none focus:ring-0 focus:border-0 selection:text-white focus:shadow-[2px_2px_5px_rgb(0,0,0,0.7)] w-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-password-button ml-2 text-black"
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
                    className="ml-1 text-sm font-medium text-[#d0333c]/80 hover:text-[#d0333c] hover:underline "
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>

              <div className="form-control mt-6">
                <button
                  className="btn btn-ghost text-[#fff] bg-[#000] hover:bg-[#d0333c] hover:text-[#fff]
                flex text-lg font-Poppins tracking-wide"
                >
                  Login
                </button>
              </div>
              {/* LOGIN REDIRECT */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
/*  */

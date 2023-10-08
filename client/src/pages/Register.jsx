import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
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

  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Redux State
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  //State Hooks
  const [isPrivacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Please check your email to activate your account");
      navigate("/");
    }
  }, [isSuccess, navigate]);
  //Funcs
  const isPasswordValid = (password) => {
    // Implement your password validation logic here
    // Example: Return true if the password meets your criteria
    return password.length >= 8; // Minimum length of 8 characters
  };
  const openPrivacyPolicy = () => {
    setPrivacyPolicyOpen(true);
  };

  const closePrivacyPolicy = () => {
    setPrivacyPolicyOpen(false);
  };

  //onChange form fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //Submit
  const privacyPolicyCheckbox = document.getElementById(
    "privacy-policy-checkbox"
  );
  /* 
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  }; */
  const onSubmit = (e) => {
    e.preventDefault();

    const privacyPolicyCheckbox = document.getElementById(
      "privacy-policy-checkbox"
    );

    if (privacyPolicyCheckbox.checked) {
      if (!passwordsMatch) {
        toast.error("Passwords do not match");
      } else if (!isPasswordValid(password)) {
        toast.error("Password does not meet validation criteria");
      } else {
        const userData = {
          name,
          email,
          password,
        };

        dispatch(register(userData));
      }
    } else {
      // Display a message to the user indicating that they need to accept the Privacy Policy.
      toast.error("Please accept the Privacy Policy before registering.");
    }
  };

  //
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="h-full">
        <PrivacyPolicyModal
          isOpen={isPrivacyPolicyOpen}
          onClose={closePrivacyPolicy}
        />
      </div>

      <div className="min-h-screen max-h-fit h-full w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-evenly items-center mt-10 gap-4  mx-auto max-w-[960px]">
          {/* Navigate through forms*/}
          <div
            className="max-w-1/4 w-3/4 md:w-1/2 h-[40vh] justify-center 
           rounded-3xl bg-gray-100 text-slate-500 text-2xl font-inter px-4 py-14 flex flex-col gap-2 select-none"
          >
            <p className="bg-inherit leading-tight tracking-wide">
              Want to Apply for Jobs?
            </p>
            <Link
              to="/registerS"
              className="text-3xl font-inter font-bold text-slate-800 hover:text-[#d0333c] mb-10"
            >
              Register to Start Applying
            </Link>
            <p className="bg-inherit text-right tracking-wide">
              Already have an Account?
            </p>
            <Link
              to="/loginS"
              className="text-3xl font-inter text-right font-bold text-slate-800 hover:text-[#d0333c]"
            >
              Login to Start Applying
            </Link>
          </div>

          <section className="my-10  rounded-md p-2">
            <p className="text-3xl flex gap-2 font-Inter font-light m-2 p-2 text-white bg-transparent">
              <FaUser className="bg-inherit" />
              Register to Start Posting
            </p>
            <form onSubmit={onSubmit} className="bg-transparent">
              <div className="form-group pb-2 grid bg-inherit">
                <label className="text-white text-2xl font-Inter p-2 bg-inherit">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control input bg-white/5 text-xl text-white focus:outline-none focus:shadow-outline focus:border-none focus:ring-[#d0333c] "
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter your name"
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group pb-2 grid bg-inherit">
                <label className="text-white text-2xl font-Inter p-2 bg-inherit">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control input bg-white/5 text-xl text-white focus:outline-none focus:shadow-outline focus:border-none focus:ring-[#d0333c]"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group pb-2 grid bg-inherit">
                <label className="text-white text-2xl font-Inter p-2 bg-inherit">
                  Password
                </label>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control input bg-white/5 text-xl text-white focus:outline-none focus:shadow-outline focus:border-none focus:ring-[#d0333c] flex-1"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={onChange}
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

              <div className="form-group pb-2 grid bg-inherit">
                <label className="text-white text-2xl font-Inter p-2 bg-inherit">
                  Confirm Password
                </label>
                <div className="flex items-center">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    //className="input bg-white/5 text-xl text-white focus:outline-none focus:shadow-outline focus:border-none focus:ring-[#d0333c] flex-1"
                    className={`form-control input  bg-white/5 text-xl text-white  ${
                      password !== "" && password2 !== "" && !passwordsMatch
                        ? "ring-[#d0333c]"
                        : "ring-green-500"
                    } flex-1`}
                    id="password2"
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
              </div>
              {/* Password matching feedback */}
              {password !== "" && password2 !== "" && !passwordsMatch && (
                <div className="password-mismatch-feedback text-white underline underline-offset-2 decoration-red-600">
                  Passwords do not match
                </div>
              )}

              {/* Password validation feedback */}
              {password !== "" && !isPasswordValid(password) && (
                <div className="password-validation-feedback text-white underline underline-offset-2 decoration-red-600">
                  Password does not meet validation criteria
                </div>
              )}
              {/* Priacy Policy Confirm */}
              <div className="flex flex-row">
                <label
                  for="privacy-policy-checkbox"
                  className="flex gap-1 flex-row items-center text-white"
                >
                  <input
                    type="checkbox"
                    id="privacy-policy-checkbox"
                    name="privacy-policy-checkbox"
                    className="checkbox checkbox-sm checkbox-success"
                  />
                  <p>I accept the</p>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openPrivacyPolicy();
                    }}
                    className="text-red-600 underline"
                  >
                    Privacy Policy
                  </a>
                  <p>and</p>
                  <a href="" target="_blank" className="text-red-600 underline">
                    Terms & Conditions
                  </a>
                </label>
              </div>
              {/* Register Button */}
              <div className="form-group w-max mx-auto bg-inherit my-2">
                <button
                  type="submit"
                  className="btn btn-outline text-[#000]/80 border-white/10 bg-white/80 hover:bg-[#d0333c] hover:border-[#d4d7d7] hover:text-[#d4d7d7]
                  flex mx-auto text-xl font-Inter tracking-widest w-[10em]"
                >
                  Register
                </button>
              </div>
              {/* Login?  */}
              <div className="flex flex-col justify-center items-center bg-inherit">
                <span className="mt-2 text-xl font-boldgap-2 bg-transparent text-white font-Inter pb-2">
                  Already have an account?
                </span>
                <Link to="/login" className="my-2">
                  <button
                    className="btn btn-outline text-[#fff]/80 border-[#d0333c]/10 hover:bg-[#fff]/90 hover:border-[#d0333c] hover:text-[#d0333c]
               flex mx-auto text-xl font-Inter tracking-widest w-[10em]"
                  >
                    Login
                  </button>
                </Link>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default Register;

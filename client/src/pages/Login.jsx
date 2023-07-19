import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="main max-h-screen mx-auto min-h-fit max-w-[1024px] flex justify-center items-center">
        <div className="flex flex-col md:flex-row gap-8 items-center mx-4 mt-12">
          {/* Navigate through forms*/}
          <div className="w-5/5 md:w-1/2 mt-10 md:mt-0 rounded-3xl bg-gray-100 text-slate-500 text-2xl font-inter p-6 flex flex-col gap-2 ">
            <p className="bg-inherit leading-tight tracking-wide">
              Want to Apply for Jobs?
            </p>
            <Link
              to="/registerS"
              className="text-3xl font-inter font-bold text-slate-800"
            >
              Register an Job Seeker Account.
            </Link>
            <p className="bg-inherit text-right tracking-wide">
              Already have one?
            </p>
            <Link
              to="/loginS"
              className="text-3xl font-inter font-bold text-slate-800"
            >
              Login to your Job Seeker Account.
            </Link>
          </div>

          <section className="w-4/5 md:w-1/2 ">
            <p className="text-3xl text-center flex flex-row items-center justify-center gap-2 font-Inter font-light m-2 p-2 text-white">
              <FaSignInAlt />
              Login as an Employer
            </p>
            <form onSubmit={onSubmit} className="w-full mx-auto">
              <div className="form-group pb-2 grid">
                <label className="text-white text-2xl font-Inter p-2">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control input bg-white/5 text-xl text-white"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter Email Address"
                  onChange={onChange}
                />
              </div>

              <div className="form-group pb-2 grid">
                <label className="text-white text-2xl font-Inter p-2">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control input bg-white/5 text-xl text-white"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={onChange}
                />
              </div>
              <div className="form-group w-max mx-auto m-2 flex flex-col">
                <button
                  type="submit"
                  className="btn btn-outline text-[#000]/80 border-white/10 bg-white/80 hover:bg-[#d0333c] hover:border-[#d4d7d7] hover:text-[#d4d7d7]
                  flex mx-auto text-xl font-Inter tracking-widest w-[10em]"
                >
                  Login
                </button>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <span className="mt-2 text-xl font-bold gap-2 bg-transparent text-white font-Inter">
                  Create a new account
                </span>
                <Link to="/register" className="bg-transparent mb-2">
                  <button
                    className="btn btn-outline text-[#fff]/80 border-[#d0333c]/10 hover:bg-[#fff]/90 hover:border-[#d0333c] hover:text-[#d0333c]
                   flex mx-auto text-xl font-Inter tracking-widest w-[10em]"
                  >
                    Register
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

export default Login;

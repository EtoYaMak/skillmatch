import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
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
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="main  h-full mx-auto w-[960px]">
        <div className="content ">
          <div className="container flex flex-row my-10 justify-evenly items-center h-full ">
            {/* Navigate through forms*/}
            <div className="rounded-3xl bg-gray-100 text-slate-500 text-2xl font-inter px-4 py-14 flex flex-col gap-2 select-none">
              <p className="bg-inherit leading-tight tracking-wide">
                Want to{" "}
                <span className="bg-inherit text-slate-700 font-medium font-Inter">
                  Apply
                </span>{" "}
                for Jobs?
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

            <section className="form  h-max w-max my-4">
              <p className="text-3xl flex flex-row items-center gap-2 font-Inter font-light m-2 p-2 w-fit">
                <FaUser />
                Create an Employer Account
              </p>
              <form onSubmit={onSubmit} className="w-2/3 mx-auto mb-2">
                <div className="form-group pb-2 grid">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter your name"
                    onChange={onChange}
                  />
                </div>

                <div className="form-group pb-2 grid">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={onChange}
                  />
                </div>

                <div className="form-group pb-2 grid">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={onChange}
                  />
                </div>

                <div className="form-group pb-2 grid">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password2"
                    name="password2"
                    value={password2}
                    placeholder="Confirm password"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group w-max mx-auto">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-500 text-white text-xl  font-Inter font-medium uppercase tracking-widest hover:text-white hover:bg-gray-900 rounded-lg transition ease-in-out delay-50"
                  >
                    Register
                  </button>
                </div>
                <span className="flex flex-col justify-between items-center py-2">
                  Already have an account?
                  <Link
                    to="/login"
                    className="font-semibold text-lg hover:text-blue-500 mb-2"
                  >
                    Login Here!
                  </Link>
                </span>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Slogin, Sreset } from "../features/students/studentSlice";
import Spinner from "../components/Spinner";

function StudentLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { student, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || student) {
      navigate("/");
    }

    dispatch(Sreset());
  }, [student, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const studentData = {
      email,
      password,
    };

    dispatch(Slogin(studentData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="main h-full mx-auto w-[960px] ">
        <div className="content ">
          <div className="container flex flex-row min-w-[] my-10 justify-around items-center h-full ">
            {/* Navigate through forms*/}
            <div className="rounded-3xl bg-gray-100 text-slate-500 text-2xl font-inter px-4 py-14 flex flex-col gap-2">
              <p className="bg-inherit leading-tight tracking-wide">
                Want to Post Jobs?
              </p>
              <Link
                to="/register"
                className="text-3xl font-inter font-bold text-slate-800"
              >
                Register an Job Poster Account.
              </Link>
              <p className="bg-inherit text-right tracking-wide">
                Already have one?
              </p>
              <Link
                to="/login"
                className="text-3xl font-inter font-bold text-slate-800"
              >
                Login to your Job Poster Account.
              </Link>
            </div>

            <section className="form  h-max min-w-[424px] my-4 flex flex-col justify-center items-center">
              <p className="text-3xl text- flex flex-row items-center justify-center gap-2 font-Inter font-light m-2 p-2 w-fit">
                <FaSignInAlt />
                Login to Start Applying
              </p>
              <form onSubmit={onSubmit} className=" w-2/3 mx-auto">
                <div className="form-group pb-2 grid">
                  <label className="text-gray-700 text-xl font-mono">
                    Email
                  </label>
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
                  <label className="text-gray-700 text-xl font-mono">
                    Password
                  </label>
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
                <div className="form-group w-max mx-auto m-2 flex flex-col">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-500 text-white text-xl  font-Inter font-medium uppercase tracking-widest hover:text-white hover:bg-gray-900 rounded-lg transition ease-in-out delay-50"
                  >
                    Login
                  </button>
                </div>
                <span className="flex flex-col justify-between items-center">
                  Create a new account
                  <Link
                    to="/registerS"
                    className="font-semibold hover:text-blue-500"
                  >
                    Register Here!
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

export default StudentLogin;

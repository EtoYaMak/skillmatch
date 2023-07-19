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
      <div className="min-h-screen max-h-fit h-full w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-evenly items-center mt-10 gap-4  mx-auto max-w-[960px]">
          {/* Navigate through forms*/}
          <div
            className="max-w-1/4 w-3/4 md:w-1/2 h-[40vh] justify-center rounded-3xl
            bg-[#000]/70 text-[#aba6a6]  text-2xl font-inter px-4 py-14 flex flex-col select-none"
          >
            <p className="leading-tight tracking-wide bg-transparent">
              Job Seeker Register
            </p>
            <Link
              to="/register"
              className="text-3xl font-inter font-bold text-[#d4d7d7] mb-10 bg-transparent hover:text-[#d0333c]"
            >
              Employer Register
            </Link>
            <p className="text-right tracking-wide bg-transparent">
              Login to Start Posting Jobs
            </p>
            <Link
              to="/login"
              className="text-3xl font-inter text-right font-bold text-[#d4d7d7] bg-transparent hover:text-[#d0333c]"
            >
              Employer Login
            </Link>
          </div>

          <section className="my-10  rounded-md p-2 ">
            <p className="text-3xl flex gap-2 font-Inter font-light m-2 p-2 text-white bg-transparent">
              <FaSignInAlt />
              Job Seeker Login
            </p>
            <form onSubmit={onSubmit} className="bg-transparent">
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
                <Link to="/registerS" className="bg-transparent mb-2">
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

export default StudentLogin;

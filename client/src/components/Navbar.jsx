import React, { useRef, useState, useEffect } from "react";
import { GrMenu, GrBottomCorner, GrCaretDown } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Slogout, Sreset } from "../features/students/studentSlice";

const Navbar = () => {
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { student } = useSelector((state) => state.students);

  const [toggle, setToggle] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const onSLogout = () => {
    dispatch(Slogout());
    dispatch(Sreset());
    navigate("/");
  };
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div className="flex justify-evenly items-center h-24  px-4 mx-auto relative z-50 bg-zinc-800">
      <h1 className="w-max text-3xl font-bold text-white  border-gray-500 bg-transparent">
        <Link to="/">SKILLMINT.</Link>
      </h1>

      <ul className="gap-0 hidden md:flex bg-transparent justify-center items-center">
        <li className=" text-white text-xl text-center  bg-inherit ">
          <Link
            to="/"
            className=" hover:bg-zinc-700 p-9 hover:font-semibold hover:text-sky-600"
          >
            Home
          </Link>
        </li>
        <li className="text-white text-xl text-center  bg-inherit">
          <Link
            to="/browse"
            className="hover:bg-zinc-700 p-9 hover:font-semibold hover:text-sky-600"
          >
            Browse
          </Link>
        </li>
        <li className="text-white text-xl text-center  bg-inherit">
          <Link
            to="/post"
            className="hover:bg-zinc-700 p-9 hover:font-semibold hover:text-sky-600"
          >
            Post
          </Link>
        </li>
        <li className="text-white text-xl text-center  bg-inherit">
          <Link
            to="/contact"
            className="hover:bg-zinc-700 p-9 hover:font-semibold hover:text-sky-600"
          >
            Contact
          </Link>
        </li>
        {user || student ? (
          <li
            className="text-white text-xl text-center  bg-inherit"
            ref={dropdownRef}
          >
            <button
              className="flex justify-center items-center hover:bg-zinc-700 p-9 mb-2 hover:font-semibold text-white hover:text-sky-600 "
              onClick={() => setIsOpen(!isOpen)}
            >
              Profile
              <svg
                className="w-4 h-4 ml-2 bg-transparent fill-white stroke-none "
                viewBox="0 0 24 24"
              >
                <path d="M22 8 12 20 2 8z" className="bg-inherit" />
              </svg>
            </button>
            {isOpen && (
              <ul className="absolute bg-zinc-700 rounded-lg my-1">
                <li className="dashboard py-4 text-xl text-center font-normal text-white bg-inherit border-b-2 border-zinc-600 hover:bg-zinc-800 rounded-md">
                  <Link
                    to={user ? "/dash" : "/studentDash"}
                    className=" hover:font-semibold rounded hover:text-zinc-50 px-5 py-4"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="bg-inherit hover:bg-zinc-800 rounded-md">
                  <button
                    className="logout text-xl text-center hover:font-semibold hover:text-zinc-50 text-white bg-inherit rounded-lg  py-4  w-[124px]"
                    onClick={() => {
                      if (user) {
                        onLogout();
                      } else if (student) {
                        onSLogout();
                      }
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        ) : (
          <li className="text-white text-xl text-center  bg-inherit">
            <Link
              to="/login"
              className="hover:bg-zinc-700 p-9 hover:font-semibold hover:text-sky-600"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
      <div
        onClick={handleToggle}
        ref={dropdownRef2}
        className="block p-3 md:hidden bg-zinc-400 rounded-full"
      >
        {toggle ? (
          <GrBottomCorner size={25} className=" bg-inherit " />
        ) : (
          <GrMenu size={25} className="bg-inherit " />
        )}
      </div>
      {/* SM NAVBAR */}
      <div
        className={
          toggle
            ? "md:hidden fixed left-0 top-0 min-w-[60%] bg-zinc-800 border-r border-r-zinc-900 ease-in-out duration-200"
            : "ease-in-out duration-500 fixed left-[-100%] top-0"
        }
      >
        <h1 className=" select-none cursor-auto h-24 flex flex-col justify-center text-center w-full text-3xl font-bold text-white hover:text-sky-600 bg-zinc-800 border-b border-b-zinc-900">
          SKILLMINT.
        </h1>

        <ul className="uppercase bg-zinc-800 text-zinc-300 text-lg  text-center font-semibold">
          <li className="border-b border-b-zinc-900 ">
            <div className="nav-link  flex items-center bg-zinc-700 hover:bg-zinc-800">
              <Link
                to="/"
                className="flex-1 py-4 hover:text-gray-50 hover:font-extrabold"
              >
                Home
              </Link>
            </div>
          </li>
          <li className="border-b border-b-zinc-900">
            <div className="nav-link flex items-center bg-zinc-700 hover:bg-zinc-800">
              <Link
                to="/browse"
                className="flex-1 py-4 hover:text-gray-50 hover:font-extrabold"
              >
                Browse Jobs
              </Link>
            </div>
          </li>
          <li className="border-b border-b-zinc-900">
            <div className="nav-link flex items-center bg-zinc-700 hover:bg-zinc-800">
              <Link
                to="/post"
                className="flex-1 py-4 hover:text-gray-50 hover:font-extrabold"
              >
                Post A Job
              </Link>
            </div>
          </li>
          <li className="border-b border-b-zinc-900">
            <div className="nav-link flex items-center bg-zinc-700 hover:bg-zinc-800">
              <Link
                to="/contact"
                className="flex-1 py-4 hover:text-gray-50 hover:font-extrabold"
              >
                Contact
              </Link>
            </div>
          </li>
          {user || student ? (
            <ul className="bg-inherit">
              <li className="border-b border-b-zinc-900">
                <div className="nav-link flex items-center bg-zinc-700 hover:bg-zinc-800">
                  <Link
                    to="/dash"
                    className="flex-1 py-4 hover:text-gray-50 hover:font-extrabold"
                  >
                    Dashboard
                  </Link>
                </div>
              </li>
              <li className="border-b border-b-zinc-900">
                <div className="nav-link flex items-center justify-center bg-zinc-700 hover:bg-zinc-800">
                  <button
                    className="text-lg font-bold uppercase w-full py-4 hover:text-gray-50 hover:font-extrabold"
                    onClick={() => {
                      if (user) {
                        onLogout();
                      } else if (student) {
                        onSLogout();
                      }
                    }}
                  >
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          ) : (
            <li className="border-b border-b-zinc-900">
              <div className="nav-link flex items-center justify-center bg-zinc-700 hover:bg-zinc-800">
                <Link
                  to="/login"
                  className="flex-1 py-4 hover:text-gray-50 hover:font-extrabold"
                >
                  Login
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

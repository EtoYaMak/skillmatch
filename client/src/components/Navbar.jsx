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
    <div className="flex justify-evenly items-center h-24  px-4 mx-auto relative z-50 bg-[#ee6555]">
      <h1 className="w-max text-3xl font-bold text-white  bg-transparent">
        <Link to="/" className="hover:text-inherit">
          SKILLMINT.
        </Link>
      </h1>

      <ul className="uppercase gap-0 hidden md:flex bg-transparent justify-center items-center">
        <li className=" text-white text-xl text-center  bg-inherit ">
          <Link
            to="/"
            className="p-9  hover:text-[#161f30] hover:underline underline-offset-2"
          >
            Home
          </Link>
        </li>
        <li className="text-white text-xl text-center  bg-inherit">
          <Link
            to="/browse"
            className="p-9  hover:text-[#161f30] hover:underline underline-offset-2"
          >
            Browse
          </Link>
        </li>
        <li className="text-white text-xl text-center  bg-inherit">
          <Link
            to="/post"
            className=" p-9  hover:text-[#161f30] hover:underline underline-offset-2"
          >
            Post
          </Link>
        </li>
        <li className="text-white text-xl text-center  bg-inherit">
          <Link
            to="/contact"
            className=" p-9  hover:text-[#161f30] hover:underline underline-offset-2"
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
              className="flex uppercase justify-center items-center  p-9   text-white hover:text-[#161f30] hover:underline underline-offset-2 "
              onClick={() => setIsOpen(!isOpen)}
            >
              Profile
              <svg
                className="w-4 h-4 ml-2 bg-transparent fill-white stroke-white "
                viewBox="0 0 24 24"
              >
                <path d="M22 8 12 20 2 8z" className="bg-inherit " />
              </svg>
            </button>
            {isOpen && (
              <ul className="ease-in-out duration-200 absolute rounded-lg my-1 space-y-2 bg-black/80 backdrop-blur-lg p-2">
                <li className="dashboard py-4 text-xl text-center font-normal text-white bg-[#ee6555] rounded-md">
                  <Link
                    to={user ? "/dash" : "/studentDash"}
                    className="  rounded hover:text-zinc-50 px-5 py-4"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="bg-inherit  rounded-md">
                  <button
                    className="logout  uppercase text-xl text-center  hover:text-zinc-50 text-white bg-[#ee6555] rounded-lg  py-4  w-full"
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
              className="hover:bg-zinc-700 p-9 hover:font-semibold "
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
        <Link to="/">
          <h1 className="cursor-pointer h-24 flex flex-col justify-center text-center w-full text-3xl font-bold text-white hover:text-white bg-[#ee6555] border-b border-b-zinc-900">
            SKILLMINT.
          </h1>
        </Link>

        <ul className="uppercase  text-zinc-300 text-lg  text-center font-semibold">
          <li className="border-b border-b-zinc-900">
            <div className="nav-link  flex items-center bg-[#0e0f01] hover:bg-zinc-800">
              <Link
                to="/"
                className="flex-1 py-4 hover:text-[#f3900b] hover:font-extrabold"
              >
                Home
              </Link>
            </div>
          </li>
          <li className="border-b border-b-zinc-900">
            <div className="nav-link flex items-center bg-[#0e0f01] hover:bg-zinc-800">
              <Link
                to="/browse"
                className="flex-1 py-4 hover:text-[#f3900b] hover:font-extrabold"
              >
                Browse Jobs
              </Link>
            </div>
          </li>
          <li className="border-b border-b-zinc-900">
            <div className="nav-link flex items-center bg-[#0e0f01] hover:bg-zinc-800">
              <Link
                to="/post"
                className="flex-1 py-4 hover:text-[#f3900b] hover:font-extrabold"
              >
                Post A Job
              </Link>
            </div>
          </li>
          <li className="border-b border-b-zinc-900">
            <div className="nav-link flex items-center bg-[#0e0f01] hover:bg-zinc-800">
              <Link
                to="/contact"
                className="flex-1 py-4 hover:text-[#f3900b] hover:font-extrabold"
              >
                Contact
              </Link>
            </div>
          </li>
          {user || student ? (
            <ul className="bg-inherit">
              <li className="border-b border-b-zinc-900">
                <div className="nav-link flex items-center bg-[#0e0f01] hover:bg-zinc-800">
                  <Link
                    to="/dash"
                    className="flex-1 py-4 hover:text-[#f3900b]  hover:font-extrabold"
                  >
                    Dashboard
                  </Link>
                </div>
              </li>
              <li className="border-b border-b-zinc-900">
                <div className="nav-link flex items-center justify-center bg-[#0e0f01] hover:bg-zinc-800">
                  <button
                    className="text-lg font-bold uppercase w-full py-4 hover:text-[#f3900b] hover:font-extrabold"
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
              <div className="nav-link flex items-center justify-center bg-[#0e0f01] hover:bg-zinc-800">
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

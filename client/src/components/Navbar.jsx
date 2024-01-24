import React, { useRef, useState, useEffect } from "react";
import { RiMenu5Fill, RiArrowDownDoubleFill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { SAlogout, SAreset } from "../features/SAuser/adminSlice";
import { Slogout, Sreset } from "../features/students/studentSlice";
import { reset as profileReset } from "../features/profiles/profileSlice";
import { reset as accountsReset } from "../features/accounts/accountSlice";

const Navbar = () => {
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { student } = useSelector((state) => state.students);
  const { SAuser } = useSelector((state) => state.SAuser);

  const [toggle, setToggle] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleOptionClick = () => {
    setIsOpen(false);
  };
  const onSLogout = async () => {
    await dispatch(Slogout());
    dispatch(Sreset());
    dispatch(profileReset());
    dispatch(accountsReset());
    navigate("/");
  };
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    //additional resets
    //dispatch(profileReset());
    //dispatch(accountsReset());
    navigate("/");
  };
  const onSALogout = () => {
    dispatch(SAlogout());
    dispatch(SAreset());
    //additional resets
    dispatch(profileReset());
    dispatch(accountsReset());
    navigate("/");
  };
  const handleClick = () => {
    if (user) {
      navigate("/Dash");
    } else if (student) {
      navigate("/DashboardS");
    } else if (SAuser) {
      navigate("/adminDash");
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    function handleClickOutsideHam(event) {
      const toggleNav = document.getElementById("toggle-nav");
      const nav = document.getElementById("nav");
      if (
        toggleNav &&
        !toggleNav.contains(event.target) &&
        nav &&
        !nav.contains(event.target)
      ) {
        setToggle(false);
      }
    }

    document.addEventListener("click", handleClickOutsideHam);

    return () => {
      document.removeEventListener("click", handleClickOutsideHam);
    };
  }, []);

  return (
    <div className="relative flex justify-around items-center h-24  px-4 mx-auto z-50 bg-[#fff]   select-none ">
      <h1 className="w-max text-[#000] bg-transparent">
        <Link
          to="/"
          className="bg-transparent font-Poppins leading-6 tracking-tighter text-4xl font-extrabold hover:text-[#d0333c] ease-in-out duration-500 "
        >
          SKILL
          <br />
          MINT
        </Link>
        {SAuser ? <span>ADMIN</span> : null}
      </h1>

      <ul className="uppercase gap-0 hidden md:flex bg-transparent justify-center items-center select-none">
        <li className=" text-[#000] font-Poppins  font-medium tracking-widest text-xl text-center  bg-inherit">
          <Link
            to="/"
            className="py-9 px-4  hover:text-[#d0333c] ease-in-out duration-300"
          >
            Home
          </Link>
        </li>
        <li className="text-[#000] font-Poppins  font-medium tracking-widest text-xl text-center  bg-inherit hidden">
          <Link
            to="/browse"
            className="py-9 px-4  hover:text-[#d0333c] ease-in-out duration-300"
          >
            Browse
          </Link>
        </li>
        {!student ? (
          <li className="text-[#000] font-Poppins  font-medium tracking-widest text-xl text-center  bg-inherit">
            <Link
              to="/post"
              className=" py-9 px-4  hover:text-[#d0333c] ease-in-out duration-300 "
            >
              Post
            </Link>
          </li>
        ) : null}

        <li className="text-[#000] font-Poppins  font-medium tracking-widest text-xl text-center  bg-inherit">
          <Link
            to="/contact"
            className=" py-9 px-4  hover:text-[#d0333c] ease-in-out duration-300"
          >
            Contact
          </Link>
        </li>
        {user || student || SAuser ? (
          <li
            className="text-[#000] font-Poppins  font-medium  text-center  bg-inherit active:font-bold "
            ref={dropdownRef}
          >
            <button
              className="flex uppercase justify-center items-center text-xl  py-9 px-4 
               text-[#000] hover:text-[#d0333c] tracking-widest  ease-in-out duration-300 font-Poppins "
              onClick={() => setIsOpen(!isOpen)}
            >
              Profile{" "}
              <RiArrowDownDoubleFill
                size={24}
                className="mb-1 bg-transparent"
              />
            </button>
            {isOpen && (
              <ul
                className="ease-in-out duration-700  absolute 
              rounded-3xl my-1 space-y-0 bg-[#1c1f21]/25  backdrop-blur-lg p-2 w-44 font-Poppins"
              >
                <li className="rounded-md h-fit bg-transparent">
                  <button
                    className="text-lg font-Poppins  uppercase w-full py-4 bg-transparent hover:text-[#d0333c] ease-in-out duration-300 "
                    onClick={() => {
                      setIsOpen(false);
                      handleClick();
                    }}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="bg-transparent rounded-md h-fit">
                  <button
                    className="text-lg font-Poppins  uppercase w-full py-4  hover:text-[#d0333c] ease-in-out duration-300 "
                    onClick={() => {
                      setIsOpen(false);
                      if (user) {
                        onLogout();
                      } else if (student) {
                        onSLogout();
                      } else if (SAuser) {
                        onSALogout();
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
          <li className="text-[#000] font-medium text-xl text-center  bg-inherit">
            <Link
              to="/login"
              className="py-9 px-4 font-Poppins  hover:text-[#d0333c] ease-in-out duration-300 "
            >
              Login
            </Link>
          </li>
        )}
      </ul>
      <div
        id="toggle-nav"
        className="block p-3 md:hidden bg-[#fff] rounded-full cursor-pointer"
        onClick={handleToggle}
      >
        {toggle ? (
          <RiMenu5Fill size={28} className=" bg-inherit pointer-events-none" />
        ) : (
          <RxHamburgerMenu
            size={28}
            className="bg-inherit pointer-events-none  "
          />
        )}
      </div>
      {/* SM NAVBAR */}
      <div
        className={
          toggle
            ? "md:hidden absolute left-0 top-0 min-w-[65%]  ease-in-out duration-700 bg-transparent  "
            : "ease-out duration-100 fixed left-[-200%] top-0"
        }
      >
        <Link to="/" className="">
          <h1
            className="cursor-pointer h-24 flex flex-col justify-center 
          text-center w-full text-5xl font-bold text-[#000] hover:text-white  bg-transparent         
           "
          ></h1>
        </Link>

        <ul
          className="uppercase  text-[#000] text-lg  text-center font-semibold 
           border-t border-[#000]/10  hover:bg-[#1c1f21]/0 space-y-0 "
          id="nav"
        >
          <li className=" backdrop-blur-sm bg-[#fff]/70 h-full">
            <div className="nav-link flex items-center h-full bg-[#fff]/80 hover:bg-[#000]/70 ease-in-out duration-300">
              <Link
                to="/"
                onClick={() => setToggle(false)}
                className="flex-1 flex justify-center items-center py-4 hover:text-[#fff] hover:font-extrabold ease-in-out duration-300"
              >
                Home
              </Link>
            </div>
          </li>
          <li className="backdrop-blur-sm bg-[#fff]/70 hidden">
            <div className="nav-link flex items-center  bg-[#fff]/80 hover:bg-[#000]/70 ease-in-out duration-300 ">
              <Link
                to="/browse"
                onClick={() => setToggle(false)}
                className="flex-1 py-4 hover:text-[#fff] hover:font-extrabold ease-in-out duration-300 "
              >
                Browse Jobs
              </Link>
            </div>
          </li>
          {!student ? (
            <li className=" backdrop-blur-sm bg-[#fff]/70">
              <div className="nav-link flex items-center  bg-[#fff]/80 hover:bg-[#000]/70 ease-in-out duration-300">
                <Link
                  to="/post"
                  onClick={() => setToggle(false)}
                  className="flex-1 py-4 hover:text-[#fff] hover:font-extrabold ease-in-out duration-300"
                >
                  Post
                </Link>
              </div>
            </li>
          ) : null}

          <li className=" backdrop-blur-sm bg-[#fff]/70">
            <div className="nav-link flex items-center bg-[#fff]/80 hover:bg-[#000]/70 ease-in-out duration-300">
              <Link
                to="/contact"
                onClick={() => setToggle(false)}
                className="flex-1 py-4 hover:text-[#fff] hover:font-extrabold ease-in-out duration-300"
              >
                Contact
              </Link>
            </div>
          </li>
          {user || student || SAuser ? (
            <ul className="bg-inherit font-Poppins ">
              <li className="backdrop-blur-sm bg-[#fff]/70">
                <div className="nav-link flex items-center bg-[#fff]/80 hover:bg-[#000]/70 ease-in-out duration-300">
                  <button
                    onClick={() => {
                      handleClick();
                      setToggle(false);
                    }}
                    className="flex-1 py-4 hover:text-[#fff]  ease-in-out duration-300 uppercase"
                  >
                    Dashboard
                  </button>
                </div>
              </li>
              <li className=" backdrop-blur-sm bg-[#fff]/80 rounded-br-lg ">
                <div className="nav-link flex items-center justify-center bg-[#fff]/80 hover:bg-[#000]/70 rounded-br-lg ease-in-out duration-300">
                  <button
                    className="text-lg  uppercase w-full py-4 hover:text-[#fff] hover:font-semibold ease-in-out duration-300"
                    onClick={() => {
                      if (user) {
                        onLogout();
                        setToggle(false);
                      } else if (student) {
                        onSLogout();
                        setToggle(false);
                      } else if (SAuser) {
                        onSALogout();
                        setToggle(false);
                      }
                    }}
                  >
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          ) : (
            <li className="backdrop-blur-sm bg-[#fff]/70 rounded-br-lg">
              <div className="nav-link flex items-center justify-center bg-[#fff]/80 hover:hover:bg-[#000]/70 rounded-br-lg">
                <Link
                  to="/login"
                  onClick={() => setToggle(false)}
                  className="flex-1 py-4  hover:text-[#fff] hover:font-extrabold rounded-br-lg "
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

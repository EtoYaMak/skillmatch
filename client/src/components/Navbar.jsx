import React, { useRef, useState, useEffect } from "react";
import { RiMenu5Fill, RiArrowDownDoubleFill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Slogout, Sreset } from "../features/students/studentSlice";

const Navbar = () => {
  const dropdownRef = useRef(null);

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
  const handleClick = () => {
    if (user) {
      navigate("/dash");
    } else {
      navigate("/studentDash");
    }
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
    <div className="relative flex justify-evenly items-center h-24  px-4 mx-auto z-50 bg-[#2c3033] shadow-[0px_0px_2px_1px_#d0333c] select-none ">
      <h1 className="w-max text-5xl font-bold text-[#d4d7d7] bg-transparent">
        <Link to="/" className=" hover:text-[#d0333c] ">
          SKILLMINT.
        </Link>
      </h1>

      <ul className="uppercase gap-0 hidden md:flex bg-transparent justify-center items-center">
        <li className=" text-[#d4d7d7] font-bold tracking-widest text-xl text-center  bg-inherit ">
          <Link to="/" className="py-9 px-4  hover:text-[#d0333c] ">
            Home
          </Link>
        </li>
        <li className="text-[#d4d7d7] font-bold tracking-widest text-xl text-center  bg-inherit">
          <Link to="/browse" className="py-9 px-4  hover:text-[#d0333c] ">
            Browse
          </Link>
        </li>
        <li className="text-[#d4d7d7] font-bold tracking-widest text-xl text-center  bg-inherit">
          <Link to="/post" className=" py-9 px-4  hover:text-[#d0333c] ">
            Post
          </Link>
        </li>
        <li className="text-[#d4d7d7] font-bold tracking-widest text-xl text-center  bg-inherit">
          <Link to="/contact" className=" py-9 px-4  hover:text-[#d0333c]">
            Contact
          </Link>
        </li>
        {user || student ? (
          <li
            className="text-[#d4d7d7] font-bold  text-center  bg-inherit "
            ref={dropdownRef}
          >
            <button
              className="flex uppercase justify-center items-center text-xl  py-9 px-4 
               text-[#d4d7d7] font-bold hover:text-[#d0333c] tracking-widest "
              onClick={() => setIsOpen(!isOpen)}
            >
              Profile <RiArrowDownDoubleFill size={24} className="mb-1" />
            </button>
            {isOpen && (
              <ul
                className="ease-in-out duration-200 absolute 
              rounded-lg my-1 space-y-0 bg-[#1c1f21]/80 hover:bg-[#000]/70 backdrop-blur-lg p-2 w-44"
              >
                <li className="rounded-md h-fit bg-transparent">
                  <button
                    className="text-lg font-bold uppercase w-full py-4 bg-transparent hover:text-[#d0333c] "
                    onClick={handleClick}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="bg-transparent rounded-md h-fit">
                  <button
                    className="text-lg font-bold uppercase w-full py-4  hover:text-[#d0333c] "
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
          <li className="text-[#d4d7d7] font-bold text-xl text-center  bg-inherit">
            <Link to="/login" className="py-9 px-4  hover:text-[#d0333c]  ">
              Login
            </Link>
          </li>
        )}
      </ul>
      <div
        id="toggle-nav"
        className="block p-3 md:hidden bg-[#d4d7d7] rounded-full cursor-pointer"
        onClick={handleToggle}
      >
        {toggle ? (
          <RiMenu5Fill size={25} className=" bg-inherit pointer-events-none" />
        ) : (
          <RxHamburgerMenu
            size={25}
            className="bg-inherit pointer-events-none  "
          />
        )}
      </div>
      {/* SM NAVBAR */}
      <div
        className={
          toggle
            ? "md:hidden fixed left-0 top-0 min-w-[65%] ease-in-out duration-200 bg-transparent "
            : "ease-in-out duration-500 fixed left-[-100%] top-0"
        }
      >
        <Link to="/" className="">
          <h1
            className="cursor-pointer h-24 flex flex-col justify-center 
          text-center w-full text-5xl font-bold text-white hover:text-white          
           "
          >
            SKILLMINT.
          </h1>
        </Link>

        <ul
          className="uppercase  text-zinc-300 text-lg  text-center font-semibold
           border-t border-[#d0333c] bg-transparent "
          id="nav"
        >
          <li className=" backdrop-blur-sm bg-[#000]/70 ">
            <div className="nav-link  flex items-center bg-[#1c1f21]/80 hover:bg-[#000]/70">
              <Link
                to="/"
                onClick={() => setToggle(false)}
                className="flex-1 py-4 hover:text-[#d0333c] hover:font-extrabold"
              >
                Home
              </Link>
            </div>
          </li>
          <li className="backdrop-blur-sm bg-[#000]/70">
            <div className="nav-link flex items-center  bg-[#1c1f21]/80 hover:bg-[#000]/70">
              <Link
                to="/browse"
                onClick={() => setToggle(false)}
                className="flex-1 py-4 hover:text-[#d0333c] hover:font-extrabold"
              >
                Browse Jobs
              </Link>
            </div>
          </li>
          <li className=" backdrop-blur-sm bg-[#000]/70">
            <div className="nav-link flex items-center  bg-[#1c1f21]/80 hover:bg-[#000]/70">
              <Link
                to="/post"
                onClick={() => setToggle(false)}
                className="flex-1 py-4 hover:text-[#d0333c] hover:font-extrabold"
              >
                Post
              </Link>
            </div>
          </li>
          <li className=" backdrop-blur-sm bg-[#000]/70">
            <div className="nav-link flex items-center bg-[#1c1f21]/80 hover:bg-[#000]/70">
              <Link
                to="/contact"
                onClick={() => setToggle(false)}
                className="flex-1 py-4 hover:text-[#d0333c] hover:font-extrabold"
              >
                Contact
              </Link>
            </div>
          </li>
          {user || student ? (
            <ul className="bg-inherit ">
              <li className="backdrop-blur-sm bg-[#000]/70">
                <div className="nav-link flex items-center bg-[#1c1f21]/80 hover:bg-[#000]/70">
                  <Link
                    to="/dash"
                    onClick={() => setToggle(false)}
                    className="flex-1 py-4 hover:text-[#d0333c]  hover:font-extrabold"
                  >
                    Dashboard
                  </Link>
                </div>
              </li>
              <li className=" backdrop-blur-sm bg-[#000]/70 ">
                <div className="nav-link flex items-center justify-center bg-[#1c1f21]/80 hover:bg-[#000]/70">
                  <button
                    className="text-lg font-bold uppercase w-full py-4 hover:text-[#d0333c] hover:font-extrabold"
                    onClick={() => {
                      if (user) {
                        onLogout();
                        setToggle(false);
                      } else if (student) {
                        onSLogout();
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
            <li className="backdrop-blur-sm bg-[#000]/70  hover:bg-[#000]/70 rounded-br-lg">
              <div className="nav-link flex items-center justify-center bg-[#1c1f21]/80 hover:hover:bg-[#000]/70 rounded-br-lg">
                <Link
                  to="/login"
                  onClick={() => setToggle(false)}
                  className="flex-1 py-4  hover:text-[#d0333c] hover:font-extrabold"
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

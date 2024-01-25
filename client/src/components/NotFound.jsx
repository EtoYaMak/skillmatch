import React from "react";
import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

function NotFound() {
  return (
    <div className="min-h-[35vh] w-full flex flex-col justify-evenly items-center">
      <TbError404 size={70} />
      <h1 className="sm:text-[4rem] text-[2rem] text-black/70 flex flex-col justify-center items-center">
        404 - Not Found!
      </h1>
      <Link
        to="/"
        className=" uppercase p-4 text-center rounded-sm font-medium text-lg bg-red-600 text-white hover:bg-black hover:text-white font-Poppins duration-300 ease-in-out"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;

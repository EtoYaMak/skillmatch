import React from "react";
import { TbLock } from "react-icons/tb";
import { Link } from "react-router-dom";

function NotAuthorized() {
  return (
    <div className="min-h-[35vh] w-full flex flex-col justify-evenly items-center">
      <TbLock size={70} />
      <h1 className="sm:text-[4rem] text-[2rem] text-black/70 flex flex-col justify-center items-center">
        401 - Not Authorized!
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

export default NotAuthorized;

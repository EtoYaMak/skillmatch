import React from "react";
import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <div className="min-h-screen max-w-5xl flex flex-col items-center mx-auto gap-24">
      <span className=" h-fit mt-10">
        <h1 className="font-Poppins font-semibold text-[2rem] sm:text-[2.4rem]">
          Payment Success
        </h1>
      </span>
      <span className="flex flex-col sm:flex-row justify-between w-fit mx-auto sm:w-full max-w-lg space-y-10 sm:space-y-0">
        <Link
          to={"/"}
          className="uppercase p-4 text-center rounded-sm font-medium text-lg bg-red-500 text-white hover:bg-black hover:text-white font-Poppins duration-200 ease-in-out"
        >
          To Home
        </Link>
        <Link
          to={"/Dash"}
          className="uppercase p-4 text-center rounded-sm font-medium text-lg bg-red-500 text-white hover:bg-black hover:text-white font-Poppins duration-200 ease-in-out"
        >
          To Dashboard
        </Link>
      </span>
    </div>
  );
}

export default PaymentSuccess;

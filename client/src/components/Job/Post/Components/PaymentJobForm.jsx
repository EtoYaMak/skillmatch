import { useState } from "react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

function PaymentJobForm() {
  const bestPackagePrice = 99;
  const [selectedPackage, setSelectedPackage] = useState("free");

  return (
    <>
      <div className="main min-h-screen mt-14 max-w-[1024px] mx-auto">
        {/* Packages */}
        <div className="packages flex sm:flex-row flex-col justify-center items-center gap-8">
          {/* FREE */}
          <PackageComponent
            type={"Basic"}
            price={"Free"}
            p0={false}
            p1={true} //true = checkmark false = no checkmark...
            p2={true}
            p3={true}
            p4={true}
            isSelected={selectedPackage === "free"} // Check if this package is selected
            onClick={() => setSelectedPackage("free")} // Set the selected package to 'free'
          />
          {/* PAID */}
          <PackageComponent
            type={"Best"}
            price={`$${bestPackagePrice}`}
            p0={true}
            p1={true} //true = checkmark false = no checkmark...
            p2={true}
            p3={true}
            p4={true}
            isSelected={selectedPackage === "paid"} // Check if this package is selected
            onClick={() => setSelectedPackage("paid")} // Set the selected package to 'paid'
          />
        </div>
        {/* Pay Form */}
      </div>
    </>
  );
}

export default PaymentJobForm;

function PackageComponent({
  type,
  price,
  p0,
  p1,
  p2,
  p3,
  p4,
  isSelected,
  onClick,
}) {
  return (
    <div
      className={`w-3/4 sm:w-auto sm:max-w-sm flex flex-col justify-center items-center  rounded-xl duration-150 hover:scale-[102%] ${
        isSelected
          ? "shadow-[0_3px_10px_rgb(0,0,0,0.35)]"
          : "shadow-[0_3px_10px_rgb(0,0,0,0.1)]" // Apply styles based on isSelected
      } `}
      onClick={onClick} // Call the onClick function when the package is clicked
    >
      {/* TYPE / PRICE */}
      <span
        className={`text-center  w-full h-full py-10 rounded-t-xl duration-200 ease-in-out ${
          isSelected ? "bg-red-600 text-white" : "" // Apply styles based on isSelected
        }`}
      >
        <h1 className="text-2xl font-medium font-Poppins pb-1 ">{type}</h1>
        <h2 className="text-4xl font-semibold font-Inter  px-2 pt-1 ">
          {price}
        </h2>
      </span>
      {/* CHECKS */}
      <span className="space-y-4 border-t border-t-black/10 pt-6 pb-14 px-6 font-Poppins">
        {p0 === true ? (
          <p className="flex items-center font-semibold gap-1 text-[15px] ">
            <IoCheckmarkDoneCircleSharp size={24} className="text-red-600" />
            Featured ad
          </p>
        ) : (
          <p className="flex items-center font-medium gap-1 text-[15px]">
            <IoCheckmarkDoneCircleSharp size={24} className="text-black/40" />
            Featured ad
          </p>
        )}
        {p1 === true ? (
          <p className="flex items-center font-medium gap-1 text-[15px]">
            <IoCheckmarkDoneCircleSharp size={24} className="text-red-600" />
            Display your company logo
          </p>
        ) : (
          <p className="flex items-center font-medium gap-1 text-[15px]">
            <IoCheckmarkDoneCircleSharp size={24} className="text-black/40" />
            Display your company logo
          </p>
        )}
        {p2 === true ? (
          <p
            className={`flex items-center ${
              price !== "$99" ? "font-medium" : "font-semibold"
            } gap-1 text-[15px]`}
          >
            <IoCheckmarkDoneCircleSharp size={24} className="text-red-600" />
            List your job ad for {price !== "$99" ? "1-month" : "2-months"}
          </p>
        ) : (
          <p className="flex items-center font-medium gap-1 text-[15px]">
            <IoCheckmarkDoneCircleSharp size={24} className="text-black/40" />
            List your job ad for 1-month
          </p>
        )}
        {p3 === true ? (
          <p className="flex items-center font-medium gap-1 text-[15px]">
            <IoCheckmarkDoneCircleSharp size={24} className="text-red-600" />
            Edit job after listing
          </p>
        ) : (
          <p className="flex items-center font-medium gap-1 text-[15px]">
            <IoCheckmarkDoneCircleSharp size={24} className="text-black/40" />
            Edit job after listing
          </p>
        )}
        {p4 === true ? (
          <p className="flex items-center font-medium gap-1 text-[15px]">
            <IoCheckmarkDoneCircleSharp size={24} className="text-red-600" />
            Applications dashboard
          </p>
        ) : (
          <p className="flex items-center font-medium gap-1 text-[15px]">
            <IoCheckmarkDoneCircleSharp size={24} className="text-black/40" />
            Applications dashboard
          </p>
        )}
      </span>
    </div>
  );
}

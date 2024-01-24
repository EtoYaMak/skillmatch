import { useContext, useEffect, useState } from "react";
import { JobFormContext } from "../JobPost";
import axios from "axios";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../../../../features/jobs/jobSlice";
import { useCallback } from "react";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

//
//
//
function PaymentJobForm() {
  const { formData, setSubmitPayment } = useContext(JobFormContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the necessary formData is present
    // You should tailor the condition to check for the actual required fields
    const isFormDataIncomplete =
      !formData || Object.keys(formData).length === 0;

    if (isFormDataIncomplete) {
      // If the formData is incomplete, redirect to /post
      navigate("/post");
    }
  }, [formData, navigate]);
  const bestPackagePrice = 99;
  const [selectedPackage, setSelectedPackage] = useState("free");

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      // If the selectedPackage is 'free', no payment is necessary
      if (selectedPackage === "free") {
        // Proceed with job creation without payment
        const isFeatured = selectedPackage === "best";

        // Extract previewUrl and fileName, and spread the rest of formData
        const { previewUrl, fileName, category, ...restFormData } = formData;
        //console.log(category);
        // Prepare the data to dispatch, renaming fileName to logo
        const submitData = {
          ...restFormData,
          logo: fileName,
          featured: isFeatured,
          department: category,
        };

        // Dispatch the job creation action
        //console.log(submitData);
        dispatch(createJob(submitData));
        navigate("/payment-success");
        return; // Exit the function since no payment is needed
      }

      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardNumberElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error("Error:", error);
        return;
      }

      try {
        const response = await axios.post("/payment", {
          amount: 9900, // Amount in cents
          id: paymentMethod.id,
          description: user.name,
          return_url: "https://skillmint.io/payment-success",
        });

        if (response.data.success) {
          //console.log("Payment success");
          const isFeatured = selectedPackage === "best";

          // Extract previewUrl and fileName, and spread the rest of formData
          const { previewUrl, fileName, category, ...restFormData } = formData;

          // Prepare the data to dispatch, renaming fileName to logo
          const submitData = {
            ...restFormData,
            logo: fileName,
            featured: isFeatured,
            department: category,
          };

          //console.log("Data to dispatch: ", submitData);
          dispatch(createJob(submitData));
          navigate("/payment-success");
        }
      } catch (error) {
        console.error("Payment failed:", error);
      }
    },
    [stripe, elements, user.name, selectedPackage, formData]
  );
  useEffect(() => {
    // Set the submit function in the context
    setSubmitPayment(() => handleSubmit);
  }, [handleSubmit, setSubmitPayment]);
  return (
    <>
      <div className="main  mt-14 max-w-[1024px] mx-auto">
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
            isSelected={selectedPackage === "best"} // Check if this package is selected
            onClick={() => setSelectedPackage("best")} // Set the selected package to 'paid'
          />
        </div>
        {/* Pay Form */}
        {selectedPackage === "best" ? (
          <PayForm
            amount={bestPackagePrice}
            isSelected={selectedPackage}
            handleSubmit={handleSubmit}
          />
        ) : null}
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
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#000",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Poppins, Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "19px",
      fontSmoothing: "antialiased",
      "::placeholder": { iconColor: "#000", color: "#a9a9a9", fontWeight: 300 },
    },
    invalid: {
      iconColor: "#000",
      color: "#ff0000",
    },
  },
};
const CARD_OPTIONS2 = {
  style: {
    base: {
      iconColor: "#000",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Poppins, Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "19px",
      fontSmoothing: "antialiased",
      "::placeholder": { iconColor: "#000", color: "#a9a9a9", fontWeight: 300 },
    },
    invalid: {
      iconColor: "#000",
      color: "#ff0000",
    },
  },
};
function PayForm({ amount, isSelected, handleSubmit }) {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="payment-form flex flex-col sm:flex-row max-w-[850px] justify-center items-center mx-auto bg-white shadow-[0_5px_10px_rgb(0,0,0,0.12)] mt-10 "
      >
        <div className="flex flex-col w-full max-w-[450px]  p-14 ">
          {/* Title */}
          <div className="flex flex-col max-w-lg ">
            <h1 className="text-[2.4rem] font-Poppins">Payment</h1>
            <div className="flex justify-between items-center">
              <h1 className="text-[1.3rem] font-Poppins">Pay with Card</h1>
              <img
                src="../../assets/stripe.png"
                alt=""
                className="sm:w-44 w-24"
              />
            </div>
          </div>
          {/* CARD content */}
          <div className="max-w-lg">
            <span className="w-full ">
              <h1 className="font-Poppins font-medium pb-1 text-[15px]">
                Card Number
              </h1>
              <fieldset className="FormGroupPF ">
                <div className="FormRowPF ">
                  <CardNumberElement options={CARD_OPTIONS} />
                </div>
              </fieldset>
            </span>
            <div className="flex w-full  gap-12 py-8">
              <span className="w-1/3 flex flex-col justify-between">
                <h1 className="font-Poppins font-medium pb-1 text-[15px] ">
                  Expiration Date
                </h1>
                <fieldset className="FormGroupPF">
                  <div className="FormRowPF">
                    <CardExpiryElement options={CARD_OPTIONS2} />
                  </div>
                </fieldset>
              </span>
              <span className="w-1/3 flex flex-col justify-between">
                <h1 className="font-Poppins font-medium pb-1 text-[15px]">
                  CVC/CVV
                </h1>
                <fieldset className="FormGroupPF">
                  <div className="FormRowPF">
                    <CardCvcElement options={CARD_OPTIONS2} />
                    {/* Display validation status */}
                  </div>
                </fieldset>
              </span>
            </div>
          </div>
        </div>
        <div className="sm:w-[400px] min-w-fit w-[95%] sm:min-w-[220px]  py-6 min-[320px]:px-7 sm:py-0 sm:px-10 h-full">
          <div className=" bg-black/90 text-white w-full p-4 rounded-md">
            <h1 className="text-[1.22rem] font-Poppins">Order Summary</h1>
            <span className="flex justify-between mt-4">
              <h2 className="font-Poppins text-[13px]">Job Posting</h2>
              <p className="pr-6 font-Poppins text-[13px]">0.00</p>
            </span>
            <span className="flex justify-between ">
              <h2 className="font-Poppins text-[13px]">Package</h2>
              <p className="pr-6 font-Poppins text-[13px]">
                {isSelected === "best" ? `$ ${amount}.00` : "FREE"}
              </p>
            </span>
            <span className="flex justify-between mt-10">
              <h2 className="font-Poppins text-[13px]">TAX</h2>
              <p className="pr-6 font-Poppins text-[13px]">0.00</p>
            </span>
            <span className="flex justify-between border-t-2 border-white/40 mt-1 pt-1">
              <h2 className="font-Poppins text-[13px] font-medium">TOTAL</h2>
              <p className="pr-6 font-Poppins text-[13px] font-medium">
                {isSelected === "best" ? `$ ${amount}.00` : "FREE"}
              </p>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}

import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAngleLeft } from "react-icons/fa";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#000",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Poppins, Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "22px",
      fontSmoothing: "antialiased",
      "::placeholder": { iconColor: "#000", color: "#a9a9a9", fontWeight: 300 },
    },
    invalid: {
      iconColor: "#000",
      color: "#ff0000",
    },
  },
};
const amount = 2000; //IN CENTS $20...     x100
export default function PaymentForm() {
  const { user } = useSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const toDash = () => {
    navigate(`/dash`);
  };

  const handleSuccessfulPayment = () => {
    // Perform any necessary post-payment actions and send a signal back to JobForm
    sessionStorage.setItem("paymentSuccess", "true");
    navigate("/post", { state: { paymentSuccess: true } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet, or Elements isn't ready.
      // You may want to show an error message to the user.
      console.log("Stripe.js or Elements not loaded yet");
      return;
    }

    // Create a PaymentMethod using the CardElement.
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (!error) {
      try {
        // Confirm the PaymentIntent with the return_url
        const { id } = paymentMethod;
        const response = await axios.post("/payment", {
          amount: amount,
          id,
          description: user.name,
          return_url: "http://18.169.159.127/dash", // Replace with your actual return_url
          allow_redirects: true,
        });
        if (response.data.success) {
          setSuccess(true);
          handleSuccessfulPayment(); // Signal successful payment
          console.log("Payment Success");
        }
      } catch (error) {
        console.error("Error", error);
      }
    } else {
      console.error(error.message);
      console.log("Error", error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit} className="min-h-max w-full">
          <div className="sm:flex sm:flex-row flex-col sm:max-w-screen-xl mx-auto min-h-screen pb-4 sm:p-2 ">
            {/* CONTAINER LEFT */}
            <div className="Left flex flex-col sm:w-1/3 text-black sm:rounded-tl-xl sm:rounded-bl-xl ">
              <div className="sm:w-full  h-full  flex flex-col justify-center items-center gap-5 sm:backdrop-blur-[2px] bg-white/50 rounded-tl-xl">
                <h1 className="text-xl   font-Poppins ml-2 font-light bg-white/50 p-2 rounded-xl">
                  To Pay
                </h1>
                <p className="font-Poppins text-4xl font-medium sm:text-5xl bg-white/50 p-2 rounded-xl">
                  £{amount / 100}
                </p>
              </div>
              <div className="bg-black w-full flex justify-center items-center sm:rounded-bl-xl px-4">
                <a
                  href="/"
                  className="text-[1.4em] sm:text-[1.7rem] text-white font-Poppins flex gap-2 items-center justify-center hover:text-white hover:bg-[#fff]/10 rounded-xl p-2 pr-5"
                >
                  <FaAngleLeft className="text-5xl" />
                  Cancel
                </a>
              </div>
            </div>
            {/* CONTAINER RIGHT */}
            <div className="Right sm:w-2/3 p-2 sm:p-10 w-full">
              {/* Title */}
              <div className="flex flex-col mt-4 sm:mt-0 gap-8">
                <h1 className="text-4xl sm:text-5xl font-Poppins font-semibold">
                  Payment
                </h1>
                <div className="flex flex-row justify-between items-center gap-1 sm:gap-0 py-4">
                  <h1 className="text-3xl font-Poppins w-fit font-light">
                    Pay with Card
                  </h1>
                  <img
                    src="../../assets/stripe.png"
                    alt=""
                    className="sm:w-44 w-24"
                  />
                </div>
              </div>
              {/* CARD content */}
              <div className="flex flex-col gap-4 sm:gap-10 relative">
                <span className="w-full flex flex-col">
                  <h1 className="font-Poppins text-2xl mb-2 text-[#444]">
                    Card Number
                  </h1>
                  <fieldset className="FormGroupPF sm:w-full">
                    <div className="FormRowPF">
                      <CardNumberElement options={CARD_OPTIONS} />
                    </div>
                  </fieldset>
                </span>
                <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-12 ">
                  <span className="w-full flex flex-col">
                    <h1 className="font-Poppins text-2xl mb-2 text-[#444]">
                      Expiration
                    </h1>
                    <fieldset className="FormGroupPF sm:w-full">
                      <div className="FormRowPF">
                        <CardExpiryElement options={CARD_OPTIONS} />
                      </div>
                    </fieldset>
                  </span>
                  <span className="w-full flex flex-col">
                    <h1 className="font-Poppins text-2xl mb-2 text-[#444]">
                      CVC/CVV
                    </h1>
                    <fieldset className="FormGroupPF sm:w-full">
                      <div className="FormRowPF">
                        <CardCvcElement options={CARD_OPTIONS} />
                        {/* Display validation status */}
                      </div>
                    </fieldset>
                  </span>
                </div>
                <button
                  className="bg-black rounded-[4px] py-4 
                   text-white font-Poppins  w-full text-xl h-fit"
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-white text-5xl">
            Job listing Payment Successful
          </h2>
          <button
            className="btn btn-ghost bg-white hover:bg-black hover:text-white text-black w-1/3 mx-at"
            onClick={toDash}
          >
            My Dashboard
          </button>
        </div>
      )}
    </>
  );
}

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#fff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#fff" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

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
      return;
    }

    // Create a PaymentMethod using the CardElement.
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        // Confirm the PaymentIntent with the return_url
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 2000,
          id,
          description: user.name,
          return_url: "http://localhost:3000/dash", // Replace with your actual return_url
          allow_redirects: true,
        });
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
          handleSuccessfulPayment(); // Signal successful payment
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="mx-auto h-[calc(100vh-45vh)] flex justify-center items-center">
      {!success ? (
        <form onSubmit={handleSubmit} className="w-1/2 m-auto p-4">
          <h1 className="text-white text-center text-5xl my-4 font-Inter h-full p-4">
            Paying with Stripe
          </h1>
          <fieldset className="FormGroupPF">
            <div className="FormRowPF">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="btnPF">Pay</button>
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
    </div>
  );
}

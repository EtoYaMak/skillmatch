import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const PaymentModal = ({ sessionID }) => {
  useEffect(() => {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

    const handleCheckout = async () => {
      const stripe = await stripePromise;

      const result = await stripe.redirectToCheckout({
        sessionId: sessionID,
      });

      if (result.error) {
        // Handle error during redirect to Checkout
        console.error(result.error);
      }
    };

    handleCheckout();
  }, [sessionID]);

  return <div>Redirecting to Stripe Checkout...</div>;
};

export default PaymentModal;

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51NlQXKD9pAmpYfux100jyEYaiy1sGGN8TvlRJZrDcGGUwxZumN75M4Cj9ctvKTIe0U2l3vgf8uZko42cLcEaVEiy0045K3nweu";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}

// PaymentPromptModal.js
import React from "react";

const PaymentPromptModal = ({ startPayment }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="text-xl text-white">Payment Required</h2>
        <p className="text-xl text-white">Please make a payment to proceed.</p>
        <button
          onClick={startPayment}
          className="btn btn-ghost text-xl text-white"
        >
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPromptModal;

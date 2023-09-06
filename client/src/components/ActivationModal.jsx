import React from "react";

function ActivationModal({ isOpen, onClose, type }) {
  if (!isOpen) return null;
  const message = () => {
    if (type === "user")
      return "Account not activated, Check your email for activation link!";
    if (type.startsWith("student")) {
      const studentType = type.split("-")[1];
      return `Job Seeker Account not activated, Check your email for activation link!`;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 h-full">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Account Activation Required</h2>
        <p className="mt-2 text-lg">{message()}</p>
        <button
          className="mt-4 bg-red-500 text-white rounded p-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ActivationModal;

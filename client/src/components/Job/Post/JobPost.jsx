import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

// Create a context for the form data
export const JobFormContext = createContext({});
function JobPost() {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState("jobCreate");

  const { user } = useSelector((state) => state.auth);
  const { SAuser } = useSelector((state) => state.SAuser);

  const navigate = useNavigate();
  const collectFormData = () => {
    // Collect data from the state
    return { ...formData };
  };

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    navigate(`/post/${step}`);
  };

  const handleNext = () => {
    const newFormData = collectFormData(); // Call collectFormData from the child component
    updateFormData(newFormData); // Update the context with the new form data
    // Define logic to determine the next step based on `currentStep`
    const nextStep = determineNextStep(currentStep);
    goToStep(nextStep);
  };

  const handleEdit = () => {
    // Logic to go back to editing, for example, always back to jobCreate
    goToStep("jobCreate");
  };

  // Function to determine the next step
  const determineNextStep = (current) => {
    // Your logic to determine the next step based on the current step
    // For example:
    switch (current) {
      case "jobCreate":
        return "jobPreview";
      case "jobPreview":
        return "jobPayment";
      // Add cases for other steps if necessary
      default:
        return "jobCreate";
    }
  };

  const [submitPayment, setSubmitPayment] = useState(() => () => {});

  const handlePaymentSubmit = () => {
    submitPayment();
  };
  const contextValue = useMemo(
    () => ({
      formData,
      updateFormData,
      goToStep,
      collectFormData,
      handlePaymentSubmit,
      setSubmitPayment,
    }),
    [
      formData,
      updateFormData,
      goToStep,
      collectFormData,
      handlePaymentSubmit,
      setSubmitPayment,
    ]
  );
  return (
    <>
      {SAuser || user ? (
        <Elements stripe={stripePromise}>
          {/*         <JobFormContext.Provider
          value={{
            formData,
            updateFormData,
            goToStep,
            collectFormData,
            handlePaymentSubmit,
            setSubmitPayment,
          }}
        > */}{" "}
          <JobFormContext.Provider value={contextValue}>
            <div className=" min-h-screen font-Poppins">
              <h1 className=" text-[#000] relative flex justify-start items-center h-24  px-4 mx-auto z-50   select-none pl-[6vw]">
                <span className="bg-transparent leading-[1.85rem] font-Poppins tracking-tighter text-4xl font-extrabold hover:text-[#d0333c] ease-in-out duration-500 ">
                  SKILL
                  <br />
                  MINT
                </span>
              </h1>
              <div className="head border-b flex flex-col justify-center gap-8 items-center p-14">
                <h1 className="font-Poppins text-[2rem] sm:text-[2.65rem] font-semibold text-center">
                  Reach the largest remote community on the web
                </h1>
                <ul className="steps w-[96vw] sm:w-[80vw] ">
                  <li
                    className={`step text-lg ${
                      currentStep === "jobCreate" ? "step-primary" : ""
                    }`}
                  >
                    <p className=" text-xl sm:text-2xl font-semibold">Create</p>
                  </li>
                  <li
                    className={`step text-lg ${
                      currentStep === "jobPreview" ? "step-primary" : ""
                    }`}
                  >
                    <p className=" text-xl sm:text-2xl font-semibold">
                      Preview
                    </p>
                  </li>
                  <li
                    className={`step text-lg ${
                      currentStep === "jobPayment" ? "step-primary" : ""
                    }`}
                  >
                    <p className=" text-xl sm:text-2xl font-semibold">
                      Purchase
                    </p>
                  </li>
                </ul>
              </div>
              <div className="body-components  mx-auto px-2">
                <Outlet />
                {/* Render buttons based on the current step */}
                <div
                  className={`stepbutton w-full max-w-[1100px] ${
                    currentStep === "jobPayment"
                      ? "max-w-[850px]"
                      : "max-w-[1100px]"
                  } mx-auto flex flex-wrap ${
                    currentStep !== "jobCreate"
                      ? "justify-between"
                      : "justify-end"
                  }  p-2 py-8 gap-5`}
                >
                  {currentStep !== "jobCreate" && (
                    <button
                      onClick={handleEdit}
                      className="uppercase p-4 rounded-sm font-medium text-lg outline outline-black outline-1 bg-transparent text-black hover:bg-black hover:text-white font-Poppins duration-200 ease-in-out"
                    >
                      Modify Job
                    </button>
                  )}
                  {currentStep !== "jobPayment" && (
                    <button
                      onClick={handleNext}
                      className="uppercase p-4 rounded-sm font-medium text-lg  outline outline-black outline-1  bg-transparent text-black hover:bg-black hover:text-white font-Poppins duration-200 ease-in-out"
                    >
                      {currentStep === "jobCreate" && "Continue to Step 2"}
                      {currentStep === "jobPreview" && "Continue to Step 3"}
                      {currentStep === "jobPayment" && "Purchase Listing"}
                    </button>
                  )}
                  {currentStep === "jobPayment" && (
                    <button
                      onClick={handlePaymentSubmit}
                      className="uppercase p-4 rounded-sm font-medium text-lg bg-red-500 text-white hover:bg-black hover:text-white font-Poppins duration-200 ease-in-out"
                    >
                      Purchase Listing
                    </button>
                  )}
                </div>
              </div>
            </div>
          </JobFormContext.Provider>
        </Elements>
      ) : (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center min-h-screen">
          <span className="relative top-24 flex flex-col gap-8">
            <h1 className="text-center text-[2rem] sm:text-[2.4rem] font-Poppins font-medium">
              Register to start posting
            </h1>
            <Link
              to={"/register"}
              className=" uppercase p-4 text-center rounded-sm font-medium text-lg bg-red-500 text-white hover:bg-black hover:text-white font-Poppins duration-300 ease-in-out"
            >
              Register Now!
            </Link>
            <Link
              to={"/"}
              className="uppercase p-4 text-center rounded-sm font-medium text-lg bg-white text-black hover:bg-black hover:text-white font-Poppins duration-300 ease-in-out"
            >
              Back To Home
            </Link>
          </span>
        </div>
      )}
    </>
  );
}

export default JobPost;

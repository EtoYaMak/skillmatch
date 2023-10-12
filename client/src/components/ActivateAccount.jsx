import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { activateAccount, logout, reset } from "../features/auth/authSlice";
import {
  activateAccountS,
  Slogout,
  Sreset,
} from "../features/students/studentSlice";
import { toast } from "react-toastify";

const ActivateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type, token } = useParams();
  const [componentLoaded, setComponentLoaded] = React.useState(false);
  React.useEffect(() => {
    setComponentLoaded(true);
  }, []);
  // Single useSelector call to conditionally get the relevant state
  const relevantState = useSelector((state) => {
    if (type === "1") return state.auth;
    if (type === "2") return state.students;
    return null;
  });
  console.log("State: ", relevantState);
  const activate = useCallback(
    async (action) => {
      try {
        const response = await dispatch(action({ type, token }));
        console.log("response: ", response);
        if (response.payload && !response.error) {
          toast.success("Account Activated Successfully");
          if (type === "2") {
            dispatch(Slogout());
            dispatch(Sreset());
            navigate("/login");
          }
          if (type === "1") {
            dispatch(logout());
            dispatch(reset());
            navigate("/login");
          }
        } else {
          toast.error("Account Activation Failed");
        }
      } catch (error) {
        toast.error("Account Activation Failed: Network error");
      }
    },
    [dispatch, navigate, type, token]
  );

  React.useEffect(() => {
    if (componentLoaded) {
      if (type === "2") {
        activate(activateAccountS);
        console.log("activateAccountS dispatched");
      } else if (type === "1") {
        activate(activateAccount);
      } else {
        toast.error("Unknown account type");
      }
    }
  }, [activate, type, componentLoaded]);

  return (
    <div>
      {relevantState && relevantState.isError ? (
        <h1 className="text-2xl text-red-500">Error activating your account</h1>
      ) : (
        <h1 className="text-2xl text-white">Activating your account...</h1>
      )}
    </div>
  );
};

export default React.memo(ActivateAccount);

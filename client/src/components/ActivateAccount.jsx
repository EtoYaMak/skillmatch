import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { activateAccount } from "../features/auth/authSlice";

function ActivateAccount() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();

  const { isSuccess, isError, message } = useSelector(
    (state) => state.auth // Adjust based on your state shape
  );

  useEffect(() => {
    dispatch(activateAccount(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (isSuccess) {
      // Redirect to the login page or another page of your choice
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return (
    <div>
      {isError ? (
        <h1>Error activating your account: {message}</h1>
      ) : (
        <h1>Activating your account...</h1>
        // Optionally, show a spinner or other loading indicator here
      )}
    </div>
  );
}

export default ActivateAccount;

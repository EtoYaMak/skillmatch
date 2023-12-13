// /src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import SAuserReducer from "../features/SAuser/adminSlice";
import jobReducer from "../features/jobs/jobSlice";
import studentReducer from "../features/students/studentSlice";
import profileReducer from "../features/profiles/profileSlice";
import contactReducer from "../features/contact/contactSlice";
import accountReducer from "../features/accounts/accountSlice";
import expiredJobsReducer from "../features/expiredjobs/expiredJobsSlice";
const isDevelopment = process.env.REACT_APP_NODE_ENV === "development";

export default configureStore({
  reducer: {
    auth: authReducer,
    SAuser: SAuserReducer,
    jobs: jobReducer,
    expiredJobs: expiredJobsReducer,
    students: studentReducer,
    profiles: profileReducer,
    contact: contactReducer,
    accounts: accountReducer,
  },
  devTools: "development",
});

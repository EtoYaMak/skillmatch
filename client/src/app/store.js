import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import jobReducer from "../features/jobs/jobSlice";
import studentReducer from "../features/students/studentSlice";
import profileReducer from "../features/profiles/profileSlice";
import contactReducer from "../features/contact/contactSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    students: studentReducer,
    profiles: profileReducer,
    contact: contactReducer,
  },
});

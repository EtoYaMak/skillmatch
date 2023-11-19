import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "./accountService";

// Get user from localStorage
const SAuser = JSON.parse(localStorage.getItem("SAuser"));

const initialState = {
  accounts: [],
  stuaccounts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get user account
export const getAllUsers = createAsyncThunk(
  "accounts/getUsers",
  async (_, thunkAPI) => {
    try {
      // get token from state in the local storage
      const token = thunkAPI.getState().SAuser.SAuser.token;

      return await accountService.getAllUsers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Get user account
export const getAllStudents = createAsyncThunk(
  "stuaccounts/getStudents",
  async (_, thunkAPI) => {
    try {
      // get token from state in the local storage
      const token = thunkAPI.getState().SAuser.SAuser.token;

      return await accountService.getAllStudents(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accounts = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stuaccounts = action.payload;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

// Get user from localStorage
const SAuser = JSON.parse(localStorage.getItem("SAuser"));

const initialState = {
  SAuser: SAuser ? SAuser : null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

// Register user
export const SAregister = createAsyncThunk(
  "SAuser/SAregister",
  async (SAuser, thunkAPI) => {
    try {
      return await adminService.SAregister(SAuser);
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
// Activate user account
export const SAactivateAccount = createAsyncThunk(
  "SAuser/SAactivate",
  async ({ type, token }, thunkAPI) => {
    try {
      return await adminService.SAactivate(type, token);
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
// Login user
export const SAlogin = createAsyncThunk(
  "SAuser/SAlogin",
  async (SAuser, thunkAPI) => {
    try {
      return await adminService.SAlogin(SAuser);
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
// Forgot Password
export const forgotPassword = createAsyncThunk(
  "SAuser/SAforgotPassword",
  async (email, thunkAPI) => {
    try {
      return await adminService.forgotPassword(email);
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

// Reset Password
export const resetPassword = createAsyncThunk(
  "SAuser/SAresetPassword",
  async ({ type, token, password }, thunkAPI) => {
    try {
      return await adminService.resetPassword(type, token, password);
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
// Logout user
export const SAlogout = createAsyncThunk("SAuser/SAlogout", async () => {
  await adminService.SAlogout();
});
//

/* // Get all students
export const getAllStudents = createAsyncThunk(
  "SAuser/getAllStudents",
  async (_, thunkAPI) => {
    try {
      const response = await adminService.getAllStudents();
      return response.data;
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
 */
export const adminSlice = createSlice({
  name: "SAuser",
  initialState,
  reducers: {
    SAreset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SAregister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SAregister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.SAuser = action.payload;
      })
      .addCase(SAregister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.SAuser = null;
      })
      .addCase(SAlogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SAlogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.SAuser = action.payload;
      })
      .addCase(SAlogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.SAuser = null;
      })
      .addCase(SAlogout.fulfilled, (state) => {
        state.SAuser = null;
      })
      .addCase(SAactivateAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SAactivateAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.SAuser.isActive = action.payload.isActive;
      })
      .addCase(SAactivateAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // New cases for forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // New cases for resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { SAreset } = adminSlice.actions;
export default adminSlice.reducer;

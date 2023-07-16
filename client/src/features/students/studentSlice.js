import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "./studentService";

// Get student from localStorage
const student = JSON.parse(localStorage.getItem("student"));

const initialState = {
  student: student ? student : null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

// Register student
export const Sregister = createAsyncThunk(
  "student/Sregister",
  async (student, thunkAPI) => {
    try {
      return await studentService.Sregister(student);
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

// Login student
export const Slogin = createAsyncThunk(
  "student/Slogin",
  async (student, thunkAPI) => {
    try {
      return await studentService.Slogin(student);
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
export const Slogout = createAsyncThunk("student/Slogout", async () => {
  await studentService.Slogout();
});
export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    Sreset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Sregister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Sregister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.student = action.payload;
      })
      .addCase(Sregister.rejected, (state, action) => {
        state.Loading = false;
        state.isError = true;
        state.message = action.payload;
        state.student = null;
      })
      .addCase(Slogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Slogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.student = action.payload;
      })
      .addCase(Slogin.rejected, (state, action) => {
        state.Loading = false;
        state.isError = true;
        state.message = action.payload;
        state.student = null;
      })
      .addCase(Slogout.fulfilled, (state) => {
        state.student = null;
      });
  },
});

export const { Sreset } = studentSlice.actions;
export default studentSlice.reducer;

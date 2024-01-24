//studentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "./studentService";

// Get student from localStorage
const student = JSON.parse(localStorage.getItem("student"));

const initialState = {
  student: student ? student : null,
  studentData: null,
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
      /*       const response = await studentService.Slogin(student);
      if (response) {
        // Dispatching fetchStudentData to get the freshest data from the DB
        await thunkAPI.dispatch(fetchStudentData());
      }
      return response; */
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

// Logout Student
/* export const Slogout = createAsyncThunk("student/Slogout", async () => {
  await studentService.Slogout();
}); */
export const Slogout = createAsyncThunk(
  "student/Slogout",
  async (_, thunkAPI) => {
    studentService.Slogout();
    thunkAPI.dispatch(Sreset());
  }
);
//
export const fetchStudentData = createAsyncThunk(
  "student/fetchStudentData",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().students.student.token;
      return await studentService.fetchStudentData(token);
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

//
// Activate user account
export const activateAccountS = createAsyncThunk(
  "student/activateS",
  async ({ type, token }, thunkAPI) => {
    try {
      return await studentService.activateS(type, token);
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
export const forgotPasswordS = createAsyncThunk(
  "student/forgotPasswordS",
  async (email, thunkAPI) => {
    try {
      return await studentService.forgotPasswordS(email);
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
export const resetPasswordS = createAsyncThunk(
  "student/resetPasswordS",
  async ({ type, token, password }, thunkAPI) => {
    try {
      return await studentService.resetPasswordS(type, token, password);
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
//
export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    Sreset: (state) => {
      state.studentData = null;
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
        state.isLoading = false;
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
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.student = null;
      })
      .addCase(Slogout.fulfilled, (state) => {
        // Clear student data
        state.student = null;
        state.studentData = null; // Add this if you're storing additional student data
        // Reset any other related state
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchStudentData.fulfilled, (state, action) => {
        state.studentData = action.payload; // Assuming you save student data in this structure
      })
      .addCase(fetchStudentData.rejected, (state, action) => {
        state.isError = action.payload;
      })
      .addCase(activateAccountS.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activateAccountS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.student.isActive = action.payload.isActive;
      })
      .addCase(activateAccountS.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // New cases for forgotPassword
      .addCase(forgotPasswordS.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordS.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(forgotPasswordS.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // New cases for resetPassword
      .addCase(resetPasswordS.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordS.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resetPasswordS.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { Sreset } = studentSlice.actions;
export default studentSlice.reducer;

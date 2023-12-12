import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import expiredJobsService from "./expiredJobsService";

export const fetchExpiredJobs = createAsyncThunk(
  "expiredJobs/fetch",
  async (_, thunkAPI) => {
    try {
      return await expiredJobsService.getExpiredJobs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const expiredJobsSlice = createSlice({
  name: "expiredJobs",
  initialState: {
    expiredJobs: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpiredJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExpiredJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expiredJobs = action.payload;
      })
      .addCase(fetchExpiredJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default expiredJobsSlice.reducer;

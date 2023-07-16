import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jobService from "./jobService";

const initialState = {
  jobs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//
//
//
//CreateJob = Create #PRIVATE
//getJobId = @Dash @Browse @Home To view selected job #PUBLIC
//getAllJobs = @Browse @Home #PUBLIC
//getJob = @Dash Posts from Acc. #PRIVATE
//deleteJob = @Dash delete Job from acc. #PRIVATE
//
//
//

//Create new jobpost
//USED @JobForm
export const createJob = createAsyncThunk(
  "jobs/create",
  async (formData, thunkAPI) => {
    try {
      console.log(formData); // Log the contents of formData
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.createJob(formData, token);
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

// Get job by ID
// USED @Dash -> View Job
export const getJobId = createAsyncThunk(
  "jobs/getJobId",
  async (jobId, thunkAPI) => {
    try {
      // Return the job with the specified ID from the response data
      return await jobService.getJobById(jobId);
    } catch (error) {
      // If there is an error, throw it
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

// Get all jobs PUBLIC
//USED AT @Browse
export const getAllJobs = createAsyncThunk(
  "jobs/getAllJobs",
  async (_, thunkAPI) => {
    try {
      // Return the list of jobs from the response data
      return await jobService.getAllJobs();
    } catch (error) {
      // If there is an error, throw it
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

// Get user JobPosts PRIVATE
//USED @Dashboard Poster
export const getMyJobs = createAsyncThunk(
  "jobs/getMyJobs",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.getMyJobs(token);
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
// Update user job post #PRIVATE
export const updateJob = createAsyncThunk(
  "jobs/update",
  async ({ jobId, jobData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.updateJob(jobId, jobData, token);
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
//Delete user jobpost
export const deleteJob = createAsyncThunk(
  "jobs/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.deleteJob(id, token);
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
export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      //create
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //get
      .addCase(getMyJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobs = action.payload;
      })
      .addCase(getMyJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobs = state.jobs.filter((job) => job._id !== action.payload.id);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobs = action.payload;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getJobId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.job = action.payload;
      })
      .addCase(getJobId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // ...
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update the corresponding job in the state with the updated job data
        const updatedJob = action.payload;
        state.jobs = state.jobs.map((job) =>
          job._id === updatedJob._id ? updatedJob : job
        );
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = jobSlice.actions;
export default jobSlice.reducer;

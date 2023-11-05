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
//Create new jobpost
//USED @JobForm
export const SAcreateJob = createAsyncThunk(
  "jobs/SAcreate",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().SAuser.SAuser.token;

      return await jobService.SAcreateJob(formData, token);
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
// USER @Dash -> View Job
export const getJobId = createAsyncThunk(
  "jobs/getJobId",
  async (jobId, thunkAPI) => {
    try {
      // Return the job with the specified ID from the response data
      const job = await jobService.getJobById(jobId);

      // Return an array containing the single job object to match the structure of the job list
      return [job];
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

// Get all jobs (Public access for viewing all jobs and Private access for user dashboard)
export const getAllJobs = createAsyncThunk(
  "jobs/getAllJobs",
  async (_, thunkAPI) => {
    try {
      // Check if the user is authenticated to include the token in the request
      const isAuthenticated = thunkAPI.getState().auth.isAuthenticated;
      if (isAuthenticated) {
        const token = thunkAPI.getState().auth.user.token;
        return await jobService.getMyJobs(token); // For user dashboard (private)
      } else {
        return await jobService.getAllJobs(); // For public access (all jobs)
      }
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
// Get user JobPosts PRIVATE
//USED @Dashboard Poster
export const SAgetMyJobs = createAsyncThunk(
  "jobs/SAgetMyJobs",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().SAuser.SAuser.token;
      return await jobService.SAgetMyJobs(token);
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
// Update jobpost
// USED @JobForm
export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ jobId, formData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.updateJob(jobId, formData, token);
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
//Delete user jobpost
export const SAdeleteJob = createAsyncThunk(
  "jobs/SAdelete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().SAuser.SAuser.token;
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

//
//// Apply to a job
export const applyToJob = createAsyncThunk(
  "jobs/applyToJob",
  async ({ jobId, studentId }, thunkAPI) => {
    try {
      const response = await jobService.applyToJob(jobId, studentId);
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

// Update application status
export const updateApplicationStatus = createAsyncThunk(
  "jobs/updateApplicationStatus",
  async ({ jobId, studentId, newStatus }, thunkAPI) => {
    try {
      const response = await jobService.updateApplicationStatus(
        jobId,
        studentId,
        newStatus
      );

      return { jobId, studentId, newStatus }; // Return the payload with the expected structure
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

//
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
      //create
      .addCase(SAcreateJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SAcreateJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobs.push(action.payload);
      })
      .addCase(SAcreateJob.rejected, (state, action) => {
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
      //get
      .addCase(SAgetMyJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SAgetMyJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobs = action.payload;
      })
      .addCase(SAgetMyJobs.rejected, (state, action) => {
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
      .addCase(SAdeleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SAdeleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobs = state.jobs.filter((job) => job._id !== action.payload.id);
      })
      .addCase(SAdeleteJob.rejected, (state, action) => {
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
      // Get job by ID
      // Get job by ID
      .addCase(getJobId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobs = action.payload; // Store the retrieved job directly in the 'jobs' array
      })
      .addCase(getJobId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add the updateJob case
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        // Assuming the backend returns the updated job object in the payload
        // Find the index of the job in the state.jobs array and update it
        const updatedJob = action.payload;
        const jobIndex = state.jobs.findIndex(
          (job) => job._id === updatedJob._id
        );
        if (jobIndex !== -1) {
          // Update the job in the jobs array
          state.jobs[jobIndex] = updatedJob;
          // Also, update the job field (used for individual job display) if the job ID matches
          if (state.job?._id === updatedJob._id) {
            state.job = updatedJob;
          }
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //
      //Applications
      //
      // Apply to a job
      .addCase(applyToJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        // Log the action payload to see its structure

        // Check if the payload contains the expected data
        if (action.payload && action.payload.someImportantField) {
          // Push the payload data to the applications array
          state.applications.push(action.payload);
        }
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update application status
      .addCase(updateApplicationStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const { jobId, studentId, newStatus } = action.payload;

        // Find the job index within the jobs array
        const jobIndex = state.jobs.findIndex((job) => job._id === jobId);
        if (jobIndex !== -1) {
          // Find the applicant index within the applicants array of the specific job
          const applicantIndex = state.jobs[jobIndex].applicants.findIndex(
            (applicant) => applicant.student === studentId
          );
          if (applicantIndex !== -1) {
            // Update the applicant's status
            state.jobs[jobIndex].applicants[applicantIndex].status = newStatus;
          }
        }
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = jobSlice.actions;
export default jobSlice.reducer;

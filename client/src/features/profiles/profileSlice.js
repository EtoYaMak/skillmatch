import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

const initialState = {
  profiles: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createProfile = createAsyncThunk(
  "profiles/create",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().students.student.token;
      return await profileService.createProfile(formData, token);
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

export const getProfile = createAsyncThunk(
  "profiles/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().students.student.token;
      return await profileService.getProfile(token);
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

export const deleteProfile = createAsyncThunk(
  "profiles/delete",
  async (profileId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().students.student.token;
      return await profileService.deleteProfile(profileId, token);
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

export const updateProfile = createAsyncThunk(
  "profiles/update",
  async (updatedFormData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().students.student.token;

      return await profileService.updateProfile(updatedFormData, token);
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
export const getStudentProfile = createAsyncThunk(
  "profiles/getStudentProfile",
  async (studentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token; // Assuming user token
      return await profileService.getStudentProfile(studentId, token);
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
export const SAgetStudentProfile = createAsyncThunk(
  "profiles/SAgetStudentProfile",
  async (studentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().SAuser.SAuser.token; // Assuming user token
      return await profileService.SAgetStudentProfile(studentId, token);
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
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profiles.push(action.payload);
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profiles = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.profiles = [];
      })
      .addCase(deleteProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profiles = [];
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // If you want to update the state after successful update
        state.profiles = [action.payload];
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStudentProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentProfile.fulfilled, (state, action) => {
        const profileToAdd = action.payload;

        // Check if a profile with the same _id already exists
        const existingProfileIndex = state.profiles.findIndex(
          (profile) => profile._id === profileToAdd._id
        );

        if (existingProfileIndex === -1) {
          // Profile doesn't exist, add it
          state.profiles.push(profileToAdd);
        }

        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getStudentProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(SAgetStudentProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SAgetStudentProfile.fulfilled, (state, action) => {
        const profileToAdd = action.payload;

        // Check if a profile with the same _id already exists
        const existingProfileIndex = state.profiles.findIndex(
          (profile) => profile._id === profileToAdd._id
        );

        if (existingProfileIndex === -1) {
          // Profile doesn't exist, add it
          state.profiles.push(profileToAdd);
        }

        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(SAgetStudentProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;

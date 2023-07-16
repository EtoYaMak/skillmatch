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
      console.table(formData);
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

export const updateProfile = createAsyncThunk(
  "profiles/update",
  async (formData, thunkAPI) => {
    try {
      console.table(formData);
      const token = thunkAPI.getState().students.student.token;
      const updatedProfileData = {
        id: formData.id,
        University: formData.University,
        Degree: formData.Degree,
        DegreeTitle: formData.DegreeTitle,
        cv: formData.cv, // Make sure to pass the file directly
      };
      return await profileService.updateProfile(updatedProfileData, token);
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
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().students.student.token;
      return await profileService.deleteProfile(id, token);
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
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedProfile = action.payload;
        const existingProfileIndex = state.profiles.findIndex(
          (profile) => profile._id === updatedProfile._id
        );
        if (existingProfileIndex !== -1) {
          const updatedProfiles = [...state.profiles];
          updatedProfiles[existingProfileIndex] = updatedProfile;
          state.profiles = updatedProfiles;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
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
        state.profile = null;
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
      });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;

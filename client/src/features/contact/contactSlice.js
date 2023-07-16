import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendContactForm } from "./contactService"; // Update the import path to the correct location

const initialState = {
  loading: false,
  error: null,
  success: false,
};

export const sendContactFormAsync = createAsyncThunk(
  "contact/sendContactForm",
  async (formData) => {
    await sendContactForm(formData);
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetFormState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactFormAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendContactFormAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(sendContactFormAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export const { resetFormState } = contactSlice.actions;

export default contactSlice.reducer;

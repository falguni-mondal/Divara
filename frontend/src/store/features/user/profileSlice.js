import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const profileUpdater = createAsyncThunk(
  "profile/profileUpdater",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/profile/update`, data, {
        withCredentials: true,
      });
      return res?.data?.message;
    } catch (err) {
        return rejectWithValue(err?.response?.data?.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    update: {
      status: "idle",
      error: null,
      message: null,
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(profileUpdater.pending, (state) => {
        state.update.status= "loading";
        state.update.message= null;
        state.update.error= null;
    })
    .addCase(profileUpdater.fulfilled, (state, action) => {
        state.update.status= "success";
        state.update.message= action.payload;
        state.update.error= null;
    })
    .addCase(profileUpdater.rejected, (state, action) => {
        state.update.status= "failed";
        state.update.message= null;
        state.update.error= action.payload;
    })
  }
});

export default profileSlice.reducer;
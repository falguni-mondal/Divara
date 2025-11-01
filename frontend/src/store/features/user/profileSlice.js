import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendBaseApi } from "../../../configs/keys";

export const profileUpdater = createAsyncThunk(
  "profile/profileUpdater",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${backendBaseApi}/profile/update`, data, {
        withCredentials: true,
      });
      return res?.data?.message;
    } catch (err) {
        return rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const emailUpdater = createAsyncThunk(
  "profile/emailUpdater",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${backendBaseApi}/profile/email/verify`, {token}, {
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
    emailUpdate: {
      status: "idle",
      error: null,
      message: null,
    }
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

    .addCase(emailUpdater.pending, (state) => {
        state.emailUpdate.status= "loading";
        state.emailUpdate.message= null;
        state.emailUpdate.error= null;
    })
    .addCase(emailUpdater.fulfilled, (state, action) => {
        state.emailUpdate.status= "success";
        state.emailUpdate.message= action.payload;
        state.emailUpdate.error= null;
    })
    .addCase(emailUpdater.rejected, (state, action) => {
        state.emailUpdate.status= "failed";
        state.emailUpdate.message= null;
        state.emailUpdate.error= action.payload;
    })
  }
});

export default profileSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendBaseApi } from "../../../configs/keys";

export const checkMail = createAsyncThunk(
  "auth/checkMail",
  async (email, { rejectWithValue }) => {
    try {
      const hasUser = await axios.post(`${backendBaseApi}/auth/check/email`, {email});
      return hasUser?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: null,
    user: null,
    checkEmail: {
      userMail: "",
      hasUser: null,
      status: "idle",
      error: null,
    },
    verifyEmail: {
      status: "idle",
      error: null,
    },
    login: {
      status: "idle",
      error: null,
    },
    register: {
      status: "idle",
      error: null,
    },
  },

  reducers: {
    resetEmailStatus : (state) => {
      state.checkEmail.status = "idle";
      state.checkEmail.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkMail.pending, (state) => {
        state.checkEmail.status = "loading";
      })
      .addCase(checkMail.fulfilled, (state, action) => {
        state.checkEmail.status = "success";
        state.checkEmail.hasUser = action.payload;
        state.checkEmail.userMail = action.meta.arg;
      })
      .addCase(checkMail.rejected, (state, action) => {
        state.checkEmail.status = "failed";
        state.checkEmail.error = action.payload;
      });
  },
});

export const {resetEmailStatus} = authSlice.actions;
export default authSlice.reducer;

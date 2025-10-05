import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendBaseApi } from "../../../configs/keys";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const hasUser = await axios.get(`${backendBaseApi}/auth/check`, {
        withCredentials: true,
      });
      return hasUser?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const checkMail = createAsyncThunk(
  "auth/checkMail",
  async (email, { rejectWithValue }) => {
    try {
      const hasUser = await axios.post(`${backendBaseApi}/auth/check/email`, {
        email,
      });
      return hasUser?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const user = await axios.post(`${backendBaseApi}/auth/register`, data);
      return user?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const user = await axios.post(`${backendBaseApi}/auth/login`, data);
      return user?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const verificationLinkSender = createAsyncThunk(
  "auth/verificationLinkSender",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${backendBaseApi}/auth/verify/send`, {
        withCredentials: true,
      });
      return res?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    checkEmail: {
      userMail: "",
      hasUser: null,
      status: "idle",
      error: null,
    },
    verifyLink: {
      message: "",
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
    resetEmailStatus: (state) => {
      state.checkEmail.hasUser = null;
      state.checkEmail.userMail = "";
      state.checkEmail.status = "idle";
      state.checkEmail.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
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
      })
      .addCase(registerUser.pending, (state) => {
        state.register.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.register.status = "success";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.status = "failed";
        state.register.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.login.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.status = "success";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.status = "failed";
        state.login.error = action.payload;
      })
      .addCase(verificationLinkSender.pending, (state) => {
        state.verifyLink.status = "loading";
      })
      .addCase(verificationLinkSender.fulfilled, (state, action) => {
        state.verifyLink.status = "success";
        state.verifyLink.message = action.payload;
      })
      .addCase(verificationLinkSender.rejected, (state, action) => {
        state.verifyLink.status = "failed";
        state.verifyLink.error = action.payload;
      });
  },
});

export const { resetEmailStatus } = authSlice.actions;
export default authSlice.reducer;

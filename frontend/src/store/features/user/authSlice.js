import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendBaseApi } from "../../../configs/keys";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const hasUser = await axios.get(`/api/auth/check`, {
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
      const hasUser = await axios.post(`/api/auth/check/email`, {
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
      const user = await axios.post(`/api/auth/register`, data, {
        withCredentials: true,
      });
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
      const user = await axios.post(`/api/auth/login`, data, {
        withCredentials: true,
      });
      return user?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const verificationLinkSender = createAsyncThunk(
  "auth/verificationLinkSender",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/auth/verify/send`, data, {
        withCredentials: true,
      });
      return res?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const emailVerifier = createAsyncThunk(
  "auth/emailVerifier",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/auth/verify/${token}`, {
        withCredentials: true,
      });
      return res?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/auth/logout`, {
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
      userMail: null,
      hasUser: false,
      status: "idle",
      error: null,
    },
    verifyLink: {
      message: null,
      status: "idle",
      error: null,
    },
    emailVerify: {
      message: null,
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
      state.checkEmail.hasUser = false;
      state.checkEmail.userMail = null;
      state.checkEmail.status = "idle";
      state.checkEmail.error = null;
      state.login.error = null;
      state.register.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload || null;
        state.status = state.user ? "success" : "failed";
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null;
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
        state.status = "success";
        state.user = action.payload;
        state.error= null;
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
        state.status = "success";
        state.user = action.payload;
        state.error= null;
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
      })
      .addCase(emailVerifier.pending, (state) => {
        state.emailVerify.status = "loading";
      })
      .addCase(emailVerifier.fulfilled, (state, action) => {
        state.emailVerify.status = "success";
        state.emailVerify.message = action.payload;
      })
      .addCase(emailVerifier.rejected, (state, action) => {
        state.emailVerify.status = "failed";
        state.emailVerify.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "failed";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetEmailStatus } = authSlice.actions;
export default authSlice.reducer;

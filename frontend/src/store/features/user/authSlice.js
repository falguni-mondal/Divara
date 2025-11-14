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
      const user = await axios.post(`${backendBaseApi}/auth/register`, data, {
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
      const user = await axios.post(`${backendBaseApi}/auth/login`, data, {
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
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${backendBaseApi}/auth/verify/link`, {
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
      const res = await axios.patch(`${backendBaseApi}/auth/verify/email`, {token}, {
        withCredentials: true,
      });
      return res?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const codeSender = createAsyncThunk(
  "auth/codeSender",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backendBaseApi}/auth/sendCode`, {email}, {
        withCredentials: true,
      });
      return res?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const codeVerifier = createAsyncThunk(
  "auth/codeVerifier",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backendBaseApi}/auth/verifyCode`, data, {
        withCredentials: true,
      });
      return res?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const passwordReseter = createAsyncThunk(
  "auth/passwordReseter",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${backendBaseApi}/auth/resetPassword`, data, {
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
      const res = await axios.get(`${backendBaseApi}/auth/logout`, {
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
    codeSender: {
      status: "idle",
      message: null,
      error: null
    },
    codeVerifier: {
      status: "idle",
      message: null,
      error: null
    },
    passwordReseter: {
      status: "idle",
      message: null,
      error: null
    }
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
    resetForgotPasswordState: (state) => {
      state.codeSender.status = "idle";
      state.codeSender.message = null;
      state.codeSender.error = null;

      state.codeVerifier.status = "idle";
      state.codeVerifier.message = null;
      state.codeVerifier.error = null;

      state.passwordReseter.status = "idle";
      state.passwordReseter.message = null;
      state.passwordReseter.error = null;
    }
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
        state.verifyLink.message = null;
        state.verifyLink.error = null;
      })
      .addCase(verificationLinkSender.fulfilled, (state, action) => {
        state.verifyLink.status = "success";
        state.verifyLink.message = action.payload;
        state.verifyLink.error = null;
      })
      .addCase(verificationLinkSender.rejected, (state, action) => {
        state.verifyLink.status = "failed";
        state.verifyLink.error = action.payload;
        state.verifyLink.message = null;
      })

      .addCase(emailVerifier.pending, (state) => {
        state.emailVerify.status = "loading";
        state.emailVerify.message = null;
        state.emailVerify.error = null;
      })
      .addCase(emailVerifier.fulfilled, (state, action) => {
        state.emailVerify.status = "success";
        state.emailVerify.message = action.payload;
        state.emailVerify.error = null;
      })
      .addCase(emailVerifier.rejected, (state, action) => {
        state.emailVerify.status = "failed";
        state.emailVerify.error = action.payload;
        state.emailVerify.message = null;
      })

      .addCase(codeSender.pending, (state) => {
        state.codeSender.status = "loading";
        state.codeSender.message = null;
        state.codeSender.error = null;
      })
      .addCase(codeSender.fulfilled, (state, action) => {
        state.codeSender.status = "success";
        state.codeSender.message = action.payload;
        state.codeSender.error = null;
      })
      .addCase(codeSender.rejected, (state, action) => {
        state.codeSender.status = "failed";
        state.codeSender.error = action.payload;
        state.codeSender.message = null;
      })

      .addCase(codeVerifier.pending, (state) => {
        state.codeVerifier.status = "loading";
        state.codeVerifier.message = null;
        state.codeVerifier.error = null;
      })
      .addCase(codeVerifier.fulfilled, (state, action) => {
        state.codeVerifier.status = "success";
        state.codeVerifier.message = action.payload;
        state.codeVerifier.error = null;
      })
      .addCase(codeVerifier.rejected, (state, action) => {
        state.codeVerifier.status = "failed";
        state.codeVerifier.error = action.payload;
        state.codeVerifier.message = null;
      })

      .addCase(passwordReseter.pending, (state) => {
        state.passwordReseter.status = "loading";
        state.passwordReseter.message = null;
        state.passwordReseter.error = null;
      })
      .addCase(passwordReseter.fulfilled, (state, action) => {
        state.passwordReseter.status = "success";
        state.passwordReseter.message = action.payload;
        state.passwordReseter.error = null;
      })
      .addCase(passwordReseter.rejected, (state, action) => {
        state.passwordReseter.status = "failed";
        state.passwordReseter.error = action.payload;
        state.passwordReseter.message = null;
      })

      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "failed";
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetEmailStatus, resetForgotPasswordState } = authSlice.actions;
export default authSlice.reducer;

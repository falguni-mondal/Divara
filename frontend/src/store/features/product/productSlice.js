import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendBaseApi } from "../../../configs/keys";

export const productAdder = createAsyncThunk(
  "product/productAdder",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/admin/product/add`, data, {
        withCredentials: true,
      });
      return res?.data?.message;
    } catch (err) {
        return rejectWithValue(err?.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    add:{
        status: "idle",
        message: null,
        error: null
    }
  },

  extraReducers: (builder) => {
    builder
    .addCase(productAdder.pending, (state) => {
        state.add.status= "loading";
        state.add.message= null;
        state.add.error= null;
    })
    .addCase(productAdder.fulfilled, (state, action) => {
        state.add.status= "success";
        state.add.message= action.payload;
        state.add.error= null;
    })
    .addCase(productAdder.rejected, (state, action) => {
        state.add.status= "failed";
        state.add.message= null;
        state.add.error= action.payload;
    })
  }
});

export default productSlice.reducer;
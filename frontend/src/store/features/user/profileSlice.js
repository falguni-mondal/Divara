import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const profileUpdater = createAsyncThunk("profile/profileUpdater", async (data, {rejectWithValue}) => {
    const res = await axios.patch(``)
})

const profileSlice = createSlice({
    name : profile,
    initialState : {
        update:{
            status: "idle",
            error: null,
            message: null,
        }
    }


})
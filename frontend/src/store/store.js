import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./features/user/authSlice";
import profileReducer from "./features/user/profileSlice";
export const store = configureStore({
    reducer : {
        auth: authReducer,
        profile: profileReducer,
    },
})

export default store;
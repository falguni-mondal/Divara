import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./features/user/authSlice";
import profileReducer from "./features/user/profileSlice";
import productReducer from "./features/product/productSlice";
export const store = configureStore({
    reducer : {
        auth: authReducer,
        profile: profileReducer,
        product: productReducer,
    },
})

export default store;
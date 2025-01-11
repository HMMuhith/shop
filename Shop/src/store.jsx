import { configureStore } from "@reduxjs/toolkit";
import {shopSlice} from "./shopSlice";
import cartSliceReducer from "./cartslice"
import authSliceReducer from "./authSlice"

const Store=configureStore({
    reducer:{
        [shopSlice.reducerPath]:shopSlice.reducer,
        cart:cartSliceReducer,
        auth:authSliceReducer
    },
    middleware:(getDefaultMiddleware)=>{
      return  getDefaultMiddleware().concat(shopSlice.middleware)}
    
})

export default Store
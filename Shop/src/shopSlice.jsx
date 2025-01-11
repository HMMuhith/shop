import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery=fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,

 prepareHeaders:(Headers,{getState})=>{
    const token=getState().auth.token
    if(token){
        Headers.set('Authorization',token)
    }
    return Headers
 },
 credentials:'include'
    
})

export const shopSlice=createApi({
    reducerPath:'shop',
    baseQuery,
    tagTypes:['Product','Order','User'],
    endpoints:(builder)=>({})
})



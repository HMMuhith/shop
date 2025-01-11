import { createSlice } from "@reduxjs/toolkit";

const initialState={userinfo:localStorage.getItem(`Token-jwt`)?JSON.parse(localStorage.getItem(`Token-jwt`)):null}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        Credentials(state,action){
            state.userinfo=action.payload
            localStorage.setItem(`Token-jwt`,JSON.stringify(action.payload))
        },
        Logout(state,action){
            state.userinfo=null
            localStorage.removeItem(`Token-jwt`)
        }
    }
})

export const {Credentials,Logout}=authSlice.actions

export default authSlice.reducer
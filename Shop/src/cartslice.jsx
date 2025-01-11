import { createSlice } from "@reduxjs/toolkit";
import { UpdateCart } from "./updatecart";

const initialState = localStorage.getItem(`cart`) ? JSON.parse(localStorage.getItem(`cart`)) : { cartItems: [],shipping:{},paymentmethod:`PayPal`,ItemsPrice:null,shipingPrice:null,taxPrice:null,totalPrice:null}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        AddCart(state, action) {
            const Item = action.payload
            const existItem = state.cartItems.find(cp => cp._id === Item._id)
            if (existItem) {
              state.cartItems = state.cartItems.map(cp => cp._id === existItem._id ? Item : cp)
            }
            else {

               state.cartItems = [...state.cartItems, Item]
            }
            return UpdateCart(state)
        },

        RemoveCart(state,action){
            state.cartItems=state.cartItems.filter(cp=>cp._id!==action.payload)
            return UpdateCart(state)
        },
        ShippingAddress(state,action){
            state.shipping=action.payload
            return UpdateCart(state)
         },

        PaymentMethod(state,action){
            state.paymentmethod=action.payload
         },
        ClearCartItems(state,action){
            state.cartItems=[]
            return UpdateCart(state)
        }
    }
})
export const { AddCart,RemoveCart,ShippingAddress,PaymentMethod,ClearCartItems} = cartSlice.actions
export default cartSlice.reducer




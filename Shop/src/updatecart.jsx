export const UpdateCart=(state)=>{
    state.ItemsPrice= Number(state.cartItems.reduce((PrevPrice,CurrentItem)=>PrevPrice+CurrentItem.price * CurrentItem.quantity,0))
    state.shipingPrice=Number(state.ItemsPrice)
    state.taxPrice=Number(state.ItemsPrice*.1) 
    state.totalPrice= Number(state.ItemsPrice+state.shipingPrice+state.taxPrice)
    localStorage.setItem(`cart`,JSON.stringify(state))
}
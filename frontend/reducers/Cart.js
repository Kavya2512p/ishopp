import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice(
    {
        name: "Cart",
        initialState:{
            data: [],
            total:0
        },
        reducers:{
            addToCart(currentState, { payload }){
                // console.log("payload", payload );
                // {pId: 12345578, qty: 2 }
                const found = currentState.data.find(d => d.pId == payload.product_id);

                if(found){
                    found.qty++; 
                }else{
                    currentState.data.push({ pId: payload.product_id, qty:1 });
                }
                currentState.total += Number(payload.price.toFixed(0));
                localStorage.setItem("cart", JSON.stringify(currentState))
            },
            removeFromCart(){

            },
            emptyCart(){

            },
            changeQty(currentState, {payload}){
                const found = currentState.data.find(d => d.pId == payload.pId);
                if( found.qty > payload.new_qty ){
                    currentState.total -= Number(payload.price.toFixed(0));
                }
                else{
                    currentState.total += Number(payload.price.toFixed(0));
                }
                found.qty = payload.new_qty;
                localStorage.setItem("cart", JSON.stringify(currentState))

            },
            lsToCart(currentState){
                const lsCart = localStorage.getItem("cart");
                // console.log(JSON.parse(lsCart));
                if(lsCart != undefined ){
                    const cart = JSON.parse(lsCart);
                    currentState.data = cart.data;
                    currentState.total = cart.total;
                }
            }
        }
    }
)

export const  {addToCart, changeQty, removeFromCart, emptyCart, lsToCart  } = cartSlice.actions;
export default cartSlice.reducer;
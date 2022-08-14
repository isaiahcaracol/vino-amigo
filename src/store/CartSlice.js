import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('adding to cart: ', action.payload);
    },
    removeFromCart: (state, action) => {

    },
    clearCart: (state) => {

    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
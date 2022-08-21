import { createSlice } from "@reduxjs/toolkit";

/*
  Product:
  {
    id: 0,
    quantity: 1,
    price: 1.00,
    image: 'src',
  }
*/

const initialState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.items.push(action.payload);
    },
    increaseQuantity: (state, action) => {
      let id = action.payload;
      let index = state.items.findIndex(item => item.id === id);
      state.items[index].quantity += 1; 
    },
    reduceQuantity: (state, action) => {
      let id = action.payload;
      let index = state.items.findIndex(item => item.id === id);
      if (state.items[index].quantity ==1) {
        state.items.splice(index, 1);
      } else {
        state.items[index].quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { updateCart, increaseQuantity, reduceQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
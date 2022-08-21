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
  totalPrice: 0,
}

const calculateTotal = (items) => {
  let total = 0;
  for (const item of items) {
    total += (item.price * item.quantity)
  }
  return formatPrice(total);
}

const formatPrice = (price) => {
  return ((Math.round(price * 100) / 100).toFixed(2))
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.items.push(action.payload);
      state.totalPrice = calculateTotal(state.items);
    },
    increaseQuantity: (state, action) => {
      let id = action.payload;
      let index = state.items.findIndex(item => item.id === id);
      state.items[index].quantity += 1;
      console.log(calculateTotal(state.items));
      state.totalPrice = calculateTotal(state.items);
    },
    reduceQuantity: (state, action) => {
      let id = action.payload;
      let index = state.items.findIndex(item => item.id === id);
      if (state.items[index].quantity === 1) {
        state.items.splice(index, 1);
      } else {
        state.items[index].quantity -= 1;
      }
      state.totalPrice = calculateTotal(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = calculateTotal(state.items);
    }
  }
});

export const { updateCart, increaseQuantity, reduceQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
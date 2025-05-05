import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItem } from '@/store/models/cart.model';

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const { id, name, price, main_image } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ id, name, price, quantity: 1, main_image });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    incrementCartQuantity: (state, action: PayloadAction<number>) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.quantity += 1;
      }
    },
    decrementCartQuantity: (state, action: PayloadAction<number>) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementCartQuantity, decrementCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;

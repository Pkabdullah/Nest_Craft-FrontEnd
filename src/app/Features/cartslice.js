import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1; // if product already exists in the cart, increment quantity
      } else {
        state.cartItems.push({ ...product, quantity: 1 }); // add product to the cart with initial quantity 1
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.id === productId
      );

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1; // decrement the quantity if it's greater than 1
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== productId
          ); // remove the product from the cart if quantity is 1
        }
      }
    },
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.id === productId
      );
      if (existingProduct) {
        existingProduct.quantity = Math.max(quantity, 1); // Ensure quantity is at least 1
      }
    },
    setCart(state, action) {
      state.cartItems = action.payload;
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity,setCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteItem: [], 
  },
  reducers: {
    addTofavorite(state, action) {
      const product = action.payload;
      const existingProduct = state.favoriteItem.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1; // if product already exists in the favorite, increment quantity
      } else {
        state.favoriteItem.push({ ...product, quantity: 1 }); // add product to the favorite with initial quantity 1
      }
    },
    removeFromfavorite(state, action) {
      const productId = action.payload;
      state.favoriteItem = state.favoriteItem.filter((item) => item.id !== productId); // remove the product from the cart
    },
   
  },
});

export const { addTofavorite, removeFromfavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

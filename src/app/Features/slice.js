import { createSlice } from "@reduxjs/toolkit";


const viewProductSlice = createSlice({
  name: "view",
  initialState: {
    viewProduct: [],
    ViewProductCategory:[],
    selectedProduct:[],
    orders:[]
    
  },
  reducers: {
    setviewProduct(state, action) {
      state.viewProduct = action.payload;
    },
    setviewProductCategory(state, action) {
      state.ViewProductCategory = action.payload;
    },
    setselectedProduct(state,action){
      state.selectedProduct= action.payload
    },
    setOrder(state,action){
      state.orders=action.payload
    },
  },
});
export const {setviewProduct,setviewProductCategory,setselectedProduct,setOrder} = viewProductSlice.actions
export default viewProductSlice.reducer
// const initialState = {
//   viewProduct: null, 
//   recentlyViewedProducts: [], 
// };

// export const viewProductSlice = createSlice({
//   name: 'view',
//   initialState,
//   reducers: {
//     setViewProduct: (state, action) => {
//       state.viewProduct = action.payload;
//       // Add the product to recently viewed, if it's not already there
//       if (!state.recentlyViewedProducts.some(p => p.id === action.payload.id)) {
//         state.recentlyViewedProducts.push(action.payload);
//       }
//     },
//   },
// });

// export const { setViewProduct } = viewProductSlice.actions;
// export default viewProductSlice.reducer;

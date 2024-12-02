import { configureStore, combineReducers } from "@reduxjs/toolkit";
import viewProductSlice from "./slice.js";
import cartSlice from "./cartslice.js";
import favoriteSlice from "./favoriteslice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Persist configuration for the cart slice only
const persistConfig = {
  key: "cart",
  storage,
  whitelist: ["cart","favorite","view"], // Only persist the cart slice
};

// Combine reducers
const rootReducer = combineReducers({
  view: viewProductSlice,
  cart: cartSlice,
  favorite: favoriteSlice,
});

// Create the persisted reducer for the store
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor for your store
export const persistor = persistStore(store);

export default store;


// import { configureStore } from "@reduxjs/toolkit"
// import viewProductSlice from "./slice.js"
// import cartSlice from "./cartslice.js"
// import favoriteSlice from "./favoriteslice.js"


// const store =configureStore({
//     reducer:{
//         view:viewProductSlice,
//         cart:cartSlice,
//         favorite:favoriteSlice
//     }
// })
// export default store
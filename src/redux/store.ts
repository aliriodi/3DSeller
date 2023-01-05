import  { configureStore } from "@reduxjs/toolkit";
import products from "./DSellerSlice"

export const store = configureStore  ({
  reducer:{
    products:products,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export default configureStore ({
//          reducer:{
//            products:products,
//          }
// })
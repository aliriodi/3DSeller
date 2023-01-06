import { createSlice} from "@reduxjs/toolkit";
//import type { PayloadAction } from '@reduxjs/toolkit'

export interface DSellerStateProucts {
  products: object,
  count:number,
  detail:object,
  newProduct: object,
}

const initialState: DSellerStateProucts = {
  products:[],
  count:0,
  detail:{},
  newProduct: {}
}
export const DSellerSlice = createSlice ({
         name: "products",
         initialState,
  reducers:{ 

    getAllProducts: (state,action)=>{
        state.products = action.payload,
        state.count = action.payload.length
    },
    getProductById: (state,action)=>{
        state.detail = action.payload,
        state.count = action.payload._id? 1:0;
    },
    postCreateProductS:(state,action)=>{
        state.newProduct = action.payload
    }
  }
})
 
export const {getAllProducts , getProductById , postCreateProductS} = DSellerSlice.actions;

export default DSellerSlice.reducer 

import {getAllProducts , getProductById} from "./DSellerSlice";

export const  getProducts=  () => async (dispatch) => {
   //await  fetch('http://127.0.0.1:3001/api/products')
    await  fetch('http://127.0.0.1:3000/api/products')
    .then(response=> response.json() )
    .then(myJson  => dispatch(getAllProducts( myJson )) )
    .catch(error => console.log(error));
   }

export const  getProductDet=  (id) => async (dispatch) => {
       await fetch('')  
     await  fetch('http://127.0.0.1:3001/api/products/'+id)
    .then(response=> response.json() )
    .then(myJson  => dispatch(getProductById( myJson )) )
    .catch(error => console.log(error));
   }
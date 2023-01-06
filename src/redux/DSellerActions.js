import {getAllProducts , getProductById, postCreateProductS} from "./DSellerSlice";

export const  getProducts=  () => async (dispatch) => {
    await  fetch('http://127.0.0.1:3000/api/products')
    .then(response=> response.json() )
    .then(myJson  => dispatch(getAllProducts( myJson )) )
    .catch(error => console.log(error));
   } 

export const  getProductDet=  (id) => async (dispatch) => {
     await  fetch('http://127.0.0.1:3000/api/products/'+id)
    .then(response=> response.json() )
    .then(myJson  => dispatch(getProductById( myJson )) )
    .catch(error => console.log(error));
   }

   export const  postCreateProduct=  (product) => async (dispatch) => {
      await fetch("http://localhost:3000/api/products/",
      {method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(product)})
     .then(response=> response.json() )
     .then(myJson  => dispatch(postCreateProductS( myJson )) )
     .catch(error => console.log(error));
    }
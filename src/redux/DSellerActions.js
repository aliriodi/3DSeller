import {
  getAllProducts,
  getProductById,
  postCreateProductS,
  getRenderS,
  resetRqstS,
  getUserS,
  getAllUserS,
  addFavoritos,
  replaceFavoritos,
  getUserBDLS,
  postCreateUserS,
  modificarUserS
} from "./DSellerSlice";

export const getLOGOUT = () => async (dispatch) => {
  await fetch("/api/user")
    .then((response) => response.json())
    .then(json => console.log(json))
    .catch((error) => console.log(error));
};

export const setFavoritos = (props) => (dispatch) => {
  dispatch(addFavoritos(props));
};

export const chngFavoritos = (props) => (dispatch) => {
  dispatch(replaceFavoritos(props));
};

export const PutFavorite = (sendDb) => async () => {
   await  fetch('/api/user/'+sendDb.user.email, {
   method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({favorites:sendDb.favorites,
                           name:sendDb.user.name, 
                           rol:sendDb.user.rol,
                           picture:sendDb.user.picture, 
                           email:sendDb.user.email}),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const GetUserBDL = (email) => async (dispatch) => {
     await  fetch('/api/user/'+email)
    .then((response) => response.json())
    .then(json => dispatch(getUserBDLS(json)))
    .catch((error) => console.log(error));
};



export const getRender = (state) => async (dispatch) => {
  dispatch(getRenderS(state));
};

export const resetState = (cFO, filtersAord) => async (dispatch) => {
  dispatch(resetRqstS([cFO, filtersAord]));
};

export const getUser = (username) => async (dispatch) => {
  if(username==='invitado'){dispatch(getUserS({name:'Invitado',rol:'invitado'}))}
  else{
  await fetch("/api/auth/me", {
    mode: "cors",
    headers: { "Access-Control-Allow-Origin": "*" },
  })
      .then((response) => {console.log(response)
                           if(response.status===204){
                            //usuario no logeado
                            dispatch(getUserS({name:'Invitado',rol:'invitado'}))
                           }
                           if(response.status===200){
                            //usuario logueado en auth0
                            console.log('status 200')
                            console.log(response)
                             fetch("/api/auth/me", {
                              mode: "cors",
                              headers: { "Access-Control-Allow-Origin": "*" },
                            })
                            .then(response=>response.json())
                            .then(json=>
                              { console.log(json)
                              //aca lo mando contra la BDL y sus propiedades
                                 fetch("/api/user/"+json.email)
                                .then((response) => response.json())
                                .then(user=> dispatch(getUserS(user)))
                              })
                              .then(()=>fetch(" https://threed.us.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A3000&client_id=J3fAsBH2xLotpS7rYIdyPQAGCs38mojc", {
                                mode: "cors",
                                method: "POST",
                                headers: { "Access-Control-Allow-Origin": "*" },
                              }))
                           }                                          
      })
    .catch((error) => console.log(error));
}};

export const getAllUser = () => async (dispatch) => {
  await  fetch('/api/user')
 .then((response) => response.json())
 .then(json => dispatch(getAllUserS(json)))
 .catch((error) => console.log(error));
};

export const getProducts = () => async (dispatch) => {
  await fetch("/api/products")
    .then((response) => response.json())
    .then((myJson) => dispatch(getAllProducts(myJson)))
    .catch((error) => console.log(error));
};

export const getProductDet = (id) => async (dispatch) => {
  await fetch("/api/products/" + id)
    .then((response) => response.json())
    .then((myJson) => dispatch(getProductById(myJson)))
    .catch((error) => console.log(error));
};


export const postCreateProduct = (product) => async (dispatch) => {
  await fetch("/api/products/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((myJson) => dispatch(postCreateProductS(myJson)))
    .catch((error) => console.log(error));
};

export const modificarUser = (user) => async (dispatch) => {
  await fetch("/api/user/"+user.email, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((myJson) =>dispatch(modificarUserS(myJson)))
    .catch((error) => console.log(error));
};
export const postCreateUser = (user) => async (dispatch) => {
  await fetch("/api/user/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((myJson) =>postCreateUserS(myJson))
    .catch((error) => console.log(error));
};
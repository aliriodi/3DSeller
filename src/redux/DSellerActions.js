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
  modificarUserS,
  PUT_PRODUCT,
} from "./DSellerSlice";

export const getLOGOUT = () => async (dispatch) => {
  await fetch("/api/user")
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
};

export const setFavoritos = (props) => (dispatch) => {
  dispatch(addFavoritos(props));
};

export const chngFavoritos = (props) => (dispatch) => {
  dispatch(replaceFavoritos(props));
};

export const PutFavorite = (sendDb) => async () => {
  await fetch("/api/user/" + sendDb.user.email, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      favorites: sendDb.favorites,
      name: sendDb.user.name,
      rol: sendDb.user.rol,
      picture: sendDb.user.picture,
      email: sendDb.user.email,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const GetUserBDL = (email) => async (dispatch) => {
   if(email){ email=email}else{ email="invitado"}
  await fetch("/api/user/" + email)
    .then((response) => response.json())
    .then((json) => { dispatch(getUserBDLS(json)); console.log(json) })
    .catch((error) => console.log(error));
   };

export const getRender = (state) => async (dispatch) => {
  dispatch(getRenderS(state));
};

export const resetState = (cFO, filtersAord) => async (dispatch) => {
  dispatch(resetRqstS([cFO, filtersAord]));
};

export const getUser = () => async (dispatch) => {
  await fetch("/api/auth/me", {
    mode: "cors",
    headers: { "Access-Control-Allow-Origin": "*" },
  })
      .then((response) => {if(response.status===204){return {email:'invitado'}} else {return response.json()}})
    .then((myJson) => {dispatch(getUserS(myJson)); return myJson })
    .then((myJson)=> dispatch(GetUserBDL(myJson.email)))
    .catch((error) => console.log(error));
};

export const getAllUser = () => async (dispatch) => {
  await fetch("/api/user")
    .then((response) => response.json())
    .then((json) => dispatch(getAllUserS(json)))
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
  await fetch("/api/user/" + user.email, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((myJson) => dispatch(modificarUserS(myJson)))
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
    .then((myJson) => postCreateUserS(myJson))
    .catch((error) => console.log(error));
};

export const putProduct = (props) => async (dispatch) => {
  await fetch("/api/products/" + props._id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  })
    .then((response) => response.json())
    .then((myJson) => dispatch(PUT_PRODUCT(myJson)))
    .catch((error) => console.log(error));
};

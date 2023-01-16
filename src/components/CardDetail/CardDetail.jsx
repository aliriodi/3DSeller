import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDet, chngFavoritos, setFavoritos } from "../../redux/DSellerActions";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import FavButton from "components/FavButton/FavButton";
//import { useParams  } from 'react-router-dom';
import { useRouter } from 'next/router'

function CardDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {id} = router.query;

  const { favorites } = useSelector((state) => state.products);
  const  productsDetail  =  useSelector(state => state.products.detail);  

  const [favState, setFavState] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      dispatch(chngFavoritos(favorites));
    }
  }, []);

  useEffect(() => {
    const favIsActive = favorites.find((r) => r.id === id);

    // Declaracion de ID
    if(router.isReady){ 
      dispatch(getProductDet(id))
    };

    // Declaracion de Favoritos
    if (favIsActive) {
      setFavState(true);
    } else {
      setFavState(false);
    }
  }, [favorites, id]);

  //#region Favoritos
  const agregarFAv = () => {
    dispatch(setFavoritos({
      id:productsDetail._id,
      image:productsDetail.image,
      name:productsDetail.name,
      rating:productsDetail.rating
    }));
  };

  const quitarFav = () => {
    const filtrados = favorites.filter((e) => e.id !== id);
    dispatch(chngFavoritos(filtrados));
  };
  //#endregion

  return (
    <>
                       <div className={`detail-content`}>

                            {/* IMG */}
                            <div className="detail-item">
                               <img src={productsDetail.image}/>
                            </div>

                            {/* TEXT */}
                            <div className="detail-item detail-item_text">
                              {/* Name */}
                              <div className="detail-item_item">
                                <h1>{productsDetail.name}</h1>
                              </div>
                              {/* Rating */}
                              <div className="detail-item_item detail_id">
                                <h3>Rating:</h3>
                                <h3>{productsDetail.rating}</h3>
                              </div>
                              {/* Stock */}
                              <div className="detail-item_item detail_id">
                                <h3>Stock:</h3>
                                <h3>{productsDetail.stock}</h3>
                              </div>
                              {/* Price */}
                              <div className="detail-item_item detail_id">
                                <h3>Price:</h3>
                                <h3 className="detail-item_item-text">${productsDetail.price}</h3>
                              </div>
                              {/* Fav button */}
                              <div className="btn-container">
                                <span className="btn" onClick={favState?quitarFav:agregarFAv}>
                                  {favState?"Quitar de  Favoritos":"Favoritos"}
                                </span>
                              </div>
                            </div>
                            <div></div>
                            {/* <PayPalScriptProvider className="btn-container" options={{ "client-id": "ATkacPNlx1rEm20wznSCEFxJN9DoXoURPhNGwkz1F8UPdxwcz5fGrtPmtc9OVjyQrp09liKLtK4xntHs" }}>
                              <PayPalButtons className="btn"/>
                            </PayPalScriptProvider> */}
                              </div>
                              
                              {/* Descripcion */}
                              <div className="data-container detail-item_item">
                                <h3>Descripcion</h3>
                                <div className="summary">
                                 {productsDetail.description}
                                  </div>
                               </div>

                               {/* Categorias */}
                               <div className="data-container detail-item_item">
                                <h3>Categorias:</h3>
                                <div className="summary diets-container">
                                  {productsDetail.category}
                                </div>
                               </div>
                  </>
  )
}

export default CardDetail
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDet, putProduct, Limpiar } from "../../redux/DSellerActions";
import { useRouter } from "next/router";
import axios from "axios";
import ReviewList from "./ReviewList";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
//////////////////////////////////////////////////////////////////////////

function CardDetail() {
  const { user, isLoading } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const productsDetail = useSelector((state) => state.products.detail);
  const { userL, compras } = useSelector((state) => state.products);
  const [show, setShow] = useState(0);

  const calculateRating = () => {
    let newRating = 0;

    productsDetail.review?.forEach((rev) => {
      let rating = +rev.rating;
      newRating += rating;
    });
    newRating = isNaN(newRating / productsDetail.review?.length)
      ? 0
      : newRating / productsDetail.review?.length;

    // console.log("RATING", newRating.toFixed(2));

    return +newRating.toFixed(2);
  };

  useEffect(() => {
    if (router.isReady) {
      dispatch(getProductDet(id));
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (compras) {
      //console.log("productos", productsDetail._id);
      //console.log("compras", compras[0].product.id);
      const exist = compras.find((r) => r.product.id === productsDetail._id);
      console.log("exist", exist);
      if (exist) {
        setShow(true);
        //console.log("exist", exist);
        console.log("show primero", show);
      } else {
        setShow(false);
        console.log("exist", exist);
        console.log("show", show);
      }
    } else {
      console.log("no hay nada :C ");
    }

    if (
      calculateRating() != productsDetail.rating &&
      productsDetail.rating != undefined
    ) {
      dispatch(
        putProduct({
          _id: productsDetail._id,
          rating: calculateRating(),
        })
      );
    }
    //console.log("RATING USE", calculateRating());
    //console.log("RATING CURRENT", productsDetail.rating);
  }, [productsDetail, compras]);

  useEffect(() => {
    const limpio = [];
    return dispatch(Limpiar(limpio));
  }, [dispatch]);

  //#region Agregar Reseña
  const [commentaryError, setCommentaryError] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const [currentReview, setCurrentReview] = useState({
    user_email: userL.email,
    rating: 0,
    commentary: "",
  });

  useEffect(() => {
    setCurrentReview({ ...currentReview, user_email: userL.email });
  }, [userL]);

  const handleReviewChange = (e) => {
    if (userL.email != currentReview.user_email)
      setCurrentReview({ ...currentReview, user_email: userL.email });
    setCurrentReview({ ...currentReview, [e.target.name]: e.target.value });
  };

  const addReview = () => {
    //Ver que no haya Errores
    let ratingLocalError = false;
    let commentLocalError = false;

    if (currentReview.rating <= 0) {
      ratingLocalError = true;
    } else ratingLocalError = false;

    if (currentReview.commentary.length <= 0) {
      commentLocalError = true;
    } else commentLocalError = false;

    setRatingError(ratingLocalError);
    setCommentaryError(commentLocalError);

    if (ratingLocalError || commentLocalError) {
      return;
    }
    let changeREVIEWS = []
    //Si usuario modifica reviews se borra el de el y se manda los otros 
    //para agregar el review modificado, elimina los existentes por el usuario primero
    if(productsDetail.review.length!==0){
      productsDetail.review.map(review => review.user_email===userL.email?null:changeREVIEWS.push(review))
    }
    
    console.log("no tubo error", currentReview);
    //Se Actualiza el Producto
    dispatch(
      putProduct({
         _id: productsDetail._id,
        review:  [currentReview].concat(changeREVIEWS),
      })
    );

    setCurrentReview({
      user_email: userL.email,
      rating: 0,
      commentary: "",
    });
  };
  //#endregion
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    //Validacion

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
       <div className="paypal-button">
        <PayPalButtons
          style={{  color: "black", layout: "horizontal" }}
          disabled={false}
          forceReRender={[
            productsDetail.price,
            " USD",
            { layout: "horizontal", color: "yellow" },
          ]}
          fundingSource={undefined}
          createOrder={async (data, actions) => {
            const orderId = await actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: Math.ceil(productsDetail.price / 300),
                  },
                },
              ],
            });
            return orderId;
          }}
          onApprove={async function (data, actions) {
            console.log("compra aprovada");
            await actions.order.capture();
            // Your code here after capture the order
            let purchaseData = await actions.order.get();
            const data_1 = purchaseData;
            let response = await handlePurchaseStoring(data_1, user.email, id);
            if (response.status === "success") {
              await handleSentMail(data_1, user);
            }
            return await response;
          }}
          onCancel={(data) => console.log("Compra Cancelada")}
        />
        </div>
      </>
    );
  };

  const handleSentMail = async (purchase, user) => {
    let response = await axios.post("/api/payment/mail-customer", {
      purchase,
      user,
    });
    return response.data;
  };
  const handlePurchaseStoring = async (purchase, email, productId) => {
    let userQuery = await axios.get(`/api/user/${email}`);
    let productQuery = await axios.get(`/api/products/${productId}`);
    let response = await axios.post("/api/purchase", {
      purchase,
      user: userQuery.data,
      product: productQuery.data,
    });
    return response.data;
  };

  return (
    <>
      <div className={"detail-content"}>
        {/* IMG */}
        <div className="detail-item">
          <img src={productsDetail.image} />
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

          {/* Boton de Descarga */}
          {userL.rol === "admin" ? (
            <div className="detail-item_item detail_id">
              <div className="btn-container">
                <a
                  href={productsDetail.file}
                  legacyBehavior
                  className={`${productsDetail.file ? "btn" : "notFound-text"}`}
                >
                  {productsDetail.file ? "Descargar" : "No posee archivo STL"}
                </a>
              </div>
            </div>
          ) : null}

          <div
            style={{
              width: "260px",
              height: "80px",
              background: "transparent",
            }}
          >
            {isLoading ? (
              <h3>Loading...</h3>
            ) : !user || userL.rol == "invitado" ? (
                  userL.name==='Invitado'?
                   <button onClick={() => router.push("/api/auth/login")}
                   className="btn-submit"> Accede </button>
                    :
                   <button onClick={() => router.push("/validacion")}
                    className="btn-submit"> Validacion </button>

            ) : userL.rol == "admin" ? (
              ""
            ) : (
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "ATkacPNlx1rEm20wznSCEFxJN9DoXoURPhNGwkz1F8UPdxwcz5fGrtPmtc9OVjyQrp09liKLtK4xntHs",
                  components: "buttons",
                  currency: "USD",
                }}
              >
                <ButtonWrapper currency={"USD"} showSpinner={false} />
              </PayPalScriptProvider>
            )}
          </div>
        </div>
      </div>

      {/* Descripcion */}
      <div className="data-descripcion">
        <p>{productsDetail.description}</p>
      </div>

      {/* Formulario de Reseñas */}
      {show === true ? (
        <form
          className={`review-form ${
            userL.email == "invitado" ? "desactive" : null
          }`}
        >
          <div className="review-form_data">
            <h3>{userL.email}</h3>

            {/* Rating */}
            <div className="rating-container">
              <div className="rating-star">
                <label
                  className={`${
                    currentReview.rating >= 1 ? "star-on" : "star-off"
                  }`}
                  htmlFor="start1"
                >
                  {currentReview.rating >= 1 ? "★" : "☆"}
                </label>
                <input
                  type={"radio"}
                  name="rating"
                  value={1}
                  onChange={handleReviewChange}
                  id="start1 "
                />
              </div>

              <div className="rating-star">
                <label
                  className={`${
                    currentReview.rating >= 2 ? "star-on" : "star-off"
                  }`}
                  htmlFor="start1"
                >
                  {currentReview.rating >= 2 ? "★" : "☆"}
                </label>
                <input
                  type={"radio"}
                  name="rating"
                  value={2}
                  onChange={handleReviewChange}
                  id="start1 "
                />
              </div>

              <div className="rating-star">
                <label
                  className={`${
                    currentReview.rating >= 3 ? "star-on" : "star-off"
                  }`}
                  htmlFor="start1"
                >
                  {currentReview.rating >= 3 ? "★" : "☆"}
                </label>
                <input
                  type={"radio"}
                  name="rating"
                  value={3}
                  onChange={handleReviewChange}
                  id="start1 "
                />
              </div>

              <div className="rating-star">
                <label
                  className={`${
                    currentReview.rating >= 4 ? "star-on" : "star-off"
                  }`}
                  htmlFor="start1"
                >
                  {currentReview.rating >= 4 ? "★" : "☆"}
                </label>
                <input
                  type={"radio"}
                  name="rating"
                  value={4}
                  onChange={handleReviewChange}
                  id="start1 "
                />
              </div>

              <div className="rating-star">
                <label
                  className={`${
                    currentReview.rating >= 5 ? "star-on" : "star-off"
                  }`}
                  htmlFor="start1"
                >
                  {currentReview.rating >= 5 ? "★" : "☆"}
                </label>
                <input
                  type={"radio"}
                  name="rating"
                  value={5}
                  onChange={handleReviewChange}
                  id="start1 "
                />
              </div>
            </div>
          </div>
          <p className={`error-rating ${ratingError ? null : "desactive"}`}>
            Es Necesario Poner un Puntaje
          </p>

          {/* Commentary */}
          <textarea
            type="text"
            name="commentary"
            placeholder="Escribe una Reseña"
            onChange={handleReviewChange}
          />
          <p
            className={`error-commentary ${
              commentaryError ? null : "desactive"
            }`}
          >
            Es Necesario Escribir una Reseña
          </p>
          <div className="btn-container">
            <span className="btn" onClick={addReview}>
              Agregar Reseña
            </span>
          </div>
        </form>
      ) : null}

      {/* Reseñas */}
      
      <div className="reviews-container">
        {productsDetail.review && productsDetail.review.length > 0 ? (
          productsDetail.review.map((review) => {
            return (
              <ReviewList
                key={productsDetail.review.indexOf(review)}
                email={review.user_email}
                rating={review.rating}
                commentary={review.commentary}
              />
            );
          })
        ) : (
          <p className={`notFound-text`}>No Se Encontraron Reseñas</p>
        )}
      </div>
    </>
  );
}

export default CardDetail;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDet, putProduct } from "../../redux/DSellerActions";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import imgIcon from "../LogButton/perfil-icon_default.png"
import ReviewList from "./ReviewList"
import { useUser } from '@auth0/nextjs-auth0/client'

function CardDetail() {
  const { user, isLoading } = useUser()
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const productsDetail = useSelector((state) => state.products.detail);
  const { userL } = useSelector((state) => state.products);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (router.isReady) {
      dispatch(getProductDet(id));
    }
    // eslint-disable-next-line
  }, [id]);

  //#region Agregar Reseña
  const [commentaryError, setCommentaryError] = useState(false)
  const [ratingError, setRatingError] = useState(false)
  const [currentReview, setCurrentReview] = useState({
    user_email: userL.email,
    rating: 0,
    commentary: ""
  })

  useEffect(() => {
    setCurrentReview({ ...currentReview, user_email: userL.email })
  }, [userL])

  const handleReviewChange = (e) => {
    if (userL.email != currentReview.user_email) setCurrentReview({ ...currentReview, user_email: userL.email })
    setCurrentReview({ ...currentReview, [e.target.name]: e.target.value })
  }

  const addReview = () => {
    let newRating = 0;

    // Calcula el Nuevo Rating
    productsDetail.review?.forEach(rev => {
      let rating = +rev.rating
      newRating += rating;
    })
    newRating += +currentReview.rating;
    newRating = (newRating / productsDetail.review?.length);

    //Ver que no haya Errores
    let ratingLocalError = false
    let commentLocalError = false

    if (currentReview.rating <= 0) {
      ratingLocalError = true
    }
    else ratingLocalError = false

    if (currentReview.commentary.length <= 0) {
      commentLocalError = true
    }
    else commentLocalError = false

    setRatingError(ratingLocalError)
    setCommentaryError(commentLocalError)

    if (ratingLocalError || commentLocalError) {
      return
    }

    console.log("no tubo error", currentReview)
    //Se Actualiza el Producto
    dispatch(putProduct({
      _id: productsDetail._id,
      rating: newRating.toFixed(2),
      review: [
        ...productsDetail.review,
        currentReview
      ]
    }))

    setCurrentReview({
      user_email: userL.email,
      rating: 0,
      commentary: ""
    })
  }
  //#endregion
  const handleSentMail = async (orderLink, email = user.email, nickname = user.nickname) => {
    let response = await axios.post('/api/payment/mail-customer', {
      link: orderLink,
      email,
      nickname
    })
    return response.data
  }

  

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
          <div style={{ width: "260px", height: "80px", background: "transparent" }}>
            {isLoading ? (<h3>Loading...</h3>) : !user ? (<button onClick={() => router.push('/api/auth/login')} className="btn-submit">Sign in to buy</button>) :
              <PayPalScriptProvider options={{ "client-id": 'ATkacPNlx1rEm20wznSCEFxJN9DoXoURPhNGwkz1F8UPdxwcz5fGrtPmtc9OVjyQrp09liKLtK4xntHs' }}>
                <PayPalButtons createOrder={async () => {
                  try {
                    const payload = { productID: id }
                    const response = await axios.post('/api/payment/paypal/', payload)
                    // console.log(response.data)
                    await handleSentMail(response.data.links)
                    return response.data.id
                  } catch (error) {
                    console.log(error)
                  }
                }}
                  onCancel={(data) => console.log("Compra Cancelada")}
                  onApprove={(data, actions) => {

                    actions.order.capture
                  }}
                  style={{ layout: "horizontal", color: "black" }} />
              </PayPalScriptProvider>
            }
          </div>
        </div>
      </div>

      {/* Descripcion */}
      <div className="data-descripcion">
        <p>{productsDetail.description}</p>
      </div>

      {/* Formulario de Reseñas */}
      <form className={`review-form ${userL.email == "invitado" ? "desactive" : null}`}>
        <div className="review-form_data">
          <h3>{userL.email}</h3>

          {/* Rating */}
          <div className="rating-container">

            <div className="rating-star">
              <label className={`${currentReview.rating >= 1 ? "star-on" : "star-off"}`}
                for="start1">
                {currentReview.rating >= 1 ? "★" : "☆"}
              </label>
              <input
                type={"radio"}
                name="rating"
                value={1}
                onChange={handleReviewChange}
                id="start1 " />
            </div>

            <div className="rating-star">
              <label className={`${currentReview.rating >= 2 ? "star-on" : "star-off"}`}
                for="start1">
                {currentReview.rating >= 2 ? "★" : "☆"}
              </label>
              <input
                type={"radio"}
                name="rating"
                value={2}
                onChange={handleReviewChange}
                id="start1 " />
            </div>

            <div className="rating-star">
              <label className={`${currentReview.rating >= 3 ? "star-on" : "star-off"}`}
                for="start1">
                {currentReview.rating >= 3 ? "★" : "☆"}
              </label>
              <input
                type={"radio"}
                name="rating"
                value={3}
                onChange={handleReviewChange}
                id="start1 " />
            </div>

            <div className="rating-star">
              <label className={`${currentReview.rating >= 4 ? "star-on" : "star-off"}`}
                for="start1">
                {currentReview.rating >= 4 ? "★" : "☆"}
              </label>
              <input
                type={"radio"}
                name="rating"
                value={4}
                onChange={handleReviewChange}
                id="start1 " />
            </div>

            <div className="rating-star">
              <label className={`${currentReview.rating >= 5 ? "star-on" : "star-off"}`}
                for="start1">
                {currentReview.rating >= 5 ? "★" : "☆"}
              </label>
              <input
                type={"radio"}
                name="rating"
                value={5}
                onChange={handleReviewChange}
                id="start1 " />
            </div>

          </div>

        </div>
        <p className={`error-rating ${ratingError ? null : "desactive"}`}>Es Necesario Poner un Puntaje</p>

        {/* Commentary */}
        <textarea
          type="text"
          name="commentary"
          placeholder="Escribe una Reseña"
          onChange={handleReviewChange}
        />
        <p className={`error-commentary ${commentaryError ? null : "desactive"}`}>Es Necesario Escribir una Reseña</p>
        <div className="btn-container">
          <span className="btn" onClick={addReview}>Agregar Reseña</span>
        </div>
      </form>

      {/* Reseñas */}
      <div className="reviews-container">
        {productsDetail.review &&
          productsDetail.review.length > 0 ?
          productsDetail.review.map((review) => {
            return (
              <ReviewList
                key={productsDetail.review.indexOf(review)}
                email={review.user_email}
                rating={review.rating}
                commentary={review.commentary}
              />
            )
          }) : <p className={`notFound-text`}>No Se Encontraron Reseñas</p>}
      </div>
    </>
  );
}

export default CardDetail;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDet, putProduct } from "../../redux/DSellerActions";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import imgIcon from "../LogButton/perfil-icon_default.png"
import ReviewList from "./ReviewList"

function CardDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const productsDetail = useSelector((state) => state.products.detail);
  const {userL} = useSelector((state) => state.products);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const createOrder = async (data, actions) => {
    setLoading(true);
  };
  
  useEffect(() => {
    if (router.isReady) {
      dispatch(getProductDet(id));
    }
    // eslint-disable-next-line
  }, [id]);


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
            <PayPalScriptProvider options={{ "client-id": 'ATkacPNlx1rEm20wznSCEFxJN9DoXoURPhNGwkz1F8UPdxwcz5fGrtPmtc9OVjyQrp09liKLtK4xntHs' }}>
              <PayPalButtons createOrder={async () => {
                try {
                  const response = await axios({
                    url: `/api/payment/${products.Detail.price}`,
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    }
                  })
                  return response.data.id
                } catch(error) {
                  console.log(error)
                }
              }} 
              onCancel={(data)=> console.log("Compra Cancelada")} 
              onApprove={(data, actions) => {
                console.log(data)
                actions.order.capture
              }}
              style={{ layout: "horizontal", color: "black" }} />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>

      {/* Descripcion */}
      <div className="data-descripcion">
        <p>{productsDetail.description}</p>
      </div>

      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
        <PayPalScriptProvider
          clientId={
            "ATkacPNlx1rEm20wznSCEFxJN9DoXoURPhNGwkz1F8UPdxwcz5fGrtPmtc9OVjyQrp09liKLtK4xntHs"
          }
          onError={(error) => console.log(error)}
          options={{
            "client-id": "test",
            components: "buttons",
            currency: "USD",
          }}
        >
          <ButtonWrapper currency={currency} showSpinner={false} />
        </PayPalScriptProvider>
      </div>

      {/* <PayPalButtons                                      
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={onCancel}
        /> */}
      {/* <PayPalScriptProvider
        clientId={'ATkacPNlx1rEm20wznSCEFxJN9DoXoURPhNGwkz1F8UPdxwcz5fGrtPmtc9OVjyQrp09liKLtK4xntHs'}
        onError={(error) => console.log(error)}
      >
       
        
      </PayPalScriptProvider> */}

      {/* Formulario de Reseñas */}
      <form className={`review-form`}>
        <div className="review-form_data">
          <h3>{userL.email}</h3>

        {/* Rating */}
        <div className="rating-container">
          
          <div className="rating-star">
            <label className={`${currentReview.rating >= 1?"star-on":"star-off"}`}
            for="start1">
              {currentReview.rating >= 1?"★":"☆"}
            </label>
            <input
            type={"radio"}
            name="rating"
            value={1}
            onChange={handleReviewChange}
            id="start1 "/>
          </div>
          
          <div className="rating-star">
            <label className={`${currentReview.rating >= 2?"star-on":"star-off"}`}
            for="start1">
              {currentReview.rating >= 2?"★":"☆"}
            </label>
            <input
            type={"radio"}
            name="rating"
            value={2}
            onChange={handleReviewChange}
            id="start1 "/>
          </div>
          
          <div className="rating-star">
            <label className={`${currentReview.rating >= 3?"star-on":"star-off"}`}
            for="start1">
              {currentReview.rating >= 3?"★":"☆"}
            </label>
            <input
            type={"radio"}
            name="rating"
            value={3}
            onChange={handleReviewChange}
            id="start1 "/>
          </div>
          
          <div className="rating-star">
            <label className={`${currentReview.rating >= 4?"star-on":"star-off"}`}
            for="start1">
              {currentReview.rating >= 4?"★":"☆"}
            </label>
            <input
            type={"radio"}
            name="rating"
            value={4}
            onChange={handleReviewChange}
            id="start1 "/>
          </div>
          
          <div className="rating-star">
            <label className={`${currentReview.rating >= 5?"star-on":"star-off"}`}
            for="start1">
              {currentReview.rating >= 5?"★":"☆"}
            </label>
            <input
            type={"radio"}
            name="rating"
            value={5}
            onChange={handleReviewChange}
            id="start1 "/>
          </div>
          
        </div>

        </div>
        <p className={`error-rating ${ratingError?null:"desactive"}`}>Es Necesario Poner un Puntaje</p>

        {/* Commentary */}
        <textarea
        type="text"
        name="commentary"
        placeholder="Escribe una Reseña"
        onChange={handleReviewChange}
        />
        <p className={`error-commentary ${commentaryError?null:"desactive"}`}>Es Necesario Escribir una Reseña</p>
        <div className="btn-container">
          <span className="btn" onClick={addReview}>Agregar Reseña</span>
        </div>
      </form>

      {/* Reseñas */}
      <div className="reviews-container">
        {productsDetail.review &&
        productsDetail.review.length > 0?
        productsDetail.review.map((review)=>{
          return(
            <ReviewList
            key = {productsDetail.review.indexOf(review)}
            email ={review.user_email}
            rating ={review.rating}
            commentary ={review.commentary}
            />
          )
        }):<p>No Se Encontraron Reseñas</p>}
      </div>
    </>
  );
}

export default CardDetail;

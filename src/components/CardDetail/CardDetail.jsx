import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDet } from "../../redux/DSellerActions";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import axios from "axios";
import {useUser} from '@auth0/nextjs-auth0/client'


function CardDetail() {
  const { user, isLoading } = useUser()
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const productsDetail = useSelector((state) => state.products.detail);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  // console.log(productsDetail)
  useEffect(() => {
    if (router.isReady) {
      dispatch(getProductDet(id));
    }
    // eslint-disable-next-line
  }, [id]);

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
          {isLoading ? (<h3>Loading...</h3>) : !user ? (<button className="btn-submit" disabled>Sign in to buy</button>) :
            <PayPalScriptProvider options={{ "client-id": 'ATkacPNlx1rEm20wznSCEFxJN9DoXoURPhNGwkz1F8UPdxwcz5fGrtPmtc9OVjyQrp09liKLtK4xntHs' }}>
              <PayPalButtons createOrder={async () => {
                try {
                  const payload = { productID: id }
                  const response = await axios.post('/api/payment/paypal/', payload)
                  // console.log(response.data)
                  await handleSentMail(response.data.links)
                  return response.data.id
                } catch(error) {
                  console.log(error)
                }
              }} 
              onCancel={(data)=> console.log("Compra Cancelada")} 
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
    </>
  );
}

export default CardDetail;

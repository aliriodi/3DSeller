import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getProductDet } from "../../redux/DSellerActions";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

function CardDetail() {
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

  useEffect(() => {
    if (!loading) {
      return;
    }
    setStatus("loading");
    axios({
      // url: 'http://localhost:3000/api/indice',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        
        intent: "CAPTURE",       
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: productsDetail.price/2,
            },
          },
        ],
    })
      .then((response) => {
        console.log(response,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        setOrderId(response.data.id);
        setLoading(false);
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setError(error.response.result);
        } else if (error.request) {
          console.log(error.request);
          setError(error.request);
        } else {
          console.log("Error", error.message);
          setError(error.message);
        }
        setLoading(false);
      });
  }, [loading]);

  const createOrder = async (data, actions) => {
    setLoading(true);
    
  };

  const onCancel = (data) => {
    console.log("compra cancelada");
  };

  const onApprove = async (data, actions) => {
    console.log(data);
    try {
      await actions.order.capture();
    } catch (error) {
      console.log(error);
    }
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
        </div>
      </div>

      {/* Descripcion */}
      <div className="data-descripcion">
        <p>{productsDetail.description}</p>
      </div>

      <PayPalScriptProvider
        clientId={'ATkacPNlx1rEm20wznSCEFxJN9DoXoURPhNGwkz1F8UPdxwcz5fGrtPmtc9OVjyQrp09liKLtK4xntHs'}
        onError={(error) => console.log(error)}
      >
        <PayPalButtons                                      
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={onCancel}
        />
        
      </PayPalScriptProvider>
    </>
  );
}
export default CardDetail;

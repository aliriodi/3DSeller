import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDet, putProduct } from "../../redux/DSellerActions";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import imgIcon from "../LogButton/perfil-icon_default.png"

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

  const currency = "USD";
  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency = "USD", showSpinner }) => {
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

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          // style={style}
          disabled={false}
          forceReRender={[
            Math.ceil(productsDetail.price / 300),
            currency,
            null,
          ]}
          fundingSource={undefined}
          createOrder={async (data, actions) => {
            const orderId = await actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: Math.ceil(productsDetail.price / 300),
                  },
                },
              ],
            });
            return orderId;
          }}
          onApprove={async function (data, actions) {
            await actions.order.capture();
          }}
        />
      </>
    );
  };

  // useEffect(() => {
  //   if (!loading) {
  //     return;
  //   }
  //   setStatus("loading");
  //  async ()=> await  axios({
  //      url: 'http://localhost:3000/api/indice',
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },

  //       intent: "CAPTURE",
  //       purchase_units: [
  //         {
  //           amount: {
  //             currency_code: "USD",
  //             value: productsDetail.price/2,
  //           },
  //         },
  //       ],
  //   })
  //     .then((response) => {
  //        console.log('value')
  //       console.log(response);
  //       setOrderId(response);
  //       setLoading(false);
  //       setStatus("success");
  //     })
  //     .catch((error) => {
  //       setStatus("error");
  //       if (error.response) {
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //         setError(error.response.result);
  //       } else if (error.request) {
  //         console.log(error.request);
  //         setError(error.request);
  //       } else {
  //         console.log("Error", error.message);
  //         setError(error.message);
  //       }
  //       setLoading(false);
  //     });
  // }, [createOrder, false]);

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
  
  //#region Agregar Reseña
  const [prueveRating, setPrueveRating] = useState(3)
  const [currentReview, setCurrentReview] = useState({
    user_email:userL.email,
    rating: 0,
    commentary:""
  })

  const handleReviewChange = (e)=>{
    setCurrentReview({...currentReview,[e.target.name]:e.target.value})
    console.log(currentReview)
  }

  const addReview = ()=>{
    let newReview = productsDetail.review;
    let newRating = 0;

    // Calcula el Nuevo Rating
    newReview?.forEach(rev => {
      newRating += rev.rating;

    })
    newRating = ((newRating + currentReview.rating)/newReview?.length);
    console.log("Rating",newRating)
    
    //Se Actualiza el Producto
    dispatch(putProduct({
      _id:productsDetail._id,
      rating:newRating.toFixed(2),
      review:[
        ...productsDetail.review,
        {
          user_email:"nahuelescujuri@gmail.com",
          rating: 1,
          commentary:"Fear The Old Blood"
        }
    ]} ))
    console.log(newReview)
  }
  //#endregion

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

      <div className="btn-container">
        <span className="btn" onClick={addReview}>Agregar Review</span>
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
      <form>
        {/* Rating */}
        <div className="rating">
          <input 
          type={"radio"}
          name="rating"
          value={1}
          onChange={handleReviewChange}
          id="start1 "/><label
          for="start1">

          </label>
          <input 
          type={"radio"}
          name="rating"
          value={2}
          onChange={handleReviewChange}
          id="start2 "/><label
          for="start2">

          </label>
          <input 
          type={"radio"}
          name="rating"
          value={3}
          onChange={handleReviewChange}
          id="start3 "/><label
          for="start3">

          </label>
          <input 
          type={"radio"}
          name="rating"
          value={4}
          onChange={handleReviewChange}
          id="start4 "/><label
          for="start4">

          </label>
          <input 
          type={"radio"}
          name="rating"
          value={5}
          onChange={handleReviewChange}
          id="start5 "/><label
          for="start5">
          </label>
        </div>

        {/* Commentary */}
        <textarea
        type="text"
        name="commentary"
        onChange={handleReviewChange}
        />
      </form>

      {/* Reseñas */}
      <div className="user-review">
        {/* Datos De Usuario */}
        <div className="user-container">
        <div className="user-dates">
          <div className="user-container_icon">
          <Image src={imgIcon} alt="user"/>
          </div>
          <p>userxxxxx@gmail.com</p>
        </div>
        <div className="user-star">
          <span>{prueveRating >= 1?"★":"☆"}</span>
          <span>{prueveRating >= 2?"★":"☆"}</span>
          <span>{prueveRating >= 3?"★":"☆"}</span>
          <span>{prueveRating >= 4?"★":"☆"}</span>
          <span>{prueveRating >= 5?"★":"☆"}</span>
        </div>
        </div>

        {/* Comentrio De Usuario*/}
        <div className="user-commentary">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius corporis nostrum fuga quas eum inventore ea, eaque facere natus cum libero commodi architecto id? Repellendus quo eum labore possimus delectus?
          </p>
        </div>
      </div>
    </>
  );
}

export default CardDetail;

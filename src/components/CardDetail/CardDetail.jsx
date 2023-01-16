import React, { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDet } from "../../redux/DSellerActions";
import { PayPalScriptProvider, PayPalButtons ,  usePayPalScriptReducer} from "@paypal/react-paypal-js";
import { useRouter } from 'next/router';
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
  const createOrder = async (data, actions) => {
    setLoading(true);
    
  };
  // console.log(productsDetail)
  useEffect(() => {
    if(router.isReady){ 
      dispatch(getProductDet(id))
    };
    // eslint-disable-next-line
  }, [id]);

const currency = 'USD';
// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency='USD', showSpinner }) => {
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


  return (<>
          { (showSpinner && isPending) && <div className="spinner" /> }
          <PayPalButtons
             // style={style}
              disabled={false}
              forceReRender={[Math.ceil(productsDetail.price/300), currency, null]}
              fundingSource={undefined}
              createOrder={(data, actions) => {
                  return actions.order
                      .create({
                          purchase_units: [
                              {
                                  amount: {
                                      currency_code: currency,
                                      value:Math.ceil( productsDetail.price/300),
                                  },
                              },
                          ],
                      })
                      .then((orderId) => {
                          // Your code here after create the order
                          return orderId;
                      });
              }}
              onApprove={function (data, actions) {
                  return actions.order.capture().then(function () {
                      // Your code here after capture the order
                  });
              }}
          />
      </>
  );
}


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
            clientId={'ATkacPNlx1rEm20wznSCEFxJN9DoXoURPhNGwkz1F8UPdxwcz5fGrtPmtc9OVjyQrp09liKLtK4xntHs'}
        onError={(error) => console.log(error)}
                options={{
                    "client-id": "test",
                    components: "buttons",
                    currency: "USD"
                }}
            >
				<ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                />
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
    </>
  );
}


export default CardDetail

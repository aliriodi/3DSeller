import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDet, getRender } from "../../redux/DSellerActions";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
//import { useParams  } from 'react-router-dom';

import { useRouter } from "next/router";

function CardDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { products } = useSelector((state) => state.products);
  const productsDetail = useSelector((state) => state.products.detail);
  useEffect(() => {
    if (router.isReady) {
      dispatch(getProductDet(id));
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    //return ;
  }, [dispatch]);

  return (
    <>
      <div className={`detail-content`}>
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
      <div className="data-container detail-item_item">
        <h3>Descripcion</h3>
        <div className="summary">{productsDetail.description}</div>
      </div>

      {/* Categorias */}
      <div className="data-container detail-item_item">
        <h3>Categorias:</h3>
        <div className="summary diets-container">{productsDetail.category}</div>
        {/*boton pago*/}
        {/* <div className="Pay-button">
          <PayPalScriptProvider
            options={{
              "client-id":
                "ATkacPNlx1rEm20wznSCEFxJN9DoXoURPhNGwkz1F8UPdxwcz5fGrtPmtc9OVjyQrp09liKLtK4xntHs",
            }}
          >
            <PayPalButtons style={{ layout: "vertical", color: "gold" }} />
          </PayPalScriptProvider>
        </div> */}
      </div>
    </>
  );
}

export default CardDetail;

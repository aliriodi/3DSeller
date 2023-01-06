import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDet } from "../../redux/DSellerActions";
//import { useParams  } from 'react-router-dom';
import { useRouter } from 'next/router'

function CardDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {id} = router.query;
  const  productsDetail  =  useSelector(state => state.products.detail);  
  useEffect(() => {
    if(router.isReady){ 
      dispatch(getProductDet(id))
    };
    // eslint-disable-next-line
  }, [id]);
  

  return (
    <div className="container0">
       <div  >
       
       </div>
       
       <div className="imageDetail"><img  className="imageVcard" src={productsDetail.image}  alt=""/> </div>
       <div className="stockDetail"><strong>Rating:</strong> {productsDetail.rating?productsDetail.rating:'4.3'}</div>
       <div className="stockDetail"><strong>Stock:</strong> {productsDetail.stock}</div>
       <div className="stockDetail"><strong>Precio:</strong> {productsDetail.price}</div>
       <div className="NameDetail"><strong>Nombre:</strong> {' '+productsDetail.name} </div>
       <div className="Description"><strong>Descripcion:</strong> {' '+productsDetail.description}</div>
       <div className="Description"><strong>Categoria:</strong> {' '+productsDetail.category}</div>
    </div>
  )
}

export default CardDetail
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
// Anterior version del Detail

//   <div className="container0">
//        {/* <div>
       
//        </div>
//         */}
//        <div className="imageDetail"><img  className="imageVcard" src={productsDetail.image?productsDetail.image:'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.1c0eb044.jpeg&w=1080&q=75'}  alt=""/> </div>
//        <div className="stockDetail"><strong>Rating:</strong> {productsDetail.rating?productsDetail.rating:'4.3'}</div>
//        <div className="stockDetail"><strong>Stock:</strong> {productsDetail.stock}</div>
//        <div className="stockDetail"><strong>Precio:</strong> {productsDetail.price}</div>
//        <div className="NameDetail"><strong>Nombre:</strong> {' '+productsDetail.name} </div>
//        <div className="Description"><strong>Descripcion:</strong> {' '+productsDetail.description}</div>
//        <div className="Description"><strong>Categoria:</strong> {' '+productsDetail.category}</div> 
//     {/* </div> */}

//                   </div>
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

                            </div>
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
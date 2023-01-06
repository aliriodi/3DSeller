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
       <div>{console.log(id)} </div>
       <div>{productsDetail.name}</div>
       <div></div>
    </div>
  )
}

export default CardDetail
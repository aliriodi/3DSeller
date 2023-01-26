
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getProducts,
    getAllUser,
  } from "../../redux/DSellerActions";
  

export default function Compras() {
    const dispatch = useDispatch();
    const {allUsers, userL, compras } = useSelector((state) => state.products);
    useEffect(() => {
        if (allUsers.length === 0) dispatch(getAllUser());
       
      }, [userL]);
  return (
    <div className="compras">
        
    <div className="p-3 mb-2 bg-secondary text-white">
    <div className="row">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" ></link>
        <div className="col-md-12">
 
          

    <h4>Lista de Compras</h4>
    <table className="table table-bordered table-dark">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Nombre Usuario</th>
                <th scope="col">Nombre Producto</th>
                <th scope="col">Orden de compra</th>
                <th scope="col">Fecha de compra</th>
                <th scope="col">Cantidad</th>
                </tr>
            </thead> 
            <tbody>
 
 {compras.map(item => (
    
   <tr key={item.id}>
     <td>{ allUsers.map(item2 => item2._id === item.user.id? item2['name']:null) }</td>
     <td>{item.product.name}</td>
     <td>{item.order_id}</td>
     <td>{item.created_at}</td>
     <td>{1}</td>
   </tr>

 ))}

 </tbody>

</table>
</div>
   
</div>    </div>    </div>
  )
}

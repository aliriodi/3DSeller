//import React, { useEffect, useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/DSellerActions";
import Vcard from "../Vcard/Vcard";

function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line
  }, [dispatch]);
  const { products } = useSelector(state => state.products);
  
 

  const productos = () => {
    if (search !== "") {
      const filtrados = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLocaleLowerCase())
      );
      return filtrados;
    } else return products;
  };

  const [search, setSearch] = useState("");
  const onSearchChange = () => {
    setSearch(document.getElementById("sBar").value);
  };

  return (
    <>
      <div className="products-container">
        {/*
        Anterior version de la Search Bar
        
        <div>
          <input
            type="text"
            placeholder="Ingeresa el nombre del producto"
            id="sBar"
          />
          <input type={"button"}
          value={"Buscar"}
          onClick={onSearchChange}
          />
        </div>
        */}

<div className={`input-container`}>
            <div className="input-box">
          <input
            type="text"
            placeholder="Ingresa el nombre del producto"
            id="sBar"
          />
             <button onClick={onSearchChange}>BUSCAR</button> 
            </div>
        </div>

        {/* Cards Container */}
        <div className="container-cards">
          {/* Cards */}
          {productos() &&
          productos().map((product3d) => {
              return (
                <Vcard
                  key={product3d.name}
                  id={product3d._id}
                  name={product3d.name}
                  image={product3d.image}
                  category={product3d.category}
                  rating={product3d.category}
                    />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Products;

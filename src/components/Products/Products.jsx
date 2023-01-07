import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const onSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <>
      <div className="products-container">
        {/* <div>
          <input
            type="text"
            placeholder="Busca tu producto"
            value={search}
            onChange={onSearchChange}
          />
        </div> */}

        <div className={`input-container`}>
            <div className="input-box">
             <input 
            type="text"
            placeholder="Busca tu producto"
            value={search}
            onChange={onSearchChange}
             />
             <button>BUSCAR</button>
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


            {/* Prueba */}
            <Vcard
                  key={"Lui"}
                  id={1}
                  name={"Lui"}
                  image={"https://i.pinimg.com/originals/e5/48/0b/e5480bc59916f1e0d66ab1bf9cb14f35.jpg"}
                  category={"Toys"}
                  rating='4.3'
                    />
            <Vcard
                  key={"Lui"}
                  id={1}
                  name={"Lui"}
                  image={"https://media.sketchfab.com/models/76430ca6692b4238a54b5d12e90550c5/thumbnails/03258429579f4029a120c89b54d62ebb/d6155d595f4c4af9acfc6146c60f42d7.jpeg"}
                  category={"Toys"}
                  rating='4.3'
                    />
            
            <Vcard
                  key={"Lui"}
                  id={1}
                  name={"Lui"}
                  image={"https://i.pinimg.com/originals/e5/48/0b/e5480bc59916f1e0d66ab1bf9cb14f35.jpg"}
                  category={"Toys"}
                  rating='4.3'
                    />
            <Vcard
                  key={"Lui"}
                  id={1}
                  name={"Lui"}
                  image={"https://i.pinimg.com/originals/e5/48/0b/e5480bc59916f1e0d66ab1bf9cb14f35.jpg"}
                  category={"Toys"}
                  rating='4.3'
                    />
            <Vcard
                  key={"Lui"}
                  id={1}
                  name={"Lui"}
                  image={"https://i.pinimg.com/originals/e5/48/0b/e5480bc59916f1e0d66ab1bf9cb14f35.jpg"}
                  category={"Toys"}
                  rating='4.3'
                    />
            
            <Vcard
                  key={"Lui"}
                  id={1}
                  name={"Lui"}
                  image={"https://i.pinimg.com/originals/e5/48/0b/e5480bc59916f1e0d66ab1bf9cb14f35.jpg"}
                  category={"Toys"}
                  rating='4.3'
                    />
        </div>
      </div>
    </>
  );
}

export default Products;

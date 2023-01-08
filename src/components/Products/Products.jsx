import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getProducts } from "../../redux/DSellerActions";
import Vcard from "../Vcard/Vcard";

function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line
  }, [dispatch]);
  const { products } = useSelector(state => state.products);
   console.log(products)
    
  const productos = () => {
    if(orden === 2) return render
    if (search !== "") {
      const busqueda = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLocaleLowerCase())
      );
      return busqueda;
    } else return products;
  };

  const [orden, setOrden] = useState(0);

  const [render,setRender]= useState("")

  const [search, setSearch] = useState("");
  const onSearchChange = () => {
    setOrden(0)
    setSearch(document.getElementById("sBar").value);
  };

const handleSelectChanges = ({value}) =>{
   const filtrados = products.filter((item)=> item.category.includes(value[0]))
   setOrden(2)
   setRender(filtrados)
}

  return (
    <div>
      <div className="container0">
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
          <br/>

        </div>
        <br/>
        <div>            
          <Select options={products.map((p)=>({label: p.category, value: p.category})) }
          onChange={ handleSelectChanges}/>
        </div>
        <div className="flex-container">
          {products.length > 0 ?
            productos().map((product3d) => {
              return (
                <Vcard
                  key={product3d._id}
                  id={product3d._id}
                  name={product3d.name}
                  image={product3d.image}
                  category={product3d.category}
                  rating={product3d.rating}
                    />
              );
            }):
            <img
            className="imagendecarga"
            src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-18-223_512.gif"
            alt="imagen de carga"
            />}
        </div>
      </div>
    </div>
  );
}

export default Products;

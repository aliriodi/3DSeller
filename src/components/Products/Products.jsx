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

//console.log(objetos(set))
    
  const productos = () => {
    if(orden === 2) return render
    if (search !== "") {
      const busqueda = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLocaleLowerCase())
      );
      return busqueda;
    } else return products;
  };

  // El orden 0 es el que tiene la pagina por default al entrar en el componente, habilitarlo permite realizar un "reset" 
  //comodo para el usuario
  const [orden, setOrden] = useState(0);
  const resetRqst = () =>{
    setOrden(0)
  }
    
  // Estos son los estados locales que guardan la informacion de la Search Bar
  const [search, setSearch] = useState("");
  const onSearchChange = () => {
    setOrden(0)
    setSearch(document.getElementById("sBar").value);
  };
  
  // Este es el manejador de Set que controla el Render cuando se hace algun filtro
const [render,setRender]= useState("")
const handleSelectChanges = ({value}) =>{
   const filtrados = products.filter((item)=> item.category.includes(value))
   setOrden(2)
   setRender(filtrados)
}

// Las siguientes lineas de codigo dan el formato para las opciones del Select
const oneArray = products.reduce(function (allCategories, item){return [...allCategories, ...item.category]},[])
const set = Array.from(new Set(oneArray))
const objetos = function(arr){
  let newarr = []
  for (let i = 0; i < arr.length;i++){
    newarr.push({label:arr[i],value:arr[i]})
  }
  return newarr
}
//________________________________________________________________________________________


  return (
    <>
    {/* ANTERIOIR ESTRUCTURA DE PRODUCTS 
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
    </div> */}

    <div className={"products-container"}>

    {/* Search bar */}
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

<div className="react-Container-reset">
  <button  className="react-select-reset" onClick={resetRqst}>Reset</button>
</div>
        {/* Filter */}
        <div className="react-Container-reset2">            
          <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={objetos(set)}
          onChange={ handleSelectChanges}/>
        </div>

        {/* Cards Container */}
        <div className="container-cards">

          {/* Cards */}
          {products.length > 0 ?
            productos().map((product3d) => {
              return (
                <Vcard
                  key={product3d.name}
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
    </>
  );
}

export default Products;

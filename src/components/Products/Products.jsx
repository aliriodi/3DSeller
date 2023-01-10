import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getProducts , getRender, resetState,} from "../../redux/DSellerActions";
import Vcard from "../Vcard/Vcard";

function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line
  }, [dispatch]);
  const { products , count , cFO , filtersAord, productsR} = useSelector(state => state.products);
  //console.log(products)
  const {searchS} = useSelector(state => state.products)
  //console.log("Estado SEarch",searchS)

if(cFO===0 && count!==0) {dispatch(getRender(products));
                          dispatch(resetState(1,[]));
                          }
//console.log(objetos(set))
 
  function resetRqst (){handleSelectChanges2([]);
                        dispatch(resetState(0,[]));
                        dispatch(getRender(products))};
    
  // Estos son los estados locales que guardan la informacion de la Search Bar
  const onSearchChange = () => {
     const sItem = document.getElementById("sBar").value
     const busqueda = productsR.filter((item) =>
        item.name.toLowerCase().includes(sItem.toLocaleLowerCase())
      );
      console.log("busqueda ", busqueda)
      dispatch(resetState(1,[]))
      dispatch(getRender(busqueda))
  };
  
  // Este es el manejador de Set que controla el Render cuando se hace algun filtro

  const handleSelectChanges = ({value}) =>{
  console.log("value",value)
   const filtrados = productsR.filter((item)=> item.category.includes(value))
   console.log("filtrados",filtrados)
   dispatch(resetState(1,[]))
   dispatch(getRender(filtrados))
  
}

const handleSelectChanges2 = (selectedOption)=>{
  //console.log(selectedOption)

console.log(selectedOption)
  if(selectedOption.length>0){let nuevorender =[]; 
    for(let i=0;i<selectedOption.length;i++){
      //array.indexOf(searchElement[fromIndex])
      
    productsR.map(
      productR =>{ if(productR.material.indexOf(selectedOption[i].value))
                     {nuevorender.push(productR)
                      console.log(selectedOption[i].value)
                      console.log(nuevorender)}
                 }
                 )
    dispatch(resetState(1,[]))                 
    dispatch(getRender(nuevorender))
  //  nuevorender=[];
  }}
}

// Las siguientes lineas de codigo dan el formato para las opciones del Select
const oneArray = productsR.reduce(function (allCategories, item){return [...allCategories, ...item.category]},[])
const set = Array.from(new Set(oneArray))
const objetos = function(arr){
   let newarr = []
    for (let i = 0; i < arr.length;i++){
    newarr.push({label:arr[i],value:arr[i]})
  } 
  return newarr
}
// Las siguientes lineas de codigo dan el formato para las opciones del Select Multi Materiales
const oneArray2 = productsR.reduce(function (allMAterials, item){return [...allMAterials, ...item.material]},[])
const set2 = Array.from(new Set(oneArray2))
const objetos2 = function(arr){
  let newarr = []
  const result = arr.toString().split(',').reduce((acc,item)=>{if(!acc.includes(item)){acc.push(item); } return acc;
  },[])
   arr=result;
  for (let i = 0; i < arr.length;i++){
    newarr.push({label:arr[i],value:arr[i]})
  }
  return newarr
}
//________________________________________________________________________________________
 /* Ordenamiento con cb*/
 function order1 (typeorder){
  if(productsR && productsR.length>1){
    let a =[];
    productsR.map(b=>a.push(b));
           if(typeorder==='asc0'){
             dispatch(getRender(a.sort(function(a,b){return a.name.localeCompare(b.name,'en',{numeric:true})})))
          }
       if(typeorder==='desc0'){
        dispatch(getRender(a.sort(function(b,a){return a.name.localeCompare(b.name,'en',{numeric:true})})))
          }
       if(typeorder==='asc1'){
        dispatch(getRender(a.sort(function(b,a){return a.rating-b.rating})))
          }
      if(typeorder==='desc1'){
        dispatch(getRender(a.sort(function(a,b){return a.rating - b.rating})))
          }
          if(typeorder==='asc2'){
            dispatch(getRender(a.sort(function(b,a){return a.price-b.price})))
              }
          if(typeorder==='desc2'){
            dispatch(getRender(a.sort(function(a,b){return a.price - b.price})))
              }}
          else{return alert('No se requiere ordenar')}
  
            };

  return (
    <>
    
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

    {/* Selects */}
        <div className="selects-container">

          {/*Ordenamiento */}
          <Select
          className="react-select-container"
          classNamePrefix="react-select"
          onChange={e => {order1(e.value)}}
          defaultValue={{label:'Ordenamientos...'}}
          options={[{label:'Asc. Nombre',value:'asc0'},
          {label:'Desc. Nombre',value:'desc0'},
          {label:'Asc. Rating', value:'asc1'},
          {label:'Desc. Rating', value:'desc1'},
          {label:'Asc. Precio', value:'asc2'},
          {label:'Desc. Precio', value:'desc2'}]}/>
          

          {/* Filter */}
          <Select
          className="react-select-container"
          classNamePrefix="react-select"
          defaultValue={{label:'Filtro...'}}
          options={objetos(set)}
          onChange={ handleSelectChanges}/>
          <Select 
          className="react-select-container"
          classNamePrefix="react-select"
          
          options={objetos2(set2)}
          onChange={ handleSelectChanges2}
          isMulti
          />

          {/* btn-reset */}
          <div className="btn-reset">
            <button onClick={resetRqst}>Reset</button>
          </div>
        </div>


        {/* Cards Container */}
        <div className="container-cards">

          {/* Cards */}
          {productsR && productsR.length >0 ?
            productsR.map((product3d) => {
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

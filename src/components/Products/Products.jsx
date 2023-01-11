import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getProducts, getRender, resetState } from "../../redux/DSellerActions";
import Vcard from "../Vcard/Vcard";

function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line
  }, [dispatch]);
  const { products, count, cFO, filtersAord, productsR } = useSelector(
    (state) => state.products
  );
  //console.log(products)
  const { searchS } = useSelector((state) => state.products);
  //console.log("Estado SEarch",searchS)

  if (cFO === 0 && count !== 0) {
    dispatch(getRender(products));
    dispatch(resetState(1, []));
  }
  //console.log(objetos(set))

  //#region SearchBar y Filtros
  const [currentFilterCategory, setCurrentFilterCategory] = useState("");
  const [currentFilterMaterial, setCurrentFilterMaterial] = useState([]);
  const [currentFilterOrder, setCurrentFilterOrder] = useState("");

  //Boton para recetar Filtros y SearchBar
  function resetRqst() {
    handleMaterialChange([]);
    dispatch(resetState(0, []));
    dispatch(getRender(products));
  }

  //SearchBar
  const onSearchChange = () => {
    const sItem = document.getElementById("sBar").value;
    const busqueda = productsR.filter((item) =>
      item.name.toLowerCase().includes(sItem.toLocaleLowerCase())
    );
    console.log("busqueda ", busqueda);
    dispatch(resetState(1, []));
    dispatch(getRender(busqueda));
  };

  //Filtro por Categoria
  const handleSelectChanges = ({ value }) => {
    console.log("value", value);
    setCurrentFilterCategory(value);
    //  const filtrados = productsR.filter((item)=> item.category.includes(value))
    //  console.log("filtrados",filtrados)
    //  dispatch(resetState(1,[]))
    //  dispatch(getRender(filtrados))
  };
  const filterCategory = (products, options) => {
    if (options == "" || options == "Todas") return products;

    let newRender = products.filter((product) =>
      product.category.includes(options)
    );

    return newRender;
  };

  //Filtro por Material
  const handleMaterialChange = (selectedOption) => {
    let newOptions = selectedOption.map((option) => {
      return option.value;
    });
    setCurrentFilterMaterial(newOptions);
  };
  const filterMaterial = (products, options) => {
    if (options.length == 0) return products;

    let newRender = products.filter((product) => {
      let result = false;
      for (let option of options) {
        if (product.material[0].indexOf(option) == -1) {
          result = false;
          break;
        } else if (product.material[0].indexOf(option) !== -1) {
          result = true;
        }
      }
      return result;
    });

    return newRender;
  };

  //Filtro de Ordenamiento
  const handleOrderChange = ({ value }) => {
    setCurrentFilterOrder(value);
  };
  const filterOrder = (products, options) => {
    if (options.length == 0) return products;

    let newRender;

    switch (options) {
      case "asc0": {
        newRender = products.slice().sort(function (a, b) {
          return a.name.localeCompare(b.name, "en", { numeric: true });
        });
        break;
      }

      case "desc0": {
        newRender = products.slice().sort(function (b, a) {
          return a.name.localeCompare(b.name, "en", { numeric: true });
        });
        break;
      }

      case "asc1": {
        newRender = products.slice().sort(function (b, a) {
          return a.rating - b.rating;
        });
        break;
      }

      case "desc1": {
        newRender = products.slice().sort(function (a, b) {
          return a.rating - b.rating;
        });
        break;
      }

      case "asc2": {
        newRender = products.slice().sort(function (b, a) {
          return a.price - b.price;
        });
        break;
      }

      case "desc2": {
        newRender = products.slice().sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      }

      default: {
        return alert("No se requiere ordenar");
      }
    }
    return newRender;
  };

  //Concatenacion de Filtros
  useEffect(() => {
    //Se declara la variable que va a ser el resultado final
    let resultProducts = products;

    //Se le aplican los filtros
    resultProducts = filterCategory(resultProducts, currentFilterCategory);
    resultProducts = filterMaterial(resultProducts, currentFilterMaterial);
    resultProducts = filterOrder(resultProducts, currentFilterOrder);

    console.log(
      "FILTRO DE ORDER",
      filterOrder(resultProducts, currentFilterOrder)
    );
    // dispatch(resetState(1,[]))
    dispatch(getRender(resultProducts));
  }, [currentFilterMaterial, currentFilterCategory, currentFilterOrder]);

  //#endregion

  //#region Scroll infinito code

  const [current, setCurrent] = useState(0);

  const nextPage = () => {
    if (productsR.length > current + 8) setCurrent(current + 8);
  };

  const prevPage = () => {
    if (current > 0) setCurrent(current - 8);
  };

  // Esta funcion va a controlar el numero de elementos que se ven al cargar la pagina por primera vez

  const tarjetasXPag = () => {
    return productsR.slice(current, current + 8);
  };

  //#endregion

  // Las siguientes lineas de codigo dan el formato para las opciones del Select
  const oneArray = products.reduce(function (allCategories, item) {
    return [...["Todas"], ...allCategories, ...item.category];
  }, []);
  const set = Array.from(new Set(oneArray));
  const objetos = function (arr) {
    let newarr = [];
    for (let i = 0; i < arr.length; i++) {
      newarr.push({ label: arr[i], value: arr[i] });
    }
    return newarr;
  };

  //#region Declaracion de Filtro por Materiales

  // Las siguientes lineas de codigo dan el formato para las opciones del Select Multi Materiales
  const oneArray2 = products.reduce(function (allMAterials, item) {
    return [...allMAterials, ...item.material];
  }, []);
  const set2 = Array.from(new Set(oneArray2));
  const objetos2 = function (arr) {
    let newarr = [];
    const result = arr
      .toString()
      .split(",")
      .reduce((acc, item) => {
        if (!acc.includes(item)) {
          acc.push(item);
        }
        return acc;
      }, []);
    arr = result;
    for (let i = 0; i < arr.length; i++) {
      newarr.push({ label: arr[i], value: arr[i] });
    }
    return newarr;
  };
  //#endregion

  //#region Ordenamiento con cb
  function order1(typeorder) {
    if (productsR && productsR.length > 1) {
      let a = [];
      productsR.map((b) => a.push(b));
      if (typeorder === "asc0") {
        dispatch(
          getRender(
            a.sort(function (a, b) {
              return a.name.localeCompare(b.name, "en", { numeric: true });
            })
          )
        );
      }
      if (typeorder === "desc0") {
        dispatch(
          getRender(
            a.sort(function (b, a) {
              return a.name.localeCompare(b.name, "en", { numeric: true });
            })
          )
        );
      }
      if (typeorder === "asc1") {
        dispatch(
          getRender(
            a.sort(function (b, a) {
              return a.rating - b.rating;
            })
          )
        );
      }
      if (typeorder === "desc1") {
        dispatch(
          getRender(
            a.sort(function (a, b) {
              return a.rating - b.rating;
            })
          )
        );
      }
      if (typeorder === "asc2") {
        dispatch(
          getRender(
            a.sort(function (b, a) {
              return a.price - b.price;
            })
          )
        );
      }
      if (typeorder === "desc2") {
        dispatch(
          getRender(
            a.sort(function (a, b) {
              return a.price - b.price;
            })
          )
        );
      }
    } else {
      return alert("No se requiere ordenar");
    }
  }
  //#endregion
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
            onChange={handleOrderChange}
            placeholder="Ordenamientos..."
            options={[
              { label: "Asc. Nombre", value: "asc0" },
              { label: "Desc. Nombre", value: "desc0" },
              { label: "Asc. Rating", value: "asc1" },
              { label: "Desc. Rating", value: "desc1" },
              { label: "Asc. Precio", value: "asc2" },
              { label: "Desc. Precio", value: "desc2" },
            ]}
          />

          {/* Filter Category*/}
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Categoria..."
            options={objetos(set)}
            onChange={handleSelectChanges}
          />

          {/* Filter Material*/}
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Material..."
            options={objetos2(set2)}
            onChange={handleMaterialChange}
            isMulti
          />

          {/* btn-reset */}
          <div className="btn-reset">
            <button onClick={resetRqst}>Reset</button>
          </div>
        </div>

        {/* btn-paginado */}
        <div id="contenedor_botones">
          <button className="anterior" onClick={prevPage}>
            Pagina Anterior
          </button>
          <button className="siguiente" onClick={nextPage}>
            Pagina Siguiente
          </button>
        </div>

        {/* Cards Container */}
        <div className="container-cards">
          {/* Cards */}
          {productsR && productsR.length > 0 ? (
            tarjetasXPag().map((product3d) => {
              return (
                <Vcard
                  className="productoclass"
                  key={product3d.name}
                  id={product3d._id}
                  name={product3d.name}
                  image={product3d.image}
                  category={product3d.category}
                  rating={product3d.rating}
                />
              );
            })
          ) : (
            <img
              className="imagendecarga"
              src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-18-223_512.gif"
              alt="imagen de carga"
            />
          )}
        </div>

        {/* btn-paginado */}
        <div id="contenedor_botones">
          <button className="anterior" onClick={prevPage}>
            Pagina Anterior
          </button>
          <button className="siguiente" onClick={nextPage}>
            Pagina Siguiente
          </button>
        </div>
      </div>
    </>
  );
}

export default Products;

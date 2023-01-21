import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  getProducts,
  getRender,
  chngFavoritos,
  PutFavorite,
} from "../../redux/DSellerActions";
import Vcard from "../Vcard/Vcard";
import Image from "next/dist/client/image";
import paginationRightImg from "../../public/pagination-icon_right.png";
import paginationLeftImg from "../../public/pagination-icon_left.png";
import UserBaned from "components/UserBaneds/UserBaned";

function Products() {
  const { products, productsR } = useSelector((state) => state.products);

  const { user } = useSelector((state) => state.products);
  const { favorites } = useSelector((state) => state.products);
  const sendDB = { favorites: favorites, user: user };

  //console.log("user", userL.rol);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    //la siguiente linea busca informacion del Local Storage y si la encuentra carga el arreglo favoritos con ella
    const storedFavorites = localStorage.getItem("favorites");
    if (user.name) {
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites);
        dispatch(chngFavoritos(favorites));
      }
    }
  }, []);

  useEffect(() => {
    dispatch(PutFavorite(sendDB));
  }, [favorites]);

  useEffect(() => {
    dispatch(getRender(products));
  }, [products]);

  //#region SearchBar y Filtros
  const [currentSearchBar, setCurrentSearchBar] = useState("");
  const [currentFilterCategory, setCurrentFilterCategory] = useState("");
  const [currentFilterMaterial, setCurrentFilterMaterial] = useState([]);
  const [currentFilterOrder, setCurrentFilterOrder] = useState("");
  const [current, setCurrent] = useState(0);

  //SearchBar
  const onSearchChange = () => {
    const sItem = document.getElementById("sBar").value;
    setCurrentSearchBar(sItem);
  };
  const searchBar = (products, value) => {
    const busqueda = products.filter((item) =>
      item.name?.toLowerCase().includes(value.toLocaleLowerCase())
    );
    // dispatch(resetState(1, []));
    return busqueda;
  };

  //Filtro por Categoria
  const handleSelectChanges = ({ value }) => {
    //console.log("value", value);
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
        if (product.material[0]?.indexOf(option) == -1) {
          result = false;
          break;
        } else if (product.material[0]?.indexOf(option) !== -1) {
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
    setCurrent(0);

    //Se le aplican los filtros
    resultProducts = searchBar(resultProducts, currentSearchBar);
    resultProducts = filterCategory(resultProducts, currentFilterCategory);
    resultProducts = filterMaterial(resultProducts, currentFilterMaterial);
    resultProducts = filterOrder(resultProducts, currentFilterOrder);

    dispatch(getRender(resultProducts));
  }, [
    currentFilterMaterial,
    currentFilterCategory,
    currentFilterOrder,
    currentSearchBar,
  ]);
  //#endregion

  //#region Scroll infinito code

  const [pagina, setPagina] = useState(1);

  const paginas = productsR.length / 8;

  const handlePageChange = (valor) => {
    switch (valor) {
      case 0:
        setCurrent(0);
        setPagina(1);
        break;
      case 1:
        setCurrent(8);
        setPagina(2);
        break;

      case 2:
        setCurrent(16);
        setPagina(3);
        break;

      case 3:
        setCurrent(24);
        setPagina(4);
        break;

      case 4:
        setCurrent(32);
        setPagina(5);
        break;

      default:
        setCurrent(8);
        setPagina(1);
        break;
    }
  };

  const nextPage = () => {
    if (productsR.length > current + 8) setCurrent(current + 8);
    //console.log(Math.ceil(productsR.length / 8));
    if (productsR.length > current + 8) setPagina(pagina + 1);
  };

  const prevPage = () => {
    if (current > 0) setCurrent(current - 8);
    if (current > 0) setPagina(pagina - 1);
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

  return user.rol === "banned" ? (
    <UserBaned />
  ) : (
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
        </div>

        {/* btn-paginado */}
        <div
          className={`btn-paginated ${
            tarjetasXPag().length < 0 ? "desactive" : null
          }`}
        >
          {/* btn-paginado previa */}
          <button
            className={`btn ${current > 0 ? null : "btn-desabled"}`}
            onClick={prevPage}
          >
            <Image src={paginationLeftImg} alt="Pagina Anterior" />
          </button>
          {/*Botones de las pag*/}
          <div className="actual-page">
            <span className="fav-icon_on">{pagina}</span>
          </div>
          <div>
            {Array.from({ length: paginas }, (_, i) => (
              <button
                className="numeros-pag"
                onClick={() => handlePageChange(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {/* btn-paginado siguiente */}
          <button
            className={`btn ${
              productsR.length > current + 8 ? null : "btn-desabled"
            }`}
            onClick={nextPage}
          >
            <Image src={paginationRightImg} alt="Pagina Siguiente" />
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
                  key={product3d._id}
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
        <div
          className={`btn-paginated ${
            tarjetasXPag().length < 0 ? "desactive" : null
          }`}
        >
          {/* btn-paginado previa */}
          <button
            className={`btn ${current > 0 ? null : "btn-desabled"}`}
            onClick={prevPage}
          >
            <Image src={paginationLeftImg} alt="Pagina Anterior" />
          </button>

          {/* btn-paginado siguiente */}
          <button
            className={`btn ${
              productsR.length > current + 8 ? null : "btn-desabled"
            }`}
            onClick={nextPage}
          >
            <Image src={paginationRightImg} alt="Pagina Siguiente" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Products;

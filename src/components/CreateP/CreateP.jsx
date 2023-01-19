//import e from 'express';
import UserBaned from "components/UserBaneds/UserBaned";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import {  useHistory } from 'react-router-dom';
import { postCreateProduct, getProducts } from "../../redux/DSellerActions";

export default function CreateP() {
  const { userL } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  //const history = useHistory()
  const [input, setInput] = useState({
    name: "",
    description: "",
    rating: "",
    material: "",
    image: "",
    category: "",
    stock: "",
    price: 200,
  });
  let [errors, setErrors] = useState({
    name: true,
    description: true,
    rating: true,
    material: true,
    category: true,
    image: true,
    stock: true,
    price: true,
  });

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function validate(input) {
    input.name.length < 5
      ? (errors.name = "Nombre de producto requerido al menos 5 caracteres")
      : products.filter((product) =>
          product.name.toLowerCase() == input.name.toLowerCase()
            ? (errors.name = "Producto Existe, cambie nombre")
            : (errors.name = false)
        );
    //? errors.name=input.name:errors.name=console.log(input.name+' '+errors.name);
    input.description.length < 10
      ? (errors.description = "Descripcion es requerida al menos 10 caracteres")
      : (errors.description = false);
    !input.rating || input.rating < 0 || input.rating > 5
      ? (errors.rating = "Rating debe ser un numero entre 0-5")
      : (errors.rating = false);
    !input.stock || input.stock < 1 || input.stock > 10
      ? (errors.stock =
          "Stock debe ser un numero entre 1-10 si desea incremenar este rango dirijase con Administracion de la empresa para autorizar requerimiento.")
      : (errors.stock = false);
    !input.price || input.price < 200
      ? (errors.price = "Precio debe ser un numero mayor de 200$ Arg")
      : (errors.price = false);
    input.material.length === 0
      ? (errors.material = "Al menos un Material es requerido: ")
      : (errors.material = false);
    input.category.length === 0
      ? (errors.category = "Seleccione una categoria")
      : (errors.category = false);
    input.image.length < 10
      ? (errors.image = "No es una imagen URL")
      : (errors.image = false);
    return errors;
  }
  const products = useSelector((state) => state.products.products);
  let materials = [
    "PLA",
    "PETG",
    "HIPS",
    "Nylon",
    "TPE",
    "Filamento Fibra de Carbono",
  ];
  let category = [
    "Muneco",
    "Mate",
    "Accesorio",
    "Ropa",
    "Qatar 2022",
    "Anime",
    "other",
  ];
  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleOnChangeI(e) {
    setInput({
      ...input,
      image: e.target.value,
    });
  }

  function handleMaterial(e) {
    if (e.target.value != 0 && !input.material.includes(e.target.value)) {
      setInput({
        ...input,
        material:
          input.material.length > 0
            ? input.material.concat("," + e.target.value)
            : e.target.value,
      });
    }
  }
  function handleCategory(e) {
    if (e.target.value != 0 && !input.category.includes(e.target.value)) {
      setInput({
        ...input,
        category: e.target.value,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.name.length < 4) {
      return alert("Nombre requiere mas de 4 caracetres");
    }
    if (!input.rating) {
      return alert("Rating is required");
    }
    if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating)) {
      return alert("Wrong format for Rating. Should be a number between 0-5");
    }

    dispatch(postCreateProduct(input));

    alert(`Product 3DSeller ${input.name} has been added`);
    setInput({
      name: "",
      description: "",
      //releaseDate: '',
      rating: "",
      stock: "",
      category: "",
      material: "",
      image:
        "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.1c0eb044.jpeg&w=1080&q=75",
      price: 200,
    });

    // history.push('/productos')
  }

  return userL.rol === "banned" ? (
    <UserBaned />
  ) : (
    <>
      <div className="marginTop">
        <div className="center">
          <h1>Agrega Nuevo Producto</h1>

          <form onSubmit={(e) => handleSubmit(e)}>
            {/* Name */}
            <div className="txt_field">
              <input
                onChange={handleOnChange}
                onBlur={handleOnChange}
                type="text"
                name="name"
                value={input.name}
              />
              <span></span>
              <label>Nombre</label>
              {errors.name && <p className="error-text"> {errors.name} </p>}
            </div>

            {/* Imagen */}
            <div className="txt_field">
              <input
                onChange={handleOnChangeI}
                onBlur={handleOnChangeI}
                type="text"
                name="image"
                value={input.image}
              />
              <span></span>
              <label>Imagen</label>
              {errors.image && <p className="error-text"> {errors.image} </p>}
            </div>

            {/* Description */}
            <div className="txt_field">
              <textarea
                className="DescriptionF"
                onChange={handleOnChange}
                onBlur={handleOnChange}
                onFocus={handleOnChange}
                type="text"
                name="description"
                value={input.description}
              />
              <span></span>
              <label>Descripcion</label>
              {errors.description && (
                <p className="error-text"> {errors.description} </p>
              )}
            </div>

            {/* Indice de Rating */}
            <div className="txt_field">
              <input
                onChange={handleOnChange}
                onBlur={handleOnChange}
                onFocus={handleOnChange}
                type="number"
                min="0"
                max="5"
                step="0.1"
                name="rating"
                value={input.rating}
                placeholder="ex 4.3"
              />
              <span></span>
              <label>Indice de Rating</label>
              {errors.rating && <p className="error-text"> {errors.rating} </p>}
            </div>

            {/* Stock */}
            <div className="txt_field">
              <input
                onChange={handleOnChange}
                onBlur={handleOnChange}
                onFocus={handleOnChange}
                type="number"
                min="1"
                max="10"
                step="1"
                name="stock"
                value={input.stock}
                placeholder="ex 1"
              />
              <span></span>
              <label>Stock</label>
              {errors.name && <p className="error-text"> {errors.stock} </p>}
            </div>

            {/* Precio */}
            <div className="txt_field">
              <input
                onChange={handleOnChange}
                onBlur={handleOnChange}
                onFocus={handleOnChange}
                type="number"
                min="100"
                step="100"
                name="price"
                value={input.price}
                placeholder="ex 3100"
              />
              <span></span>
              <label>Precio en $Arg</label>
              {errors.name && <p className="error-text"> {errors.price} </p>}
            </div>

            {/* Materiales Posibles */}
            <div className="txt_field">
              <label className="title">Materiales Posibles</label>
              <select
                onChange={handleMaterial}
                onBlur={handleOnChange}
                onFocus={handleOnChange}
              >
                <option key="Materials" value={0}>
                  Material
                </option>
                {materials.sort().map((p) => {
                  return (
                    <option key={p} className="MaterialF" value={p}>
                      {p}
                    </option>
                  );
                })}
              </select>
              <ul className="category-container">
                {input.material ? (
                  <span>Materiales: {input.material}</span>
                ) : null}
              </ul>
            </div>

            {/* Categoria */}
            <div className="txt_field">
              <label className="title">Categoria</label>
              <select
                onChange={handleCategory}
                className="CategoryF"
                onBlur={handleOnChange}
                onFocus={handleOnChange}
              >
                <option key="Category" className="CategoryF" value={0}>
                  Categoria
                </option>
                {category.sort().map((p) => {
                  return (
                    <option key={p} className="CategoryF" value={p}>
                      {p}
                    </option>
                  );
                })}
              </select>
            </div>
            <ul className="category-container">
              {input.category ? <span>Categoria: {input.category}</span> : null}
            </ul>
            {errors.category && (
              <p className="error-text"> {errors.category} </p>
            )}
            {console.log("input")}
            {console.log(input)}
            {console.log("error")}
            {console.log(errors)}
            <button
              disabled={
                errors.name
                  ? true
                  : false || errors.platforms
                  ? true
                  : false || errors.description
                  ? true
                  : false || errors.rating
                  ? true
                  : false || errors.material
                  ? true
                  : false || errors.category
                  ? true
                  : false || errors.image
                  ? true
                  : false || errors.stock
                  ? true
                  : false || errors.precio
                  ? true
                  : false
              }
              className={`btn-submit ${
                errors.name
                  ? true
                  : false || errors.platforms
                  ? true
                  : false || errors.description
                  ? true
                  : false || errors.rating
                  ? true
                  : false || errors.material
                  ? true
                  : false || errors.category
                  ? true
                  : false || errors.image
                  ? true
                  : false || errors.stock
                  ? true
                  : false || errors.precio
                  ? true
                  : false == true
                  ? "btn-disabled"
                  : null
              }`}
              type="submit"
            >
              Agregar Producto
            </button>

            {/* <input type="submit" value="CREATE" className="btn-submit"/> */}
          </form>
        </div>
      </div>
    </>
  );
}

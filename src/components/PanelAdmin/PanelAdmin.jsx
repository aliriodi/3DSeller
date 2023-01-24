import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getUser,
  GetUserBDL,
  getAllUser,
} from "../../redux/DSellerActions";
import ListPrducts from "./ListProducts";
import ListUsers from "./ListUsers";
import img from "../LogButton/perfil-icon_default.png";
import productsImg from "./products-icon.png";
import cartImg from "./cart-icon.png";
import Link from "next/link";
import axios from "axios";

function PanelAdmin() {
  const [currentPurchases, setCurrentPurchases] = useState(0);
  const [currentProducts, setCurrentProducts] = useState([])
  const [currentUsers, setCurrentUsers] = useState([])

  const dispatch = useDispatch();

  const {
    productsR,
    products,
    count,
    user,
    userL,
    allUsers
  } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (allUsers.length === 0) dispatch(getAllUser());
    if (products.length === 0) dispatch(getProducts());
    getAllPurchases()
  }, [userL, currentPurchases]);

  useEffect(()=>setCurrentProducts(products),[products])
  useEffect(()=>setCurrentUsers(allUsers),[allUsers])

  const getAllPurchases = async () => {
    let response = await axios('/api/count/purchases');
    setCurrentPurchases(response.data.purchasesCount);
  }

  const onSearchBarProducts = (e)=>{
    const result = products.filter((item) =>
      item.name?.toLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    setCurrentProducts(result)
  }
  const onSearchBarUsers = (e)=>{
    const result = allUsers.filter((item) =>
      item.name?.toLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    setCurrentUsers(result)
  }
  return (
    <>
      {user.email !== undefined ? (
        // COMPRUEBA SI TIENE PERMISOS
        userL.rol == "admin" ? (
          <div>
            {/* Tablero */}
            <div className="dashboard-container">
              {/* Estadisticas Totales */}
              <div className="dashboard-container_stats">
                {/* Usuarios Totales */}
                <div className="stats-total">
                  {/* Cantidad */}
                  <div className="stats-total_text">
                    <h3>{allUsers.length}</h3>
                    <p>Usuarios</p>
                  </div>

                  {/* Icono */}
                  <div className="stats-total_icon">
                    <Image src={img} alt="img" />
                  </div>
                </div>

                {/* Productos Totales */}
                <div className="stats-total">
                  {/* Cantidad */}
                  <div className="stats-total_text">
                    <h3>{products.length}</h3>
                    <p>Productos</p>
                  </div>

                  {/* Icono */}
                  <div className="stats-total_icon">
                    <Image src={productsImg} alt="img" />
                  </div>
                </div>

                {/* Compras Totales */}
                <div className="stats-total">
                  {/* Cantidad */}
                  <div className="stats-total_text">
                    <h3>{currentPurchases}</h3>
                    <p>Compras</p>
                  </div>

                  {/* Icono */}
                  <div className="stats-total_icon">
                    <Image src={cartImg} alt="img" />
                  </div>
                </div>
              </div>

              {/* Estadisticas Recientes */}
              <div className="dashboard-container_stats">
                {/* Productos */}
                <div className="stats-recent">
                  <div className="stats-recent_text">
                    <h3>Productos</h3>
                    <div className="btn-container">
                      <a href={"/createP"} className="btn">
                        Crear Producto
                      </a>
                    </div>
                  </div>

                  {/* SearchBar */}
                  <div className="search-container">
                    <input type={"text"}
                    onChange={onSearchBarProducts}
                    placeholder="Escribe Nombre del Producto"></input>
                    {/* <button>Buscar</button> */}
                  </div>
                  
                  <ul className="stats-recent_list title">
                    <li className="stats-recent_list-item text-left">
                      <span>Nombre</span>
                    </li>
                    <li className="stats-recent_list-item text-right">
                      <span>Precio</span>
                    </li>
                    <li className="stats-recent_list-item">
                      <span>Stock</span>
                    </li>
                    <span className="space"></span>
                  </ul>

                  {/* Listado de Productos */}
                  {products && products.length > 0 ? 
                  currentProducts.length > 0?(
                    currentProducts.map((product) => {
                      //Productos
                      return (
                        <ListPrducts
                          key={product._id}
                          name={product.name}
                          price={product.price}
                          stock={product.stock}
                          id={product._id}
                        />
                      )
                    })
                  ):
                  (<p className="notFound-text">
                    No se encontraron productos
                  </p>)
                  : (
                    <div className="permissions-denied">
                      <div className="">
                        <img
                          className="imagendecarga"
                          src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-18-223_512.gif"
                          alt="imagen de carga"
                        />
                      </div>
                      <p className="notFound-text">
                        No se encontraron productos
                      </p>
                    </div>
                  )}
                </div>

                {/* Usuarios */}
                <div className="stats-recent">
                  <div className="stats-recent_text">
                    <h3>Usuarios</h3>
                    {/* <div className="btn-container">
                                <a href={""} className="btn">
                                    Ver Todas
                                </a>
                            </div> */}
                  </div>

                  {/* Search Bar */}
                  <div className="search-container">
                    <input type={"text"}
                    onChange={onSearchBarUsers}
                    placeholder="Escribe Email del Usuario"></input>
                    {/* <button>Buscar</button> */}
                  </div>

                  <ul className="stats-recent_list title">
                    <li className="stats-recent_list-item text-left">
                      <span>Email</span>
                    </li>
                    <li className="stats-recent_list-item text-left">
                      <span>Nombre</span>
                    </li>
                    <li className="stats-recent_list-item">
                      <span>Rol</span>
                    </li>
                    <span className="space"></span>
                  </ul>

                  {/* Listado de Usuarios */}
                  {allUsers && allUsers.length > 0 ? (
                    currentUsers.length > 0?
                    currentUsers.map((user) => {
                      //Productos
                      return (
                        <ListUsers
                          key={user._id}
                          name={user.name}
                          favorites={user.favorites}
                          img={user.picture}
                          email={user.email}
                          rol={user.rol}
                          id={user._id}
                          user={user}
                        />
                      );
                    }):
                    <p className="notFound-text">
                      No se Encontraron Usuarios
                    </p>
                  )
                   : (
                    <div className="permissions-denied">
                      <div className="">
                        <img
                          className="imagendecarga"
                          src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-18-223_512.gif"
                          alt="imagen de carga"
                        />
                      </div>
                      <p className="notFound-text">
                        No se encontraron Usuarios
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Si no tiene perisos
          <div className="permissions-denied">
            <div className="permissions-denied-text">
              <h1>No Tiene Autorización Para Acceder a Esta Página</h1>
              <div className="btn-container">
                <Link className="btn" href={"/"}>
                  Pagina Pricipal
                </Link>
              </div>
            </div>
          </div>
        )
      ) : (
        // Loader
        <div className="permissions-denied">
          <div className="">
            <img
              className="imagendecarga"
              src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-18-223_512.gif"
              alt="imagen de carga"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PanelAdmin;

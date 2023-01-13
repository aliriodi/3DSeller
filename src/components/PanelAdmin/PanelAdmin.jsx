import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts , getUser} from "../../redux/DSellerActions";
import ListPrducts from './ListProducts';
import ListUsers from './ListUsers';
import img from "../LogButton/perfil-icon_default.png"

function PanelAdmin(){

    // se trae los usuarios de api/user
    const dispatch = useDispatch();

    useEffect(()=>{
        // dispatch(getUser())
        dispatch(getProducts())
    })

    const { 
        products,
        count,
        user
    } = useSelector(state => state.products);

    //#region Etadisticas Totales
    const [currentCantProducts, setCurrentCantProducts] = useState(0)
    const [currentCantUsers, setCurrentCantUsers] = useState(0)
    const [currentPurchases, setCurrentPurchases] = useState(0)

    //Se Asignan valores
    useEffect(()=>{
        setCurrentCantProducts(count)
    },[
        count,
        user
    ])

    //#endregion


    //#region Estadistica Recientes
    const [currentProducts, setCurrentProducts] = useState([]);
    const [currentUsers, setCurrentUsers] = useState([]);

    //Se Asignan valores
    // useEffect(()=>{
    //     setRecentPurchases(products)
    // },[
    //     products
    // ])
    //#endregion

    return(
        <>
        <div>
            {/* Tablero */}
            <div className='dashboard-container'>

                {/* Estadisticas Totales */}
                <div className='dashboard-container_stats'>

                    {/* Usuarios Totales */}
                    <div className='stats-total'>

                        {/* Cantidad */}
                        <div className='stats-total_text'>
                            <h3>{currentCantUsers}</h3>
                            <p>Usuarios</p>
                        </div>

                        {/* Icono */}
                        <div className='stats-total_icon'>
                            <Image src={img} alt="img"/>
                        </div>

                    </div>

                    {/* Productos Totales */}
                    <div className='stats-total'>

                        {/* Cantidad */}
                        <div className='stats-total_text'>
                            <h3>{currentCantProducts}</h3>
                            <p>Productos</p>
                        </div>

                        {/* Icono */}
                        <div className='stats-total_icon'>
                            <Image src={img} alt="img"/>
                        </div>

                    </div>
                    
                    {/* Compras Totales */}
                    <div className='stats-total'>
                        
                        {/* Cantidad */}
                        <div className='stats-total_text'>
                            <h3>{currentPurchases}</h3>
                            <p>Compras</p>
                        </div>

                        {/* Icono */}
                        <div className='stats-total_icon'>
                            <Image src={img} alt="img"/>
                        </div>

                    </div>
                </div>

                {/* Estadisticas Recientes */}
                <div className='dashboard-container_stats'>

                    {/* Compras Recientes */}
                    <div className='stats-recent'>
                        <div className="stats-recent_text">
                            <h3>Productos</h3>
                            {/* <div className="btn-container">
                                <a href={""} className="btn">
                                    Ver Todas
                                </a>
                            </div> */}
                        </div>

                        <ul className="stats-recent_list title">
                            <li className="stats-recent_list-item text-left">
                                <span>Nombre</span>
                            </li>
                            <li className="stats-recent_list-item">
                                <span>Precio</span>
                            </li>
                            <li className="stats-recent_list-item">
                                <span>Stock</span>
                            </li>
                        </ul>

                        {/* Listado de Productos */}
                        {
                        products && products.length > 0 ? (
                        products.map((product) => {
                            //Productos
                            return (
                            <ListPrducts
                            key = {product._id}
                            name = {product.name}
                            price = {product.price}
                            stock = {product.stock}
                            id = {product._id}
                            />)
                        })
                        ):<p className="notFound-text">No se encontraron productos</p>}
                    </div>

                    {/* Usuarios recientes */}
                    <div className='stats-recent'>
                        <div className="stats-recent_text">
                            <h3>Usuarios</h3>
                            {/* <div className="btn-container">
                                <a href={""} className="btn">
                                    Ver Todas
                                </a>
                            </div> */}
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
                        </ul>

                        {/* Listado de Usuarios */}
                        {
                        currentUsers && currentUsers.length > 0 ? (
                        currentUsers.map((user) => {
                            //Productos
                            return (
                            <ListUsers
                            key = {user._id}
                            name = {user.name}
                            img = {user.img}
                            email = {user.email}
                            rol = {user.rol}
                            id = {user._id}
                            />)
                        })
                        ):<p className="notFound-text">No se encontraron Usuarios</p>}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default PanelAdmin;
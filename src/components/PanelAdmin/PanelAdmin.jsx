import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts , getUser, getAllUser, GetUserBDL} from "../../redux/DSellerActions";
import ListPrducts from './ListProducts';
import ListUsers from './ListUsers';
import img from "../LogButton/perfil-icon_default.png"

function PanelAdmin(){
    const [currentPurchases, setCurrentPurchases] = useState(0)

    // se trae los usuarios de api/user
    const dispatch = useDispatch();
    const { 
        products,
        count,
        user,
        userL,
        allUsers
    } = useSelector(state => state.products);

    
    useEffect(()=>{
        if(allUsers.length === 0)dispatch(getAllUser())
        if(products.length === 0)dispatch(getProducts())
    })

    //#region Etadisticas Totales

    //Se Asignan valores
    useEffect(()=>{
        console.log(allUsers)
    },[
        products
    ])

    //#endregion


    //#region Estadistica Recientes

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
                            <h3>{allUsers.length}</h3>
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
                            <h3>{products.length}</h3>
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

                    {/* Productos */}
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

                    {/* Usuarios */}
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
                            <li className="stats-recent_list-item">
                                <span>Nombre</span>
                            </li>
                            <li className="stats-recent_list-item">
                                <span>Rol</span>
                            </li>
                        </ul>

                        {/* Listado de Usuarios */}
                        {
                        allUsers && allUsers.length > 0 ? (
                        allUsers.map((user) => {
                            //Productos
                            return (
                            <ListUsers
                            key = {user._id}
                            name = {user.name}
                            img = {user.picture}
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
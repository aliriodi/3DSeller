import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import LogButton from "../LogButton/LogButton";
import LogoutButton from "../LogButton/Logout";
import { useRouter } from "next/router";
import {
  AiOutlineMenu
} from "react-icons/ai";

function Nav() {
  const [currentUser, setCurrentUser] = useState({ rol: "invitado" });
  const [currentDropmenu, setCurrentDropmenu] = useState(false)
  const { user, userL } = useSelector((state) => state.products);
  const {push} = useRouter(); 

  if (
    user.rol !== "invitado" &&
    user.rol !== undefined &&
    currentUser.rol === "invitado"
  ) {
    console.log("CHANGE");
    setCurrentUser(userL);
  }

  //#region Menu
  function dropdownMenu(){
    if(currentDropmenu)setCurrentDropmenu(false);
    else setCurrentDropmenu(true);
  }

  useEffect(()=>{
    window.addEventListener('click', function(event){
      console.log("ID",event.target.id)
      if(event.target.id != `nav-menu`)setCurrentDropmenu(false)
      else return
    }) 
  },[])
  // if (typeof window !== "undefined") {
  //   // browser code
  //   window.addEventListener('click', function(event){
  //     console.log("ID",event.target.id)
  //     if(event.target.id != `nav-menu`)setCurrentDropmenu(false)
  //     else return
  //   }) 
  // }
  //#endregion

  return (
    <>
      <header>
        {/* <!-- Nav -->  */}
        <div className="nav">
          {/* <!-- Logo -->  */}
          <Link href={"/"} legacyBehavior>
            <a className="nav-logo">
              <Image src={logo} alt="13" className="nav-logo_img" />
              3D<span className="span1">SELLER</span>
            </a>
          </Link>

          {/* <!-- Nav Icons --> */}
          <div className={`nav-icons-container ${currentDropmenu?"menu-active":""}`}>

          <div
            className={`nav-icons ${
              currentUser.rol !== "admin" ? "desactive" : null
            }`}
          >
            <Link href={"/admin"} legacyBehavior>
              <a className="btn" id="bell-icon">
                Panel de Administrador
              </a>
            </Link>
          </div>
          <div className="nav-icons">
            <Link href={"/productos"} legacyBehavior>
              <a className="btn" id="bell-icon">
                Productos
              </a>
            </Link>
          </div>
          <div className="nav-icons">
            <Link href={"/contacto"} legacyBehavior>
              <a className="btn" id="bell-icon">
                Contacto
              </a>
            </Link>
          </div>
          <div className="nav-icons">
           { userL.rol==='invitado' && userL.name !=='Invitado'?
          <Link href={"/validacion"} legacyBehavior>
              <a className="btn" id="bell-icon">
                Validacion
              </a>
            </Link>
            :
            userL.rol!=='invitado'?
            <Link href={"/favoritos"} legacyBehavior>
              <a className="btn" id="bell-icon">
                Favoritos
              </a>
            </Link>:null
           }
          </div>
          <div className="nav-icons">
            <Link href={"/materiales"} legacyBehavior>
              <a className="btn" id="bell-icon">
                Materiales
              </a>
            </Link>
          </div>
          {/* <div
            className={`nav-icons ${
              currentUser.rol !== "admin" ? "desactive" : null
            }`}
          >
            <Link href={"/createP"} legacyBehavior>
              <a className="btn" id="bell-icon">
                Crear Producto
              </a>
            </Link>
          </div> */}
          {/* <LogButton
            handleLogin={
              user.given_name ? null : user.nickname ? null : handleLogin
            }
            className="btn-logIn"
            id="bell-icon"
          /> */}

          {
          userL.name === "Invitado" ||
          userL.email === "invitado" ? (
            <LogButton />
          ) : (
            <LogoutButton />
           
          )}
          </div>
          
          <span
          className="nav-icons_menu"
          onClick={dropdownMenu}>
            <AiOutlineMenu id="nav-menu"/>
          </span>

        </div>
      </header>
    </>
  );
}
export default Nav;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import LogButton from "../LogButton/LogButton";
import { useRouter } from "next/router";

function Nav() {
  const [currentUser, setCurrentUser] = useState({ rol: "invitado" });
  const { user, userL } = useSelector((state) => state.products);
  const { push } = useRouter();
  const handleLogin = () => push("/api/auth/login");

  if (
    userL.rol !== "invitado" &&
    userL.rol !== undefined &&
    currentUser.rol == "invitado"
  ) {
    console.log("CHANGE");
    setCurrentUser(userL);
  }

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
            <Link href={"/favoritos"} legacyBehavior>
              <a className="btn" id="bell-icon">
                Favoritos
              </a>
            </Link>
          </div>
          <div className="nav-icons">
            <Link href={"/materiales"} legacyBehavior>
              <a className="btn" id="bell-icon">
                Materiales
              </a>
            </Link>
          </div>
          {/* <div className="nav-icons">
            <Link href={"/createP"} legacyBehavior>
              <a className="btn" id="bell-icon">
                Crear Producto
              </a>
            </Link>
          </div> */}
          <LogButton
            handleLogin={
              user.given_name ? null : user.nickname ? null : handleLogin
            }
            className="btn-logIn"
            id="bell-icon"
          />
        </div>
      </header>
    </>
  );
}
export default Nav;

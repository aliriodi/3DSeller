import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/DSellerActions";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import LogButton from "../LogButton/LogButton";
import { useRouter } from "next/router";

function Nav() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.products);
  
  //useEffect(() => {
  //   if(!user.name){dispatch(getUser());}
  //    // eslint-disable-next-line
  //  }, [dispatch]);

  const { push } = useRouter();
  const handleLogin = () => push("/api/auth/login");

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
            <Link href={"/archivo"} legacyBehavior>
              <a className="btn" id="bell-icon">
                Archivo
              </a>
            </Link>
          </div>
          <div className="nav-icons">
            <Link href={"/recursos"} legacyBehavior>
              <a className="btn" id="bell-icon">
                Recursos
              </a>
            </Link>
          </div>
          <div className="nav-icons">
            <Link href={"/createP"} legacyBehavior>
              <a className="btn" id="bell-icon">
                Crear Producto
              </a>
            </Link>
          </div>
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

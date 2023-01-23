import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import perfilIcon from "./perfil-icon_default.png";
import Image from "next/image";
import Link from "next/link";
import { getUser, getProducts } from "../../redux/DSellerActions";

export default function Logout() {
  const dispatch = useDispatch();
    const { push } = useRouter();
    function handleLogout (){ push("/api/auth/logout")};
    useEffect(() => {
      dispatch(getUser())
      if(userL.rol==='invitado'){push("/validacion")}
       // eslint-disable-next-line
}, [false]);
    const {  userL  } = useSelector((state) => state.products);
    return (
        <>
           
      <div  className="nav-icons nav-icons_logIn">
        <Image
          src={perfilIcon}
          alt="perfil"
          className="btn-logIn"
          id="bell-icon"
        />
        <h6>
          {userL.name}
        </h6>
          <Link
            href={"/api/auth/logout"}
            legacyBehavior >
            <div  onClick={()=>handleLogout()} className="container-logout">
              <div className="logout-item"> x</div>
            </div>
          </Link>
         </div>
        </>
    )
}

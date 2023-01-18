import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, GetUserBDL } from "../../redux/DSellerActions";
import perfilIcon from "./perfil-icon_default.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LogButton() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const {  userL  } = useSelector((state) => state.products);
  
  useEffect(() => {
          dispatch(getUser())
           // eslint-disable-next-line
  }, [false]);
   
  function handleLogin (){ push("/api/auth/login")};
  
   return (
    <>
      <div onClick={()=>handleLogin()} className="nav-icons nav-icons_logIn">
        <Image
          src={perfilIcon}
          alt="perfil"
          className="btn-logIn"
          id="bell-icon"
        />
        <h6>
          {userL.name
            ? userL.name
             : "Invitado"}
        </h6>
              </div>
    </>
  );
}

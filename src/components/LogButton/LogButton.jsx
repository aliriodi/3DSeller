import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/DSellerActions";
import perfilIcon from "./perfil-icon_default.png";
import Image from "next/image";
import Link from "next/link";

export default function LogButton({ handleLogin }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.products);
  useEffect(() => {
      dispatch(getUser())
    // eslint-disable-next-line
  }, [false]);
  
   return (
    <>
      <div onClick={handleLogin} className="nav-icons nav-icons_logIn">
        <Image
          src={perfilIcon}
          alt="perfil"
          className="btn-logIn"
          id="bell-icon"
        />
        <h6>
          {user.name
            ? user.name
             : "Invitado"}
        </h6>
        {user.given_name || user.nickname ? (
          <Link
            href={"/api/auth/logout"}
            legacyBehavior
          >
            <div className="container-logout">
              <div className="logout-item"> x</div>
            </div>
          </Link>
        ) : null}
      </div>
    </>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, GetUserBDL, PutFavorite} from "../../redux/DSellerActions";
import perfilIcon from "./perfil-icon_default.png";
import Image from "next/image";
import Link from "next/link";

export default function LogButton({ handleLogin }) {
  const dispatch = useDispatch();
  const  userL  = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line
  }, [dispatch]);
  
  useEffect(() => {
    let email;
    user.email? email=user.email : email='invitado'
        dispatch(GetUserBDL(email));
    // eslint-disable-next-line
  }, [user]);
  
  
  const sendDB = { favorites: userL.favorites?userL.favorites: [], user: user.email?user.email:'invitado' };

  useEffect(() => {
    dispatch(PutFavorite(sendDB));
    // eslint-disable-next-line
    console.log("sendDB", sendDB.favorites);
  }, [user]);


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
          {user.given_name
            ? user.given_name
            : user.nickname
            ? user.nickname
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

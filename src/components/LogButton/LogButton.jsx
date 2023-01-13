import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, GetUserBDL, postCreateUser} from "../../redux/DSellerActions";
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
       if((user.email!==userL.userL.email)||userL===null) 
       {dispatch(postCreateUser(user))
              
        console.log('UserL.userL')  
        console.log(userL.userL)

        console.log('user')  
        console.log(user)

    }
    
    // eslint-disable-next-line
  }, [user.name]);
  
  //postCreateUser
  

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

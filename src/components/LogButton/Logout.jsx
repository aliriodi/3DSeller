import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import perfilIcon from "./perfil-icon_default.png";
import Image from "next/image";
import Link from "next/link";
import { getUser , getcompras} from "../../redux/DSellerActions";

export default function Logout() {
  const dispatch = useDispatch();
    const { push } = useRouter();
    const {  userL  } = useSelector((state) => state.products);
    function handleLogout (){ push("/api/auth/logout")};
    useEffect(() => {
      dispatch(getUser());
       // eslint-disable-next-line
 
    }, [false]);

    function redirecion(){ if(userL.rol==='invitado'&&userL.name!=='Invitado'){push('/validacion')} }
   
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

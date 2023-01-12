import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser} from "../../redux/DSellerActions";
import perfilIcon from "./perfil-icon_default.png"
import Image from 'next/image'
import Link from 'next/link';


export default function LogButton({ handleLogin }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line
  }, [dispatch]);
  const { user} = useSelector(state => state.products);
  //console.log(user)
  
  return (
    <>
        <div onClick={handleLogin} className="nav-icons nav-icons_logIn">
          
          <Image
          src={perfilIcon}
          alt="perfil" 
          className='btn-logIn'
          id='bell-icon'/>
         <h6> {user.given_name?user.given_name:user.nickname?user.nickname:'Invitado' }</h6>
        {user.given_name || user.nickname?   <Link href={"https://3dseller.vercel.app/api/auth/logout"} legacyBehavior>
                                                  <div className="container-logout" ><div className="logout-item"> x</div></div>
                                              </Link>:null}
        </div>
    </>
  )
}

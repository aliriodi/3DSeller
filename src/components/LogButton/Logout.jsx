// import perfilIcon from "./perfil-icon_default.png"
// import Image from 'next/image'

export default function Logout({ handleLogout }) {
  return (
    <>
        <div onClick={handleLogout} className="nav-icons nav-icons_logIn">
          {/* <Image
          src={perfilIcon} 
          alt="perfil" 
          className='btn-logIn'
          id='bell-icon'/> */}
          LOGOUT
        </div>
    </>
  )
}

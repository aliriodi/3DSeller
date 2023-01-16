import React from 'react'

export default function Logout({ handleLogout }) {
    return (
        <>
            <div className="nav-icons nav-icons_logIn">
                <button onClick={handleLogout}>LOGOUT</button>
            </div>
        </>
    )
}

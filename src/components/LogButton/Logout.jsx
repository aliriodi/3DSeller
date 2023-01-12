import React from 'react'

export default function Logout({ handleLogout }) {
    return (
        <>
            <div>
                <button onClick={handleLogout}>LOGOUT</button>
            </div>
        </>
    )
}

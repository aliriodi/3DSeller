import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function EmailVerified() {

    const {
        query: { updateSession },
        push,
    } = useRouter()
    const [refreshed, setRefreshed] = useState(false)
    const [isHover, setIsHover] = useState(false)

    useEffect(() => {
        if (updateSession === 'true') {
            fetch('/api/refreshToken').then(data => {
                if (data) setRefreshed(true)
            })
        }
    }, [updateSession])

    const boxStyle = {
        width: '100px', 
        height: '50px',
        fontWeight: '900',
        fontSize: '16px',
        marginTop: '8px', 
        borderRadius: '16px',
        backgroundColor: 'transparent',
        borderColor: '#F6C90E',
        borderWidth: '4px',
        color: '#F6C90E',
        cursor: 'pointer',
        opacity: isHover ? '0.7' : '1'
    }

    const handleMouseEnter = () => {
        setIsHover(true)
    }
    const handleMouseLeave = () => {
        setIsHover(false)
    }

    return (
        <div style={{ height: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ color: '#EEE' }}>Email Verified!</h1>
            {refreshed &&
                <button 
                    onClick={() => push('/')}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={boxStyle}   
                >
                    Home
                </button>}
        </div>
    )
}


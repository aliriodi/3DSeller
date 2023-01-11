import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function EmailVerified() {

    const {
        query: {updateSession},
        push,
    } = useRouter()
    const [refreshed, setRefreshed] = useState(false)

    useEffect(() => {
        if(updateSession === "true") {
            fetch('/api/refreshToken').then(data => {
                if(data) setRefreshed(true)
            })
        }
    }, [])
    return (
        <>
            <h1>Your email is verified</h1>

            {refreshed && <button onClick={() => push('/')}>Go to Home</button>}
        </>
    )
}

import React from 'react'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'

const Protected = () => {
  return (
    <>
        <h1>This is Protected Page</h1>
    </>
  )
}

// export const getServerSideProps = withPageAuthRequired({
//     returnTo: '/',
//     getServerSideProps: async ctx => {
//         const session = await getSession(ctx, req, ctx, res)
//         console.log(session)

//         return {
//             props: {}
//         }
//     }
// })

export default withPageAuthRequired(Protected)
import { handleProfile, withApiAuthRequired } from "@auth0/nextjs-auth0";

const handler = async (req, res) => {
    try {
        await handleProfile(req, res, {
            refetch: true,
            afterRefetch: async (_, __, session) => session
        })
    } catch (error) {
        console.log(error)
        return res.statu(error?.response?.status || 500).json({
            message: error.message
        })
    }
}

export default withApiAuthRequired(handler)

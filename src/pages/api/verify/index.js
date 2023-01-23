import Purchase from "../../../models/Purchase"
import { dbConect } from "../../../utils/mongoose"

dbConect()

export default async (req, res) => {
    if (req.method === "POST") {
        try {
            let purchases = await Purchase.find({"user.id": req.body.userId}).and({"product.id": req.body.productId})
            if (purchases.length) {
                return res.status(200).json({
                    status: 'success',
                    purchases
                })
            } else {
                return res.status(400).json({
                    status: 'error',
                    msg: "No se encontraron compras"
                })
            }
        } catch (error) {
            return res.status(404).json({
                status: "error",
                msg: error.message
            })
        }
    }
}
import Purchase from '../../../models/Purchase'
import {dbConect} from '../../../utils/mongoose'

dbConect()

export default async (req, res) => {
    if(req.method === "GET" && req.query.count[0] === "purchases") {
        try {
            let allPurchases = await Purchase.find({}).select("_id").sort({ "created_at": -1 }) 
            return res.status(200).json({
                status: 'success',
                msg: "Aqui esta el total de compras",
                purchasesCount: allPurchases.length
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                msg: "No se encontraron compras"
            })
        } 
    }
}
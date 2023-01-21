import NextCors from 'nextjs-cors';
import { dbConect } from 'utils/mongoose'
import Purchase from '../../../models/Purchase';
import User from '../../../models/User'

dbConect();

export default async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200 || 201,
      });
    if (req.method === "POST") {
        let { email } = req.body.user
        let userFoundInDB = await User.findOne({ "email": email }, '_id')
        let purchaseStored = await Purchase.create({
            user: userFoundInDB,
            order_id: req.body.purchase.id,
            created_at: req.body.purchase.purchase_units[0].payments.captures[0].create_time,
            purchase: {
                amount: {
                    value: req.body.purchase.purchase_units[0].payments.captures[0].amount.value,
                    currency: req.body.purchase.purchase_units[0].payments.captures[0].amount.currency_code,
                },
                shipping: {
                    full_name: req.body.purchase.purchase_units[0].shipping.name.full_name,
                    address_line_1: req.body.purchase.purchase_units[0].shipping.address.address_line_1,
                    admin_area_1: req.body.purchase.purchase_units[0].shipping.address.admin_area_1,
                    postal_code: req.body.purchase.purchase_units[0].shipping.address.postal_code,
                    country_code: req.body.purchase.purchase_units[0].shipping.address.country_code
                },
                payer: {
                    given_name: req.body.purchase.payer.name.given_name,
                    surname: req.body.purchase.payer.name.surname
                }
            }
        })
        return res.status(200).json({ 
            status: "success", 
            msg: "Purchase stored successfully!", 
            purchaseStored
        })
    }
} 
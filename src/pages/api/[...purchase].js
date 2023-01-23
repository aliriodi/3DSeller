import NextCors from 'nextjs-cors';
import { dbConect } from 'utils/mongoose'
import Purchase from '../../models/Purchase';
import User from '../../models/User'

dbConect();

export default async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200 || 201,
    });
    const { purchase } = req.query
    if (req.method === "GET" && req.query.purchase.length > 1) {
        Purchase.findOne({ "order_id": purchase[1] }, (err, purchaseFound) => {
            if (err || !purchaseFound) {
                return res.status(404).json({
                    status: 'error',
                    msg: `ERROR: ${err.message}`
                })
            }
            return res.status(200).json({
                status: 'success',
                purchase: purchaseFound
            })
        })
    }
    if (req.method === "GET" && req.query.purchase.length <= 1) {
        try {
            let response = await Purchase.find({}, 'user order_id')
            return res.status(200).json({
                status: 'success',
                msg: "Estas son la compras en tu base de datos",
                allPurchases: response
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                msg: 'No se encontro ninguna compra'
            })
        }
    }
    if (req.method === "POST") {
        let purchaseStored = await Purchase.create({
            user: {
                id: req.body.user._id
            },
            product: {
                id: req.body.product._id,
                name: req.body.product.name,
                price: req.body.product.price
            },
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
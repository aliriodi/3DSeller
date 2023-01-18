import Products from '../../../models/Products'
const paypal = require('@paypal/checkout-server-sdk')
let clientId = process.env.PAYPAL_CLIENT_ID
let clientSecret = process.env.PAYPAL_SECRET

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
let client = new paypal.core.PayPalHttpClient(environment)

export default async(req, res) => {
    if(req.method === "POST") {
        let productFoundInDB = await Products.findById({"_id": req.body.productID})
        let productPriceNumber = productFoundInDB.price;
        const valor = (Math.round(((productPriceNumber/300) + Number.EPSILON) * 100) / 100)+"";
        const request = new paypal.orders.OrdersCreateRequest()
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        value: valor,
                        currency_code: 'USD',
                    },
                    invoice_id: "threedSeller2023"
                }
            ],

        })
        const response = await client.execute(request)
        return res.json({ id: response.result.id})
    }
}
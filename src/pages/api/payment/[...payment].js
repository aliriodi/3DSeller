const paypal = require('@paypal/checkout-server-sdk')
let clientId = process.env.PAYPAL_CLIENT_ID
let clientSecret = process.env.PAYPAL_SECRET

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
let client = new paypal.core.PayPalHttpClient(environment)

export default async(req, res) => {
    const {query: {payment}} = req
    if(req.method === "POST") {
        const request = new paypal.orders.OrdersCreateRequest()
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: Math.round(((payment[0]/300) + Number.EPSILON) * 100) / 100
                    }
                }
            ]
        })
        const response = await client.execute(request)
        return res.json({ id: response.result.id})
    }
}
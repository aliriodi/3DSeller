import paypal from "@paypal/checkout-server-sdk";

// Creating an environment
let clientId = "ATkacPNlx1rEm20wznSCEFxJN9DoXoURPhNGwkz1F8UPdxwcz5fGrtPmtc9OVjyQrp09liKLtK4xntHs";
let clientSecret = "EFtwBOfgNFswngIRLxXncB_SNbCBRu5RwhzXHy27byjYdhgnGZwGALzXRc_6rG80XBeU0G63AfL5H8Vg";

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req, res) {
  if (req.method === "POST") {
    // console.log(req.body.purchase_units, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    if (!req.body.price) {
        console.log(req.body)
        return res.status(400).json({error: "No se encontro el precio del producto"});
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: req.body.price,
          },
        },
      ],
    });
    console.log(req.body)
    

    try {
        const response = await client.execute(request);
      console.log(response)
        return res.json({ id: response.result.id });
    } catch (error) { 
      return res.status(500).json({ error: "Error al procesar el pago" });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}
  
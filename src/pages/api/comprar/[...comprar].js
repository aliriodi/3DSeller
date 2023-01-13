import { transporter, mailOptions } from "../../../utils/nodemailer"

const CONTACT_MESSAGE_FIELDS = {
    material: "Material",
    color: "Color",
    relleno_inferior: "Relleno Inferior",
    acabado_superficial: "Acabado Superficial",
    escala: "Escala",
}


const generateEmailContent = (data, url) => {
    const stringData = Object.entries(data).reduce(
        (str, [key, val]) =>
            (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`)
        , "");

    const htmlData = Object.entries(data).reduce(
        (str, [key, val]) =>
            (str += `<h1 class="form-headin" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h1><p class="form-answer" align="left">${val}</p>`)
        , "")

    return {
        text: stringData,
        html: `<!DOCTYPE html>
        <html>
          <head>
            <title></title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
              body,
              table,
              td,
              a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
              }
              table {
                border-collapse: collapse !important;
              }
              body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
              }
              @media screen and (max-width: 525px) {
                .wrapper {
                  width: 100% !important;
                  max-width: 100% !important;
                }
                .responsive-table {
                  width: 100% !important;
                }
                .padding {
                  padding: 10px 5% 15px 5% !important;
                }
                .section-padding {
                  padding: 0 15px 50px 15px !important;
                }
              }
              .form-container {
                margin-bottom: 24px;
                padding: 20px;
                border: 1px dashed #ccc;
              }
              .form-heading {
                color: #2a2a2a;
                font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
                font-weight: 400;
                text-align: left;
                line-height: 20px;
                font-size: 18px;
                margin: 0 0 8px;
                padding: 0;
              }
              .form-answer {
                color: #2a2a2a;
                font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
                font-weight: 300;
                text-align: left;
                line-height: 20px;
                font-size: 16px;
                margin: 0 0 24px;
                padding: 0;
              }
              div[style*="margin: 16px 0;"] {
                margin: 0 !important;
              }
            </style>
          </head>
          <body style="margin: 0 !important; padding: 0 !important; background: #fff">
            <div
              style="
                display: none;
                font-size: 1px;
                color: #fefefe;
                line-height: 1px;
                max-height: 0px;
                max-width: 0px;
                opacity: 0;
                overflow: hidden;
              "
            ></div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td
                  bgcolor="#ffffff"
                  align="center"
                  style="padding: 10px 15px 30px 15px"
                  class="section-padding"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="max-width: 500px"
                    class="responsive-table"
                  >
                    <tr>
                      <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td>
                              <table
                                width="100%"
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                              >
                                <tr>
                                  <td
                                    style="
                                      padding: 0 0 0 0;
                                      font-size: 16px;
                                      line-height: 25px;
                                      color: #232323;
                                    "
                                    class="padding message-content"
                                  >
                                    <h2>Gracias Por tu Compra!</h2>
                                    <div class="form-container">${htmlData}</div>
                                    <a href=${url}><strong>Ver Producto</strong></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>`
    };
};

const handler = async (req, res) => {

    if (req.method === "POST") {
        const { query: { comprar } } = req
        const data = req.body

        if (!data.material || !data.color || !data.relleno_inferior || !data.acabado_superficial || !data.escala) {
            return res.status(400).json({ status: 'error', msg: 'Faltan datos por enviar' })
        }
        try {
            // let dbProduct = await Product.findById(comprar[1])
            await transporter.sendMail({
                from: mailOptions.from,
                to: comprar[0],
                ...generateEmailContent(data, `https://3dseller.vercel.app/productos/${comprar[1]}`),
                subject: "3DSeller | 3DP Printing Solutions",
                // attachments: [{path: ``}]
            })

            return res.status(200).json({ status: 'success' })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: error.message })
        }
    }
    return res.status(400).json({
        status: 'error',
        msg: 'Method not supported'
    })
}

export default handler
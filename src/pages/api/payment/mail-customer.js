import { mailOptions, transporter } from "../../../utils/nodemailer"


export default async(req, res) => {
    if(req.method === "POST") {
        // console.log(req.body)
        try {
            await transporter.sendMail({
                from: mailOptions.from,
                to: req.body.email,
                subject: "3DSeller | 3d Printing Solutions",
                text: `Gracias por tu Compra ${req.body.nickname}`,
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
                      .anchor__links {
                        color: #f6c90e;
                        font-size: 14px;
                      }
                      .anchor__links:hover {
                        cursor: pointer;
                        color: #EEE;
                      }
                      .anchor__links:visited {
                        opacity: 0.8;
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
                            style="max-width: 500px;"
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
                                            <div class="form-container" style="background-color: #303841; color: #EEE;">
                                                <header style="
                                                    min-height: 60px;
                                                    display: flex;
                                                    justify-content: space-evenly;
                                                    align-items: center;
                                                    background-color: #3a4750;
                                                    ">
                                                    <img src="../src/public/Logo.jpeg" alt="" style="max-height: 60px; max-width: 60px;" />
                                                    <h2 style="color: #EEE; font-weight: 100;">3DSeller | <span style="font-size: 16px;">Printing Solutions</span></h2>
                                                </header>
                                                <h4 class="form-headin" align="left">Puedes ver los detalles de tu compra en el siguiente enlace:</h4><p style="color: #EEE;" class="form-answer" align="left">👉🏽 <a class="anchor__links"  href="https://3dseller.vercel.app/ordenes/:orderId" target="_blank">Orden de compra</a></p>
                                            </div>
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
            })
            return res.status(200).json({ msg: "Email enviado correctamente" })
        } catch (error) {
            return res.status(400).json({status: 'error', ERROR: "no se mando el correo"})
        }
    }
}
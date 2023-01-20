import { mailOptions, transporter } from "../../../utils/nodemailer"


export default async(req, res) => {
    if(req.method === "POST") {
        // console.log(req.body)
        try {
            await transporter.sendMail({
                from: mailOptions.from,
                to: req.body.email,
                subject: req.body.subject,
                text: req.body.text
            })
            return res.status(200).json({ msg: "Email enviado correctamente" })
        } catch (error) {
            return res.status(400).json({status: 'error', ERROR: "no se mando el correo"})
        }
    }
}
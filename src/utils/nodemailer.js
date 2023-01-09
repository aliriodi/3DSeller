import nodemailer from 'nodemailer'

const email = process.env.EMAIL;
const password = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        password,
    },
})

export const mailOptions = {
    from: email,
    to: email,
}
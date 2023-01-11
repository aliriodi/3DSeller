import nodemailer from 'nodemailer'
import { useUser } from '@auth0/nextjs-auth0'

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;
const { user } = useUser()

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass,
    },
})

export const mailOptions = {
    from: email,
    to: email,
}

export const bannedUser = {
    from: email,
    to: user.email
}
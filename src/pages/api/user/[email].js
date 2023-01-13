/* eslint-disable import/no-anonymous-default-export */
import NextCors from 'nextjs-cors';
import { dbConect } from 'utils/mongoose'
import User from 'models/User'

dbConect();

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 201, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  const { method, body, query: { email } } = req
console.log('email')
console.log(method)
console.log(req)
  switch (method) {
    case "GET":
      try {
        const dataEmail = await User.findOne({email:email})
        return res.status(201).json(dataEmail)
      } catch (error) {
        console.log("🚀 ~ file: [email].js:26 ~ error", error)
      }

    case "PUT":
      try {
        //console.log(body)
        const dataPut = await User.findOneAndReplace({ email: email }, body,{})
         return res.status(201).json(dataPut)
      } catch (error) {
        console.log("🚀 ~ file: [email].js:34 ~ error", error)
      }


    case "DELETE":
      try {
        const dataDel = await User.deleteOne({ email: email })
        return res.status(201).json(dataDel)
      } catch (error) {
        console.log("🚀 ~ file: [id].js:43 ~ error", error)
      }

    default:
      return res.status(400).json({
        msg: 'This method is not supported'
      });
  }
}

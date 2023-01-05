/* eslint-disable import/no-anonymous-default-export */
import NextCors from 'nextjs-cors';
import { dbConect } from 'utils/mongoose'
import Product from 'models/Products'

dbConect();

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  const { method, body, query: { id } } = req


  //todo poner try catch a todos no olvidar

  switch (method) {
    case "GET":
      const dataId = await Product.findById(id)
      return res.status(201).json(dataId)

    case "PUT":
      const dataPut = await Product.findByIdAndUpdate(id, body, {
        new: true
      })
      return res.status(201).json(dataPut)

    case "DELETE":
      const dataDel = await Product.deleteOne({ _id: id })
      return res.status(201).json(dataDel)

    default:
      return res.status(400).json({
        msg: 'This method is not spported'
      });
  }
}

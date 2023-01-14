// import { dbConect } from '../../../utils/mongoose'
// import Product from '../../../models/Products'
import User from 'models/User'
import { dbConect } from 'utils/mongoose'
import NextCors from 'nextjs-cors';

dbConect()

export default async function handler(req, res) {
  // console.log(req.method, req.url);
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200 || 201, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  //todo poner try catch a todos no olvidar
  const { method, body } = req
  switch (method) {
    case "GET":
      try {
        const user = await User.find({})
        return res.status(200).json(user)
      } catch (error) {
        console.log("🚀 ~ file: index.js:25 ~ handler ~ error", error)
      }

      case "PUT":
      try {
        //console.log(body)
        const dataPut = await User.findOneAndReplace({ email: email }, body,{})
         return res.status(201).json(dataPut)
      } catch (error) {
        console.log("🚀 ~ file: [email].js:34 ~ error", error)
      }


    case "POST":
      try {        
                   const user = await User.find({email: body.email})
                   console.log(user);
                   if(user.length!==0){
                     console.log('usuario existe no se crea');
                     return res.status(201).json('Usuario existe no se crea') }
                   else{
                    console.log('usuario creado') 
                    const data =  User.create(body)
                    return res.status(201).json(data)
               }} catch (error) {
                 console.log("🚀 ~ file: index.js:41 ~ handler ~ error", error)
           
      }
    default:
      return res.status(400).json({
        msg: 'This method is not spported'
      });
  };


}

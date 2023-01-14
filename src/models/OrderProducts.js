// const mongoose = require('mongoose')
import { Schema, model, models } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'
const orderProductScheme = new Schema(
    {
      idorder: {
        type: number,
        // requires: [true, 'Title is required'],
        // unique: true,
        // trim: true,
        // maxLength: [40, 'Title must be less than 40 characters']
      },
      product:{
        type:number ,
        
      },
      quantity:{
        type:number
      },     
},
    {
      timestamps: true,
      versionKey: false
    }
  )
  orderProductScheme.plugin(uniqueValidator)
  export default models.orderProduct || model('orderProduct', orderProductScheme)
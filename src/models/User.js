// const mongoose = require('mongoose')
import { Schema, model, models } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'
const UserScheme = new Schema(
    {
      name: {
        type: String,
        // requires: [true, 'Title is required'],
        // unique: true,
        // trim: true,
        // maxLength: [40, 'Title must be less than 40 characters']
      },
      email:{
        type: String,
        unique: true,
        dropDups: true,
        required: true
      },
      favorites:{
        type: Array,
      },
      rol:{
        type: String,
        default:'client'
      },
      picture:{
        type: String,
       },
       compras:{
        type:Array,
       },
      
},
    {
      timestamps: true,
      versionKey: false
    }
  )
  UserScheme.plugin(uniqueValidator)
  export default models.User || model('User', UserScheme)
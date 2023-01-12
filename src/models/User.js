// const mongoose = require('mongoose')
import { Schema, model, models } from 'mongoose';

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
      },
      favorites:{
        type: Array,
      },
      rol:{
        type: String,
        default:'client'
      },
      image:{
        type: String,
       },
      
},
    {
      timestamps: true,
      versionKey: false
    }
  )

  export default models.User || model('User', UserScheme)
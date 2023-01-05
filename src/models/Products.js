// const mongoose = require('mongoose')
import { Schema, model, models } from 'mongoose';

const ProductsScheme = new Schema(
  {
    name: {
      type: String,
      requires: [true, 'Title is required'],
      unique: true,
      trim: true,
      maxLength: [40, 'Title must be less than 40 characters']
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: [200, 'Title must be less than 200 characters']
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    },
    stock: {
      type: Number,
    },
    category: {
      type: ["none", "figure", "mate cup", "world cup", "clothes", "mobile", "anime", "other"],
      default: 'other'
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default models.Products || model('Products', ProductsScheme)

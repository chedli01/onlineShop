import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.Number,
    unique: true,
    required: true,
  },
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  quantity: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  price:{
    type: mongoose.Schema.Types.Number,
    required: true,

  },
  imageUrl:{
    type: mongoose.Schema.Types.String,
    required: true,

  }
});


const Product =mongoose.model("products",productSchema)

export default Product

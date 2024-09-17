import mongoose from "mongoose"

const orderSchema= new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.Number,
        unique:true,
        required:true
    },
    productIds:{
        type:mongoose.Schema.Types.Array,
        required:true
    },
    userEmail:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    productQuantity:{
        type:mongoose.Schema.Types.Array,
        required:true
    },
    orderDate:{
        type:mongoose.Schema.Types.Date,
        required:true
    },
    orderStatus:{
        type:mongoose.Schema.Types.String,
        required:true,
    }

})

const Order=mongoose.model("orders",orderSchema)

export default Order;
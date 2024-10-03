import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    email:{
        type:mongoose.Schema.Types.String,
        required:true,
        unique:true


    },
    password:{
        type:mongoose.Schema.Types.String,
        required:true,

    },
    imageURL:{
        type:mongoose.Schema.Types.String,
        default:""


    }


})

const User=mongoose.model("users",userSchema);
export default User;
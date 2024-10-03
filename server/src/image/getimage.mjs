import { Route, Router } from "express";
import Order from "../mongodb/orderSchema.mjs";
import User from "../mongodb/userSchema.mjs";

const route = Router();

route.get("/getImage",async(req,res)=>{
    const user=await User.findOne({email:req.cookies.loginCookie.email});
    res.json(user.imageURL);
  })

  route.get("/orderbyuser",async(req,res)=>{
    const result=await Order.find({userEmail:req.cookies.loginCookie.email})
    res.json(result)
})


export default route;
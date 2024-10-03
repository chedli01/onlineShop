import { json, Router } from "express";
import Order from "../mongodb/orderSchema.mjs";

const route = Router();

route.get("/listOrders",async(request,response)=>{

    const result=await Order.find();

    return response.json(result)

})

route.get("/orderbyuser",async(req,res)=>{
    const result=await Order.find({userEmail:req.cookies.loginCookie.email})
    res.json(result)
})

export default route;
import { Router } from "express";
import Product from "../mongodb/productSchema.mjs";
import mongoose from "mongoose";
import Order from "../mongodb/orderSchema.mjs";


const route = Router();





route.get("/notifs",(req,res)=>{

    res.setHeader("Content-Type","text/event-stream");
    res.setHeader("Cache-Control","no-cache");
    res.setHeader("Connection","keep-alive");

    const changeStream=Order.watch([],{fullDocument: 'updateLookup' });
    changeStream.on("change",async(change)=>{
        if(change.updateDescription.updatedFields.orderStatus&&change.fullDocument.userEmail==req.cookies.loginCookie.email){
            res.write(`data: Your Order number ${change.fullDocument.id} Status Has Been Updated To ${change.updateDescription.updatedFields.orderStatus}\n\n`);

            
           
        }
        
        
    });


    req.on("close",()=>{
        changeStream.close();
        res.end();
    })


   

    





    

})

export default route;




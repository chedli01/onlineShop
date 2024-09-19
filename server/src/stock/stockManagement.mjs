import { Router } from "express";
import Product from "../mongodb/productSchema.mjs";

const route = Router();


route.post("/minusStock/:id",async(request,response)=>{

    const quantiyToAdd=request.body.quantity;
    const id=request.params.id;
    const product=await Product.findOne({id:id});
    const mainQuantity=product.quantity;
    const newQuantity=parseInt(mainQuantity)-parseInt(quantiyToAdd)


    await Product.updateOne({id:id},{$set:{quantity:newQuantity}})
    response.sendStatus(200);

});


route.get("/quantityInStock/:id",async(request,response)=>{
    const id = request.params.id;

    const product=await Product.findOne({id:id});

    response.json({quantity:product.quantity});


})

export default route;
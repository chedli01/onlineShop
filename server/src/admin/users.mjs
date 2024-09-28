import { Router } from "express";
import User from "../mongodb/userSchema.mjs";
import Product from "../mongodb/productSchema.mjs";
import Order from "../mongodb/orderSchema.mjs";

const route = Router();

route.get("/getUsers", async (request, response) => {
  const result = await User.find();
  response.json(result);
});

route.get("/getProducts", async (request, response) => {
  const search = request.query.search;
  const category = request.query.category;
  if (search != "") {
    if (category == "") {
      const result = await Product.find({
        name: { $regex: search, $options: "i" },
      });
      response.json(result);
    } else {
      const result = await Product.find({
        name: { $regex: search, $options: "i" },
        category: category,
      });
      response.json(result);
    }
  } else {
    if (category == "") {
      const result = await Product.find();
      response.json(result);
    }
    else{
      const result = await Product.find({category:category});
      response.json(result);

    }
  }
});

route.get("/getOrders",async(req,res)=>{
  const result=await Order.find();
  res.json(result)
})

route.post("/editOrder/:id",async(req,res)=>{
  const id=req.params.id;
  await Order.updateOne({id:id},{$set:{orderStatus:req.body.status}})
  res.sendStatus(200)
})

route.post("/editProductPrice/:id",async(req,res)=>{
  const id=req.params.id;
  await Product.updateOne({id:id},{$set:{price:parseInt(req.body.newPrice)}})
  res.sendStatus(200)
})

route.post("/editProductQuantity/:id",async(req,res)=>{ 
  const id = req.params.id;
  await Product.updateOne({id:id},{$set:{quantity:parseInt(req.body.newQuantity)}})
  res.sendStatus(200)
})
export default route;

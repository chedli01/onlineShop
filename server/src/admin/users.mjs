import { Router } from "express";
import User from "../mongodb/userSchema.mjs";
import Product from "../mongodb/productSchema.mjs";

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

export default route;

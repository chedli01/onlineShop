import { query, Router } from "express";
import Product from "../mongodb/productSchema.mjs";

const route = Router();


route.get("/list-products", async (request, response) => {
  if(request.session.search){
    const searchValue=request.session.search.searchValue;
    return response.json(await Product.find({name:searchValue}))
  }
  if (!request.session.filter) return response.json(await Product.find());
  else {
    const { category, minPrice, maxPrice } = request.session.filter;
    if (category == "") {
      if (minPrice >= maxPrice) {
        return response.json(await Product.find());
      } else {
        return response.json(
          await Product.find({
            price: { $gt: minPrice, $lt: maxPrice },
          })
        );
      }
    }
    else{
        if (minPrice >= maxPrice) {
            return response.json(await Product.find({category:category}));
          }
        else{
            return response.json(
                await Product.find({
                  category: category,
                  price: { $gt: minPrice, $lt: maxPrice },
                })
              );
        }

    }
  }
});

export default route;

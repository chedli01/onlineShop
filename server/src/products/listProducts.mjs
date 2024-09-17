import { query, Router } from "express";
import Product from "../mongodb/productSchema.mjs";

const route = Router();


route.get("/list-products", async (request, response) => {
  const sort=request.query.sort;
  const category=request.query.category;
  const minPrice=request.query.minPrice;
  const maxPrice=request.query.maxPrice;
  let sortCriteria;

  switch (sort) {
    case 'price_asc':
      sortCriteria = { price: 1 }; // Ascending price
      break;
    case 'price_desc':
      sortCriteria = { price: -1 }; // Descending price
      break;
    case 'name_asc':
      sortCriteria = { name: 1 }; // Alphabetical order A to Z
      break;
    case 'name_desc':
      sortCriteria = { name: -1 }; // Alphabetical order Z to A
      break;
    default:
      sortCriteria = {}; // Default no sorting
  }

  if(request.session.search){
    const searchValue=request.session.search.searchValue;
    return response.json(await Product.find({name:searchValue}))
  }
  if (category==""&&minPrice==5000&&maxPrice==5000) return response.json(await Product.find().sort(sortCriteria));
  else { 
    if (category == "") {
      if (minPrice >= maxPrice) {
        return response.json(await Product.find().sort(sortCriteria));
      } else {
        return response.json(
          await Product.find({
            price: { $gt: minPrice, $lt: maxPrice },
          }).sort(sortCriteria)
        );
      }
    }
    else{
        if (minPrice >= maxPrice) {
            return response.json(await Product.find({category:category}).sort(sortCriteria));
          }
        else{
            return response.json(
                await Product.find({
                  category: category,
                  price: { $gt: minPrice, $lt: maxPrice },
                }).sort(sortCriteria)
              );
        }

    }
  }
});

export default route;

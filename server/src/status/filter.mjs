import { request, Router } from "express";

const route = Router();

route.post("/setFilter", (request, response) => {
  request.session.filter = {
    category: request.body.category,
    minPrice: request.body.minPrice,
    maxPrice: request.body.maxPrice,
  };
  response.sendStatus(200);
});



export default route;

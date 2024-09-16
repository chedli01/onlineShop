import { Router } from "express";

const route = Router();
route.post("/add-to-cart", async (request, response) => {
  if (request.session.cart.length == 0) {
    request.session.cart.push(request.body);
    response.cookie('cartSession',request.session.cart,{
      secure:false,
      httpOnly:true,
      maxAge:1000*60*60,
    })
    return response.sendStatus(200);
  } else {
    if (request.session.cart.find((item) => item.id == request.body.id)) {
      request.session.cart.map((item) => {
        item.id == request.body.id
          ? (item.quantity =
              parseInt(item.quantity) + parseInt(request.body.quantity))
          : item;
      });
    } else {
      request.session.cart.push(request.body);
      response.cookie('cartSession',request.session.cart,{
        secure:false,
        httpOnly:true,
        maxAge:1000*60*60,
      })
    }


    return response.sendStatus(200);
  }
});

route.get("/cart", (request, response) => {
  if(!request.cookies.cartSession){request.session.cart=[] }
  response.json(request.session.cart);
});

route.post("/delete-from-cart", (request, response) => {
  const result = request.session.cart.find(
    (item) => item.id == request.body.id
  );
  if (result) {
    if (result.quantity > 1) {
      request.session.cart.map((item) => {
        item.id == result.id ? (item.quantity = item.quantity - 1) : item;
      });
      return response.sendStatus(200);
    } else {
      request.session.cart = request.session.cart.filter(
        (item) => item.id != request.body.id
      );
      return response.sendStatus(200);
    }
  }
  request.session.cart = request.session.cart.filter(
    (item) => item.id != request.body.id
  );
  return response.sendStatus(200);
});

route.get("/total-cart", (request, response) => {
  if (request.session.cart) {
    return response.json({ total: request.session.cart.length });
  } else {
    return response.json({ total: 0 });
  }
});

route.get("/total-price",async(request,response)=>{
    if(request.session.cart){
        const result=await request.session.cart.reduce((acc,curr)=>{return acc+parseFloat(curr.price)*parseFloat(curr.quantity)},0);
        return response.json({total:result})
    }
    return response.json({total:0})

})

route.get("/clear-cart",async (request,response)=>{
  request.session.cart=[];
  response.send("cleared")
})

export default route;

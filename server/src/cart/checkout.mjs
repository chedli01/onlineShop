import { Router } from "express";

const route = Router()


route.get("/checkout",async (request,response)=>{
    if(!request.session.cart || request.session.cart.length==0){
        return response.send(false)
    }
    return response.send(true)
})

export default route;
import { Router } from "express";

const route = Router();

route.post("/add-quantity",(request,response)=>{

    request.session.cart.map((item,index)=>{
        if(item.id==request.body.id){
            item.quantity=parseInt(item.quantity)+1
        }
    })

    return response.sendStatus(200)


})

route.post("/delete-item",(request,response)=>{
    request.session.cart=request.session.cart.filter((item)=>item.id!=request.body.id )
    return response.sendStatus(200)

})

export default route;
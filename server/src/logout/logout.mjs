import { Router } from "express";

const route=Router();

route.get("/logout",(request,response)=>{
    // request.session.email=null;
    // request.session.name=null;
    request.session.destroy();
    response.clearCookie('connect.sid');
    response.clearCookie('loginCookie');
    response.clearCookie('cartSession')


     response.send("logout successfully")

})

export default route;
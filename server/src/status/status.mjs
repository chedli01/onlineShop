import { Router } from "express";
import { connect } from "mongoose";

const route = Router();

route.get("/status",(request,response)=>{

    if(request.cookies.loginCookie) return response.json({connected:true,email:request.session.email,name:request.session.name})
    else return response.json({connected:false})
    

})

export default route;
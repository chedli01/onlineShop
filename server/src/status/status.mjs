import { Router } from "express";
import { connect } from "mongoose";

const route = Router();

route.get("/status",(request,response)=>{

    if(request.cookies.loginCookie) return response.json({connected:true,email:request.cookies.loginCookie.email,name:request.cookies.loginCookie.name})
    else return response.json({connected:false})
    

})

export default route;
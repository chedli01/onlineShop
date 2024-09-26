import { Router } from "express";

const route = Router();

route.get("/adminStatus",(req,res)=>{
    if(req.cookies.adminLogin){res.json(true)}
    else{
        res.json(false)
    }
})

export default route;
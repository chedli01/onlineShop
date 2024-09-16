import { Router } from "express";

const route = Router()

route.get("/unfilter",(request,response)=>{
    request.session.filter=null;
    request.session.search=null;
    response.send("unfiltred")
})
route.get("/filter-status",async(request,response)=>{
    if((request.session.filter) || (request.session.search)){
        response.json({valid:true})
    }
    else{
        response.json({valid:false})
    }
})

export default route;
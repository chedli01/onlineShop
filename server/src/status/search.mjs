import {request, response, Router} from "express"
import session from "express-session";

const route=Router()

route.post("/search",(request,response)=>{
    if(request.body.searchValue!="") {
        request.session.search={searchValue:request.body.searchValue};
        response.sendStatus(200)

    }
})



export default route;
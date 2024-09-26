import { Router } from "express";

import {OAuth2Client} from "google-auth-library";
import Admin from "../mongodb/adminSchema.mjs";
const route=Router();


route.post("/adminlog",async(req,res)=>{
    res.header("Referrer-Policy","no-referrer-when downgrade");
    const redirectURL="http://localhost:3000/oauth"
    const oAuth2Client=new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectURL
    ) 

    const authorizeUrl=oAuth2Client.generateAuthUrl({
        access_type:"offline",
        scope:["https://www.googleapis.com/auth/userinfo.profile openid","https://www.googleapis.com/auth/userinfo.email"].join(' '),
        prompt:"consent"
    }

    

    );
    
    res.json({url:authorizeUrl})
    
    
})

route.post("/adminlogEmailAndPass",async(req,res)=>{
    const findAdmin=await Admin.find({username:req.body.username,password:req.body.password})
    if(findAdmin.length!=0){
        res.cookie("adminLogin",{username:req.body.username,email:req.body.email},
            {
                maxAge:1000*60*60,
                httpOnly:true,
                secure: true,
                sameSite: 'None'
            }
        )
        return res.json(true)

    }


    return res.json(false)


     

})



export default route;










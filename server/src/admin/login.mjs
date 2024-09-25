import { Router } from "express";

import {OAuth2Client} from "google-auth-library";
const route=Router();


route.post("/adminlog",async(req,res)=>{
    res.header("Referrer-Policy","no-referrer-when downgrade");
    const redirectURL="http://127.0.0.1:3000/oauth"
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

export default route;










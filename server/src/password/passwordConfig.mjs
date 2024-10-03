import { Router } from "express";
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import User from "../mongodb/userSchema.mjs";




const route = Router();
dotenv.config();

route.post("/request-reset-password",async(req,res)=>{
    const email=req.cookies.loginCookie.email;
    
    const token=jwt.sign({email:email},process.env.JWT_SECRET,{expiresIn:'1h'});

    const redirectURL=`http://localhost:5173/profile/resetpassword/${token}`

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          name: "e-commerce",
          pass: process.env.EMAIL_PASS,
        },
      });
      const configs = {
        from: ` TichTech e-commerce <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset',
        text: `Clik the link below to reset your password:\n\n${redirectURL}\n\nThis Link Will Expire In One Hour `
      };

    await transporter.sendMail(configs);

    res.sendStatus(200)


})



route.post("/reset-password/:token",async(req,res)=>{

    const token=req.params.token;
   
    const decoded=await jwt.verify(token,process.env.JWT_SECRET);
    const email=decoded.email;
    bcrypt.hash(req.body.newPassword,10,async(err,hash)=>{
        if(err) console.log(err)
        else{
            await User.updateOne({email:email},{$set:{password:hash}})
        }
    });
    res.sendStatus(200)
    

    
})


export default route;
import { Router } from "express";
import User from "../mongodb/userSchema.mjs";
import bcrypt from "bcrypt";

const route = Router();

route.post("/login", async (request, response) => {
  if (!request.body.email || !request.body.password)
    return response.status(400).json({ msg: "error occured" });
  const findUser = await User.findOne({ email: request.body.email });
  if (!findUser) return response.status(404).json({ msg: "user not found" });

  const isMatch = await bcrypt.compare(
    request.body.password,
    findUser.password
  );
  if (!isMatch) return response.status(400).json({ msg: "bad password" });
  else {


    

    response.cookie('loginCookie',{email:findUser.email,name:findUser.username},{
      maxAge:1000*60*60*24,
      secure:false,
      httpOnly:true,
      sameSite: 'lax'
    })
    request.session.cart=[];    

    return response.json(findUser);
  }
});



export default route;

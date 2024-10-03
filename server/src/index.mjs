import express from "express";
import cors from "cors";
import dbconfig from "./mongodb/connect.mjs";
import registrationRouter from "./register/register.mjs";
import loginRouter from "./login/login.mjs";
import session from "express-session";
import cookieParser from "cookie-parser";
import statusRouter from "./status/status.mjs";
import logoutRouter from "./logout/logout.mjs";
import productListRouter from "./products/listProducts.mjs";

import searchRouter from "./status/search.mjs";
import addToCartRouter from "./cart/addToCart.mjs";
import sendEmailRouter from "../mailing/sendEmail.mjs";
import generatePdfRouter from "./pdf/generate.mjs";
import checkoutRouter from "./cart/checkout.mjs";
import quantityRouter from "./cart/manageQuantity.mjs";
import stockManagementRouter from "./stock/stockManagement.mjs";
import orderRouter from "./orders/orderList.mjs"
import notifRouter from "./notifications/sendNotif.mjs"
import userRouter from "./admin/users.mjs"
import adminlogRouter from "./admin/login.mjs"
import oauthRouter from "./admin/oauth.mjs"
import adminStatusRouter from "./admin/status.mjs"
import contactRouter from "../mailing/contactUser.mjs"
import chartRouter from "./admin/analytics.mjs"
import {WebSocketServer} from "ws";
import http from "http";



const app = express();
const server=http.createServer(app);



 

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      // sameSite: 'None',       // Allows cross-origin cookies

      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
  })
);

dbconfig();

///////////////////////////////
app.use(registrationRouter);
app.use(loginRouter);
app.use(statusRouter);
app.use(logoutRouter);
app.use(productListRouter);
app.use(searchRouter);
app.use(addToCartRouter);
app.use(sendEmailRouter);
app.use(generatePdfRouter);
app.use(checkoutRouter);
app.use(quantityRouter);
app.use(stockManagementRouter);
app.use(orderRouter);
app.use(notifRouter);
app.use(userRouter)
app.use(adminlogRouter)
app.use(oauthRouter)
app.use(adminStatusRouter)
app.use(contactRouter)
app.use(chartRouter)
///////////////////
function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(';').forEach(cookie => {
      const [name, ...rest] = cookie.split('=');
      const value = decodeURIComponent(rest.join('=')).trim();
      
      // Check if the value starts with "j:"
      if (value.startsWith('j:')) {
          try {
              // Parse the JSON value after removing the "j:" prefix
              cookies[name.trim()] = JSON.parse(value.slice(2));
          } catch (error) {
              console.error('Error parsing cookie JSON:', error);
          }
      } else {
          cookies[name.trim()] = value;
      }
  });

  return cookies;
}
const clients = new Map();
const admins=new Map();
//////////////////////
const wss = new WebSocketServer({server});

wss.on("connection",(ws,req)=>{
  const cookies=parseCookies(req.headers.cookie);
  const admin=cookies.adminLogin;
  const client=cookies.loginCookie;
  if(admin){
    admins.set(admin.email,ws);
    
  }
  else{
    clients.set(client.email,ws);
    
  }

  ws.on("message",(message)=>{
    // console.log(JSON.parse(message).target)
    // console.log(req.headers.cookie)
    if(parseCookies(req.headers.cookie).adminLogin){
      const targetWs=clients.get(JSON.parse(message).target)
      const sender=parseCookies(req.headers.cookie).adminLogin.email
      if(targetWs)
      targetWs.send(JSON.stringify({sender:sender,msg:JSON.parse(message).msg}));
    }
    else{
      const sender=parseCookies(req.headers.cookie).loginCookie.email
      if(JSON.parse(message).target==""){admins.forEach((admin)=>{admin.send(JSON.stringify({sender:sender,msg:JSON.parse(message).msg}))})}
      const targetWs=admins.get(JSON.parse(message).target)
     
      if(targetWs)
      targetWs.send(JSON.stringify({sender:sender,msg:JSON.parse(message).msg}));

    }
  })
  ws.on("close",()=>{ws.close();})

})
////////////////////////
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
//////////////////////////////



// const wss=new WebSocketServer({server});
// wss.on("connection",(ws,req)=>{
//   // const url = new URL(req.url, `http://${req.headers.host}`);
//   // const sessionId = url.searchParams.get('emailUser');
//   const cookies=parseCookies(req.headers.cookie)
//   // console.log("user",cookies.loginCookie);
//   // console.log("admin",cookies.adminLogin)
//   const loginCookie=cookies.loginCookie;

//   const adminCookie=cookies.adminLogin;
//   if(loginCookie){
//     clients.set(loginCookie.email, ws);
//   }
//   else{
//     clients.set(adminCookie.email, ws);


//   }
  


//   ws.on("message",(message)=>{
//     const parsedMessage=JSON.parse(message);
//     const clientID=parsedMessage.sender;

//     const targetWs = clients.get(parsedMessage.target)
//     if (targetWs) {
//       targetWs.send(JSON.stringify({
//         senderId: clientID,
//         content: parsedMessage.content
//       }));
//     }
    
//   })
//   ws.on("close",()=>{ws.close();}
    
//   )

// })
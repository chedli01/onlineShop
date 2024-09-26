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



const app = express();

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
      sameSite: 'None',       // Allows cross-origin cookies

      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
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
////////////////////////
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
///////////////////////////////

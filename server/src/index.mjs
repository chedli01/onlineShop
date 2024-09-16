import express from "express";
import cors from "cors";
import dbconfig from "./mongodb/connect.mjs";
import User from "./mongodb/userSchema.mjs";
import registrationRouter from "./register/register.mjs";
import loginRouter from "./login/login.mjs";
import session from "express-session";
import cookieParser from "cookie-parser";
import statusRouter from "./status/status.mjs";
import logoutRouter from "./logout/logout.mjs";
import Product from "./mongodb/productSchema.mjs";
import productListRouter from "./products/listProducts.mjs"
import filterRouter from "./status/filter.mjs"
import unfilterRouter from "./status/unfilter.mjs"
import searchRouter from "./status/search.mjs"
import addToCartRouter from "./cart/addToCart.mjs"
import sendEmailRouter from "../mailing/sendEmail.mjs"
import generatePdfRouter from "./pdf/generate.mjs"
import checkoutRouter from "./cart/checkout.mjs";
import quantityRouter from "./cart/manageQuantity.mjs";
import dotenv from "dotenv";


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
      maxAge: 1000 * 60 * 60 * 24*2,
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
app.use(filterRouter)
app.use(productListRouter);
app.use(unfilterRouter);
app.use(searchRouter)
app.use(addToCartRouter)
app.use(sendEmailRouter)
app.use(generatePdfRouter);
app.use(checkoutRouter);
app.use(quantityRouter);

////////////////////////
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
///////////////////////////////

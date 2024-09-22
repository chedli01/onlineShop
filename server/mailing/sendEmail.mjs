import { Router } from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import puppeteer from "puppeteer";
import { Stream } from "stream";
import fs from "fs";
import handlebars from "handlebars";
import Order from "../src/mongodb/orderSchema.mjs";

const route = Router();
dotenv.config();

handlebars.registerHelper("multiply", (a, b) => {
  return parseInt(a) * parseFloat(b);
});

route.post("/sendemail", async (req, res) => {
  const data = {
    invoiceId: 1,
    date: new Date().toDateString(),
    fullName: req.body.name,
    Email: req.body.email,
    orderDate: req.body.date,
    phone: req.body.phone,
    adress: req.body.adress,
    tableData: req.session.cart,
    total: req.body.total,
    orderID:req.body.orderID,
  };

  const htmlPage = fs.readFileSync(
    "C:/Users/GMI/Desktop/onlineShop/server/mailing/facture.html",
    "utf-8"
  );
  const template = handlebars.compile(htmlPage);
  const htmlContent = template(data);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  const pdfStream = new Stream.PassThrough();
  await page
    .pdf({ format: "A4", printBackground: true })
    .then((buffer) => pdfStream.end(buffer));
  await browser.close();

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
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
    attachments: {
      filename: "invoice.pdf",
      content: pdfStream,
      contentType: "application/pdf",
    },
  };
  const orders=await Order.find();
  const id=orders?orders[orders.length-1].id+1:0;
  const productIds = await req.session.cart.map((item) => {
    return item.id;
  });
  const productQuantity = await req.session.cart.map((item) => {
    return item.quantity;
  });

  

  const result = await transporter.sendMail(configs);
  Order.create({
    id: id,
    productIds: productIds,
    userEmail: req.cookies.loginCookie.email,
    productQuantity: productQuantity,
    orderDate: new Date(),
    orderStatus: "pending",
  });
  req.session.cart = [];
  res.sendStatus(200);
});

export default route;

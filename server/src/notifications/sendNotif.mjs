import { Router } from "express";
import Product from "../mongodb/productSchema.mjs";
import mongoose from "mongoose";
import Order from "../mongodb/orderSchema.mjs";

const route = Router();

route.get("/notifs", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const changeStream = Order.watch([], { fullDocument: "updateLookup" });
  changeStream.on("change", async (change) => {
    if (
      change.updateDescription.updatedFields.orderStatus &&
      change.fullDocument.userEmail == req.cookies.loginCookie.email
    ) {
      res.write(
        `data: Your Order number ${change.fullDocument.id} Status Has Been Updated To ${change.updateDescription.updatedFields.orderStatus}\n\n`
      );
    }
  });

  req.on("close", () => {
    changeStream.close();
    res.end();
  });
});

route.get("/cart-notifs", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const quantityStream = Product.watch([], { fullDocument: "updateLookup" });
  quantityStream.on("change", async (change) => {
    if(change.operationType=="update"){
    if (change.updateDescription.updatedFields.quantity) {
      if (req.session.cart) {
        const result = req.session.cart.find(
          (item) => item.id == change.fullDocument.id
        );
        if (
          result &&
          result.quantity > change.updateDescription.updatedFields.quantity
        ) {
          req.session.cart = req.session.cart.filter(
            (item) => item.id != change.fullDocument.id
          );

          res.write("event: notif\n");
          res.write(
            `data: The Product   ${change.fullDocument.name} in your cart is now out of stock Please Refresh Your Cart\n\n`
          );

          setInterval(() => {
            res.write("event: update\n");
            res.write(`data: ${JSON.stringify(req.session.cart)}\n\n`);
          }, 5000);
        }
      }
    }}
  });

  req.on("close", () => {
    quantityStream.close();
    res.end();
  });
});

route.get("/price-notifs", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const changeStream = Product.watch([], { fullDocument: "updateLookup" });

  changeStream.on("change", async (change) => {
    if(change.operationType=="update"){
    if (change.updateDescription.updatedFields.price) {
      const findProduct = await req.session.cart.find(
        (item) => item.id == change.fullDocument.id
      );
      if (findProduct) {
        const newCart = await req.session.cart.map((item) => {
          if (item.id == change.fullDocument.id)
            return {
              ...item,
              price: change.updateDescription.updatedFields.price,
            };
          else return item;
        });
        req.session.cart = newCart;

        res.write("event: notif\n");
        res.write(
          `data: The price of the product ${change.fullDocument.name} is updated to ${change.fullDocument.price}\n\n`
        );

        setInterval(() => {
          res.write("event: update\n");
          res.write(`data: ${JSON.stringify(req.session.cart)}\n\n`);
        }, 5000);
      }
    }}
  });

  req.on("close", () => {
    changeStream.close();
    res.end();
  });
});

export default route;

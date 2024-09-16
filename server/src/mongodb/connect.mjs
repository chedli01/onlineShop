import mongoose from "mongoose";

export default async function dbconfig() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/shop")
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
}

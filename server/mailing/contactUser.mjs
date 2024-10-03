import { Router } from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

const route = Router();
dotenv.config();

route.post("/contact",(req, res) => {
  const { email, subject, text } = req.body;

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

  const configs={
    from: ` TichTech e-commerce <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    text: text,
  }

  transporter.sendMail(configs);

  res.sendStatus(200)
});

export default route;

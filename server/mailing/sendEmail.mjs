import { Router } from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path" 
import PDFDocument from "pdfkit"
import puppeteer from "puppeteer"
import { Stream } from "stream";
import fs from "fs"

const route = Router();
dotenv.config();

route.post("/sendemail", async (req, res) => {
    
    const htmlContent= fs.readFileSync("C:/Users/GMI/Desktop/onlineShop/server/mailing/facture.html","utf-8")
    const browser= await puppeteer.launch();
    const page= await browser.newPage();
    await page.setContent(htmlContent,{ waitUntil: 'networkidle0' })
    const pdfStream=new Stream.PassThrough();
    await page.pdf({format: 'A4', printBackground: true}).then(buffer=>pdfStream.end(buffer))
    await browser.close();
   
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      name:"e-commerce",
      pass: process.env.EMAIL_PASS,
    },
  });

  const configs = {
    from: `e-commerce <${process.env.EMAIL_USER}>`,
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
    attachments:{
        filename:"document.pdf",
        content:pdfStream,
        contentType: 'application/pdf',
    }
  };

  const result=await transporter.sendMail(configs)

  res.send(result);
});

export default route;

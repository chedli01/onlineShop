import { Router } from "express";
import pdf from "html-pdf";
import path from "path";
import PDFDocument from "pdfkit"


const route = Router();


route.get("/generate-pdf", (req, res) => {
    const doc = new PDFDocument();
  
  // Set response headers for PDF
  res.setHeader('Content-disposition', 'attachment; filename=example.pdf');
  res.setHeader('Content-type', 'application/pdf');
  
  // Pipe PDF into the response
  doc.pipe(res);
  
  // Add some content to the PDF
  doc.fontSize(25).text('Hello, world!', 100, 100);
  
  // Finalize the PDF and end the stream
  doc.end();




});

export default route;

import { Router } from "express";
import path from "path"
import multer from "multer"
import User from "../mongodb/userSchema.mjs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const route = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.diskStorage({
    destination: './uploads/',  
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, 
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images Only!');
      }
    }
  }).single('image');

  route.post("/uploadImage",async(req,res)=>{
    console.log("sent")
    upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ msg: err });
        }
        if (!req.file) {
          return res.status(400).json({ msg: 'No file uploaded' });
        }
    
        try {
          const user = await User.findOne({email:req.cookies.loginCookie.email});
          if (!user) {
            return res.status(404).json({ msg: 'User not found' });
          }
    
          user.imageURL = `uploads/${req.file.filename}`;
          await user.save();

          const imageURL="http://localhost:3000/"+`uploads/${req.file.filename}`
    
          res.status(200).json({ msg: 'Image uploaded successfully', imageUrl: imageURL });
        } catch (err) {
          res.status(500).json({ msg: 'Server error' });
        }
      })
  })



export default route;



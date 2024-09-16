import { Router } from "express";
import userValidationSchema from "./userValidation.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../mongodb/userSchema.mjs";

const route = Router();

route.post(
  "/register",
  checkSchema(userValidationSchema),
  async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty())
      return response.status(400).json({ msg: result.array()[0].msg });

    const data = matchedData(request);
    bcrypt.hash(request.body.password, 10,async (err, hash) => {
      if (err) console.log(err);
      else {
        await User.create({
          username: request.body.username,
          email: request.body.email,
          password: hash,
        })
          .then((users) => response.json(users))
          .catch((err) => response.json(err));
      }
    });
  }
);

export default route;

import express from "express";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import { signInValidationSchema } from "../middlewares/signInSchema.middleware.js";
import { userValidationSchema } from "../middlewares/userSchema.middleware.js";

const authRouter = express.Router();

authRouter.post("/sign-up", userValidationSchema, signUp);

authRouter.post("/sign-in", signInValidationSchema, signIn);

authRouter.get("/users",  async (req, res)=>{    

    try{
      const products = await db.collection("products").find({}).toArray()
      
      res.send(products)
  
    }catch (error){
      res.sendStatus(error)
    }    
  })

export { authRouter };

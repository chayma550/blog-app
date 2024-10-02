import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { addCategory,  getCategorys } from "../controllers/Category.js";
const router = express.Router();

//add category
router.post("/",verifyToken,addCategory)



//get category
router.get("/",verifyToken,getCategorys)



export default router

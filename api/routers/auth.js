import express from "express";
import { login, logout, register } from "../controllers/Auth.js";
const router = express.Router();
const bodyParser=express.urlencoded({extended:true});

//REGISTER
router.post("/register",register,bodyParser)

//login

router.post("/login",login,bodyParser)

//logout
router.post("/logout", logout)

export default router






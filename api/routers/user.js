import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/User.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

//update

router.put("/:id",verifyToken,updateUser)

//delete
router.delete("/:id",verifyToken,deleteUser)


//get user
router.get("/:id",verifyToken,getUser)

//get all users
router.get("/",verifyToken,getUsers)

export default router

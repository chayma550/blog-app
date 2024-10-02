import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/Post.js";
const router = express.Router();

//add post
router.post("/",verifyToken,addPost)

//update

router.put("/:id",verifyToken,updatePost)

//delete
router.delete("/:id",verifyToken,deletePost)


//get post
router.get("/:id",verifyToken,getPost)

//get posts
router.get("/",verifyToken,getPosts)

export default router

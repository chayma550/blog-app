import User from "../models/User.js"
import CryptoJS from "crypto-js";

export const updateUser = async (req, res, next) => {
    if (req.body.password) {
      try {
        const encryptedPassword = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString();
        req.body.password = encryptedPassword;
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }; 


export const deleteUser=async(req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("account deleted!!")

    }catch(err){
        res.status(500).json(err)
        next(err)


    }
}


export const getUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id)
        res.status(200).json(user)

    }catch(err){
        next(err)
    }
}


export const getUsers=async(req,res,next)=>{
    try{
        const users=await User.find()
        res.status(200).json(users)

    }catch(err){
        next(err)
    }
}
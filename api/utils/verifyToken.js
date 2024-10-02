import Jwt from "jsonwebtoken"
import createError from "../utils/createError.js"

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.accesstoken;
    if(!token){
        return  next(createError(401,"You are not authenticated!"));
    }
    Jwt.verify(token,process.env.JWT_SEC,(err,payload)=>{
        if(err) 
        return  next(createError(403,"token is not valid!"));
        req.userId=payload.id;
        next();
    })
}


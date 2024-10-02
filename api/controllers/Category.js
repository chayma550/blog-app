import Category from "../models/Category.js"

export const addCategory=async(req,res,next)=>{
    const newCat=new Category(req.body)
try{
    const savedCat=await newCat.save()
    res.status(201).json(savedCat)
}catch(err){
    next(err)
}
}



export const getCategorys=async(req,res,next)=>{
    try{
        const categorys=await Category.find()
        res.status(200).json(categorys)

    }catch(err){
        next(err)
    }
}
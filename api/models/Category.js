import mongoose from "mongoose";

let CategorySchema=mongoose.Schema({
name:{
    type:String,
    required:true,
    unique:true
},

  
},
{timestamps:true}
)
export default  mongoose.model("Category",CategorySchema);
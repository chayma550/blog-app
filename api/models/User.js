import mongoose from "mongoose";

let userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,  

      },
      email:{
        type:String,
        unique:true,
        required:true,
        unique: true, 

      },
      password:{
        type:String,
        required:true,
      },
      profilePic:{
        type:String,
        default:"",
      },
    
  
},
{timestamps:true}
)
export default mongoose.model("User",userSchema);
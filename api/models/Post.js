import mongoose from "mongoose";

let PostSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:false,
        
    },
    username:{
        type:String,
        required:true,
        unique: true, 

        
    },
   
    categories:{
        type: [String],        
        required:false,
    }
  
},
{timestamps:true}
)
export default mongoose.model("Post",PostSchema);
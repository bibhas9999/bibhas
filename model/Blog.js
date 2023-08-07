import mongoose, { Schema } from "mongoose";

const Schena=mongoose.Schema;

const blogSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    desription:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true,
    },
    
});
export default mongoose.model("Blog",blogSchema);
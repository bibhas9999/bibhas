import mongoose from "mongoose";
import Blog from "../model/Blog";
export const getAllBlogs=async(req,res,next)=>{
    let blogs;
    try{
        blogs=await Blog.find();
    }catch(err){
        return console.log(err)
    }
    if (!blogs){
        return res.status(404).json({message:"NO Blogs Found"})
    }
    return res.status(200).json({blogs})
 }

 export const addBlog=async(req,res,next)=>{
    const{title,description,image,user}=req.body;

    let existingUser;
    try{
        existingUser=await User.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message:"unable to find by this id"})
    }

    const blog=new Blog({
        title,
        desription,
        image,
        user,
    });
    try{
        const session=await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blog.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    }catch(err){
     console.log(err);
     return res.status(500).json({message:err})
    }
    return res.status(200).json({blog})
 };
 export const updateBlog=async(req,res,next)=>{
    const{title,description}=req.body;
    const blogId=req.params.id;
    let blog;
    try{
        blog=await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        })
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"unable to update the blog"})
    }
    return res.status(200).json({blog});
    
 };

 export const getById =async(req,res,next)=>{
    const id =req.params.id;
    let blog;
    try{
        blog= await Blog.findById(id);
    }catch(err){
       return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"no blog found"})
    }
    return res.status(200).json({blog})

 }
 export const deleteBlog=async(req,res,next)=>{
    const id=req.params.id;

    let blog;
    try{
        blog=await Blog.findOneAndRemove(id).populate('user' );
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(err){
        console.log(err);
    }
    if(!blog){
        return res.status(400).json({message:"unable to DElet"});
    }
    return res.status(200).json({message:"sucessfully Delete"});
 };

 export const getByUserId=async(req,res,next)=>{
    const userId=req.params.id;
    let userBlogs;
    try{
        userBlogs=await user.findById(userId).populate('blog');
    }
    catch(err){
        return console.log(err)
    }
    if(!userBlogs){
        return res.status(404).josn({message:'no blog Found'})
    }
    return res.status(200).json({blog:userBlogs})
 }

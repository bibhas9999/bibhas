import User from "../model/user";
import bcrypt from 'bcrypt';

 export const getAllUser=async(req,res,next)=>{
    let users;
    try{
        users= await User.find();
    }catch(err){
        console.log(err);
    } 
    if(!users){
        return res.status(404).json({message:'no user found'});
    }
    return res.status(200).json({users});
};
export const signup =async(req,res,next)=>{
    const{name,email,password}=req.body;

    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
       return console.log(err);
    }
    if (existingUser){
        return res.status(400).json({massage:"user already exists!login instead"});
    }
    const user=new User({
        name,
        email,
        password: hashedPassword,
        blogs:[],
    });
    const hashedPassword=bcrypt.hashSync(password);
    
    try{
        await user.save();
    }catch(err){
      return  console.log(err);
    }
    return res.status(201).json({user});

}

export const login=async(req,res,next)=>{
    const{email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
       return console.log(err);
    }
    if (!existingUser){
        return res.status(404)
        .json({massage:"colud find user By this email"});
    }

    const ispasswordcorrect=bcrypt.compareSync(password,existingUser.password);
    if(!ispasswordcorrect){
        return res.status(400).json({message:'incorrect password'})
    }
    return res.status(200).json({message:"login successfull"})
}
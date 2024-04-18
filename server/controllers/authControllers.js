const userModels = require("../models/user")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


//  REGISTER API  
const register = async (req,res)=>{
  try {
    const {email,username,password} = req.body
    
    // checking if the user already present or not 
    const existingUser = await userModels.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"user already exits"})
    }
    const hashPassword = await bcryptjs.hash(password,10)
    const newUser = new userModels({email,username,password:hashPassword})
    await newUser.save()
    res.status(200).json({success:true,message:"Registerd Succesfully",user:newUser})
  } catch (error) {
    console.log(error);
  }

}
const login = async(req,res)=>{
   try {
    const {email,password} = req.body
    const IsUser = await userModels.findOne({email})
    if(!IsUser){
    return res.status(404).json({success:false,message:"user not found"})
    }

    const IsValidPassword = await bcryptjs.compare(password,IsUser.password)
    if(!IsValidPassword){
        return res.status(404).json({success:false,message:"invalid password"})
    }
    
0
    const token = jwt.sign({userId:IsUser._id,email:IsUser.email},process.env.SECRET_KEY,{expiresIn:"3d"})
    res.status(200).json({success:true,message:"Login Successful",data:{IsUser,token}})
   } catch (error) {
    console.log(error);
   }
}

module.exports={register,login}
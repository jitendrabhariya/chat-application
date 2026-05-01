 import bcrypt from "bcryptjs"
 import User from "../models/user.model.js"
 import genToken from "../config/token.js"
 export const signUp=async (req,res)=>{
    try{
    const {userName,email,password}=req.body
    const checkUser=await User.findOne( {userName})
    if( checkUser){
        return res.status(400).json( {message:"UserName already exist"})
    }
    const checkEmail=await User.findOne({email})
    if( checkEmail){
        return res.status(400).json({message:"email already exist"})
    }
    if( password.length<6){
        return res.status(400).json({message:" password must be atleast 6 characters"})
    }
     const hashedPassword=await bcrypt.hash(password,10)
     const user=await User.create({
        userName,email,password:hashedPassword
     })
     const token =await genToken(user._id)
     res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"None",
        secure:true
     })
     return res.status(201).json(user)
    }catch(error){

        res.status(500).json( { message:"signUp error"})
    }
  }

  export const logIn=async ( req,res)=>{
    try{
    const {email,password}=req.body
   
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({message:"user does not exist"})
    }
    const ifMatch = await bcrypt.compare(password,user.password)
    if(!ifMatch){
        return res.status(400).json({ message:"incorrect password"})
    }
     const token =await genToken( User._id)
     res.cookie( "token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"None",
        secure:true
     })
     return res.status(200).json(user)
    }catch(error){
      res.status(500).json( { message:"login error"})
    }
  }

  export const logOut = async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"logout successfully"})
        
    } catch (error) {
        res.status(500).json( { message:"logOut error"})
        
    }

  }

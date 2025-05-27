
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";
const registration=async(req,res)=>{
    const{name,email,password,otp}=req.body
    if(!name || !email  || !password ){
        return res.status(404).json({msg:"all fields are required"})
    }
    try{
        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({msg:"user already exist"})
        }
        const hash=await argon2.hash(password)

        const newUser=new User({
            name,
            email,
            password:hash
        })

        const data=await newUser.save()
        res.status(201).json({msg:"registration sucessfully"})
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:"server error in registration"})
    }
}

 const login=async(req,res)=>{
    console.log("2")
    // console.log("login")
    const{email,password}=req.body
    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" });
    }
//  console.log(email,password)
    try{
     
        const dbExist=await User.findOne({email})
        if(!dbExist){
            return res.status(404).json({msg:"User not exist"})
        }
        const hashed=await argon2.verify(dbExist.password,password)
        if(hashed){
        const token=jwt.sign({ id: dbExist._id,username: dbExist.username, email: dbExist.email},process.env.SECRET_KEY,{expiresIn:"2day"})
        // console.log(token)

        
        return res.status(200).json({token:token})
        }
        return res.status(401).json({msg:"Invalid credentials"})

    }catch(err){
        console.log(err);
        res.status(500).json({msg:"server error in login"})
    }
}


export {registration,login};
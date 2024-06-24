const mongoose = require('mongoose');
const User = require('../models/userModel');
const camunda=require('./camunda')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const saltRounds = 10;
const passkey='#5ftwfd&vsgvc(0*&$%vgygy';

async function registerUser(req, res){
    const password=await bcrypt.hash(req.body.password, saltRounds);
    const { rollNum,names,course,dept,email,userType,guide } = req.body;
    try {
        const newUser = new User({
            rollNum,
            names,
            course,
            dept,
            email,
            userType,
            guide,
            password
        });
      const isExist =await User.findOne({"rollNum":rollNum});
      if(isExist){
        return res.status(201).json({ message: "User Already Exist!!" }); 
      }
        else{
            const response =await await newUser.save();

            if(response){
                camunda.createUser(req.body);
                res.status(200).json({message: "User registered successfully" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
}

async function login(req, res){
    const {rollNum,password}=req.body;
    try{
    const user =await User.findOne({"rollNum":rollNum});
    if(!user)res.send("Roll Number is Not Correct!!");
    const result =await bcrypt.compare(password, user.password);
    if(result){
        const token=jwt.sign({'rollNum':user.rollNum,'id':user._id},passkey);
        res.cookie('jwt',token,{
            httpOnly:true,
            maxAge:24*60*1000
        });
        res.status(200).json({ message: "User Login successfully",
       'token':token,"userDetails":user});
    }
    else res.status(301).json({ message: "User Login Unsuccessfully" });
    }catch(error){
       console.log("getting Login Error");
    }
}
async function getUser(req,res){
    const token = req.headers.authorization.split(" ")[1];
   const payload=jwt.decode(token);
   console.log(payload.id,'Hii how are you')
   const data=await User.findById(payload.id);
   const details={
    'rollNum':data.rollNum,
    'name':data.names,
    'course':data.course,
    'dept':data.dept,
    'guide':data.guide
   }
   return res.status(200).json(details)
}

module.exports = {
    registerUser,
    login,
    getUser
  };



const mongoose = require('mongoose');
const User = require('../models/userModel');
const TaskIdGen = require('../models/taskIdModel');
const History = require('../models/historyModel');
const email = require('../models/EmailService');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const saltRounds = 10;
const passkey='#5ftwfd&vsgvc(0*&$%vgygy';
const axios = require('axios');
const fetch = require('node-fetch');
const apiUrl="http://localhost:8080/engine-rest"
username="demo";
password="demo";

const authString = `${username}:${password}`;
const encodedAuthString = Buffer.from(authString).toString('base64');
const headers = {
    'Authorization': `Basic ${encodedAuthString}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };


async function postLeave(req,res){
  try{  
    const token = req.headers.authorization.split(" ")[1];
    const payload=jwt.decode(token);
    
    const process_id=req.body.dept+Math.floor(Math.random()*1000);
  const data=await fetch(apiUrl+`/process-definition/key/leave_application/start`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "variables": {
          "name": {"value":req.body.name,"type":"String"},
          "roll_num":{"value":req.body.rollNum,"type":"String"},
          "department":{"value":req.body.dept,"type":"String"},
          "course":{"value":req.body.course,"type":"String"},
          "rem_leave":{"value":req.body.remLeave,"type":"Integer"},
          "assignee":{"value":req.body.assignee,"type":"String"},
          "from":{"value":req.body.fromDate,"type":"String"},
          "to":{"value":req.body.toDate,"type":"String"},
          "reason":{"value":req.body.comment,"type":"String"},
          "process_id": {"value":process_id,"type":"String"},
        },
        "businessKey": process_id
      }) 
    })
    if(!data.ok) throw new Error(`HTTP error! status: ${response.status}`);
    else{
      process_name='Leave Application';
      user_id=payload.rollNum;
       const history =new TaskIdGen({
        process_name,
        process_id,
        user_id,
        progress:"InProgress"
       })
       const response =await history.save();
       if(response){
        email.sentMail(req.body.name);
        return res.status(201).json({"message":data});
      }else{
        return res.status(301).json({"message":data});
      }
     
     
    }
  }catch(err){
      res.status(500).json({'error':'Something Went Wrong!!'})
    }
}


  async function getAlltask(req,res){
    
    const token = req.headers.authorization.split(" ")[1];
    const payload=jwt.decode(token);
  try{
    const user_api= await fetch(apiUrl+`/task?assignee=${payload.rollNum}`, {
      method: 'GET',
      headers: headers,
    })
    if(!user_api.ok)return user_api.status(401);
    const user_data=await user_api.json();
    
    const group_api= await fetch(apiUrl+`/task?candidateUser=${payload.rollNum}`, {
      method: 'GET',
      headers: headers,
    })
    if(!group_api.ok)return group_api.status(401);
    const group_data=await group_api.json();
    const combined_data = [...user_data, ...group_data];
    let taskDetails = combined_data.map(obj => {
      return { id: obj.id, name: obj.name, created: obj.created };
    });
    return res.status(200).json({'message':taskDetails})
  }catch(err){
    res.status(500).json({'error':'Something Went Wrong!!'})
  }
}

async function gettask(req,res){
  try{ 
    console.log(req.body._id)
  const data=await fetch(`http://localhost:8080/engine-rest/task/${req.body._id}/variables/`, {
      method: 'GET',
      headers: headers,
    })
    //if(!taskDetails.ok) throw new Error(`HTTP error! status: ${taskDetails.status}`);
    const taskDetails=await data.json();
    console.log(taskDetails);
    return res.send(taskDetails)
  }catch(err){
      res.status(500).json({'error':err})
    }
}

async function completeTask(req,res){
   let body;
  try{  
    console.log(req.body.process_id,req.body.camunda_data.variables.hod_approval);
    body=req.body.camunda_data;
    if(req.body.taskName=='Approval For DGPRC')      {
       
    }else if(req.body.taskName=='Approval For Guide'){

    } else if(req.body.taskName=='Approval For HOD') {
        if(req.body.camunda_data.variables.hod_approval.value=="hod_app"){
          const task=await TaskIdGen.findOne({"process_id":req.body.process_id})
          if(task){
            console.log(task._id);
           const res=await TaskIdGen.findByIdAndUpdate(task._id, { progress:'Completed' });
           if(!res)console.log("Error aaya hai");
          }else{
             console.log("Bada Error Aaya hai");
          }
        }
    }else if(req.body.taskName=='Applicant Approval'){
      
    }
  const data=await fetch(apiUrl+`/task/${req.body.taskID}/complete`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body) 
    })
    if(!data.ok) res.status(301).json({"message":"Leave Applied UnSuccessfully!!"})
    return res.status(201).json({"message":data})
  }catch(err){
      res.status(500).json({'error':'Something Went Wrong!!'})
    }
}

async function createUser(body){
  try{ 
      const data=await fetch(`http://localhost:8080/engine-rest/user/create`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "profile": {
          "id":body.rollNum,
          "firstName":body.names,
          "lastName":body.names,
          "email":body.email
        },
        "credentials":{
          "password":body.password
        }
      }) 
    })
    if(!data.ok) throw new Error(`HTTP error! status: ${data.status}`);
    return;
  }catch(err){
    throw new Error(`HTTP error! status: ${err}`);
    }
}

module.exports = {
  completeTask,  
  postLeave,
  getAlltask,
  gettask,
  createUser
  };

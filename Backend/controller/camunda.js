const mongoose = require('mongoose');
const User = require('../models/userModel');
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
          "reason":{"value":req.body.comment,"type":"String"}
        }
      }) 
    })
    if(!data.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return res.status(201).json({"message":"Leave Applied Successfully!!"})
  }catch(err){
      res.status(500).json({'error':'Something Went Wrong!!'})
    }
}


  async function getAlltask(req,res){
    
    const token = req.headers.authorization.split(" ")[1];
    const payload=jwt.decode(token);
  try{
    const api= await fetch(apiUrl+`/task?assignee=demo`, {
      method: 'GET',
      headers: headers,
    })
    if(!api.ok)return api.status(401);
    const data=await api.json();
    console.log(data)
    let taskDetails = data.map(obj => {
      return { id: obj.id,name: obj.name,created:obj.created};
     });
    return res.status(200).json({'message':taskDetails})
  }catch(err){
    res.status(500).json({'error':'Something Went Wrong!!'})
  }
}


module.exports = {
    postLeave,
    getAlltask
  };

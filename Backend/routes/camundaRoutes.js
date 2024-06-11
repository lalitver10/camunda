var express = require('express');
const app = express.Router();
const {postLeave,getAlltask,gettask,completeTask} = require("../controller/camunda");
  app.route('/postLeave')
  .post(postLeave)
  app.route('/getAlltask')
  .get(getAlltask)
  app.route('/gettask')
  .post(gettask)
  app.route('/completeTask')
  .post(completeTask)
  
module.exports = app;
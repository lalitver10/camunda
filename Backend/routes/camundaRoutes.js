var express = require('express');
const app = express.Router();
const {postLeave,getAlltask} = require("../controller/camunda");
  app.route('/postLeave')
  .post(postLeave)
  app.route('/getAlltask')
  .get(getAlltask)
  
module.exports = app;
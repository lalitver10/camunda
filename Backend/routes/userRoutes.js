var express = require('express');
const app = express.Router();
const {registerUser,login,getUser} = require("../controller/user");
 app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url,req.body);
  next();
  });
  app.route('/login')
  .post(login)
  app.route('/register')
  .post(registerUser);
  app.route('/getUser')
  .get(getUser);
  app.route('/setUser')
  .put();
module.exports = app;
const express = require('express')
const app = express();
const {dbConnection}=require('./Config/connection')
var userroutes = require('./routes/userRoutes');
var camundaRoutes = require('./routes/camundaRoutes');
const cors=require('cors')
const port=9002;
const url="mongodb://localhost:27017/leaveApplication";

dbConnection(url).then(()=> 
 console.log("MongoDB Connected!!")
);

app.listen(port,()=>{
    console.log(`Server startted at port number: ${port}`);
});
app.use(express.json());
app.use(cors());
app.use('/api/user',userroutes);
app.use('/api/camunda',camundaRoutes);
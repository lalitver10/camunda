const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
async function dbConnection(url){
return mongoose.connect(url);
}
module.exports={
    dbConnection
};
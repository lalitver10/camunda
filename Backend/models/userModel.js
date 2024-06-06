var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    rollNum: {
        type: String,
        required: true
    },
    names: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    } ,
    userType: {
        type: String,
        required: true
    },
    guide: {
        type: String
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('user', userSchema);

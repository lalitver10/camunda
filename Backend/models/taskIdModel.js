var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskidSchema = new Schema({

    process_name: {
        type: String
    },
    task_id: {
        type: Number
    },
    user_id: {
        type: String
    },

});

module.exports = mongoose.model('processids', taskidSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskidSchema = new Schema({

    process_name: {
        type: String
    },
    process_id: {
        type: String
    },
    user_id: {
        type: String
    },
    progress: {
        type: String
    },

});

module.exports = mongoose.model('processids', taskidSchema);

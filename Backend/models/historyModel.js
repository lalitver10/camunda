var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({

    taskId: {
        type: String 
    },
    applicant: {
        type: String
    },
    applicant_start: {
        type: String 
    },
    applicant_status: {
        type: String 
    },
    guide_assignee: {
        type: String  
    } ,
    guide_task_start: {
        type: String 
    },
    guide_task_end: {
        type: String  
    },
    guide_status: {
        type: String 
    },
    dgpc_assignee: {
        type: String 
    },
    dgpc_task_start: {
        type: String  
    },
    dgpc_task_end: {
        type: String  
    },
    dgpc_status: {
        type: String 
    },
    hod_assignee: {
        type: String 
    },
    hod_task_start: {
        type: String
    },
    hod_task_end: {
        type: String 
    },
    hod_status: {
        type: String   
    }
});

module.exports = mongoose.model('history', historySchema);

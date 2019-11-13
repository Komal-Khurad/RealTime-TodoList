const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
    taskId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    taskName: {
        type: String,
        default: ''
    },
    taskStatus: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Task', taskSchema);
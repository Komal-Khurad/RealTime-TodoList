const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listSchema = new Schema({
    listId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    listName: {
        type: String,
        default: '',
        required: true
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

mongoose.model('List', listSchema);
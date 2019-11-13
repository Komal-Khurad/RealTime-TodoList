'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    countryCode: {
        type: Number,
        default: ''
    },
    mobileNumber: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('User', userSchema);
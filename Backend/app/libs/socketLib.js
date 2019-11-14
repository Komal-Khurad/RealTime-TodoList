/* Importing Modules*/
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const shortId = require('shortid');
const events = require('events');

/* Importing Modules*/
const logger = require('./loggerLib');
const tokenLib = require('./tokenLib');
const check = require('./checkLib');
const response = require('./responseLib');
const redisLib = require('./redisLib');
const todoModel = require('../models/todoModel');

const eventEmitter = new events.EventEmitter();
let setServer = (server) => {
    let io = socketIo.listen(server);
    let myIo = io.of('');

    myIo.on('connection', (socket) => {
        console.log('on connection emitting verify user');
        socket.emit('verifyUser', '');

        //
    });
}

module.exports = {
    setServer: setServer
}


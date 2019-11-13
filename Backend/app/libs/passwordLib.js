const bcrypt = require('bcrypt');
const saltRounds = 10;

/* Custom Library */
let logger = require('../libs/loggerLib');

let hashpassword = (myPlainTextPassword) => {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(myPlainTextPassword, salt);
    return hash;
}

let comparePassword = (oldPassword, hashpassword, cb) => {
    bcrypt.compare(oldPassword, hashpassword, (err, res) => {
        if (err) {
            logger.error(err.message, 'Comparison Error', 5);
            cb(err, null);
        } else {
            cb(null, res);
        }
    });
}

module.exports = {
    hashpassword: hashpassword,
    comparePassword: comparePassword
}
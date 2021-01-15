const jwt = require('jsonwebtoken');
const config = require('config');
 
module.exports = function (req, res, next) {
    req.logged = true;
    try {
        const token = req.header('Cookie');
        if (!token) {
            req.logged = false;
        }
    }

    catch (ex1) {
        req.logged = false;
        console.log(ex1);
    }
 
    try {
        req.logged = true;
        next();
    }
    catch (ex2) {
        console.log(ex2);
        req.logged = false;
    }
}
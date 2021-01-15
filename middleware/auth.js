const jwt = require('jsonwebtoken');
const config = require('config');
 
module.exports = function (req, res, next) {
    try {
        const token = req.header('Cookie');
        if (!token) {
            return res.redirect('/login/');
        }
        else {
            var my_jwt = token.split(/=(.+)/)[1];
        }
    }

    catch (ex1) {
        // will print error when trying to access endpoint with no jwt verified
        console.log(ex1);
    }
 
    try {
        const decoded = jwt.verify(my_jwt, config.get('privateKey'));
        req.user = decoded;
        next();
    }
    catch (ex2) {
        console.log(ex2);
        return res.redirect('/login/');
    }
}
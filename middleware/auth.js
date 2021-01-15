const jwt = require('jsonwebtoken');
const config = require('config');
 
module.exports = function (req, res, next) {
    console.log(req);
    req.logged = true;
    try {
        const token = req.header('Cookie');
        if (!token) {
            req.logged = false;
            if (req.originalUrl == '/login/') {
                next();
            }
            if (req.originalUrl == '/') {
                next();
            }
            return res.redirect('/login/');
        }
        else {
            var my_jwt = token.split(/=(.+)/)[1];
        }
    }

    catch (ex1) {
        // will print error when trying to access endpoint with no jwt verified
        req.logged = false;
        console.log(ex1);
    }
 
    try {
        const decoded = jwt.verify(my_jwt, config.get('privateKey'));
        req.user = decoded;
        console.log(decoded);
        next();
    }
    catch (ex2) {
        console.log(ex2);
        req.logged = false;
        return res.redirect('/login/');
    }
}
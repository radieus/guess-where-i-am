const jwt = require('jsonwebtoken');
 
module.exports = function (req, res, next) {
    req.logged = true;
    try {
        const token = req.header('Cookie');
        if (!token) {
            req.logged = false;
            if (req.originalUrl == '/login/') {
                return next();
            }
            else if (req.originalUrl == '/') {
                return next();
            }
            else if (req.originalUrl == '/registration/') {
                return next();
            }
            else if (req.originalUrl == '/auth/reset/') {
                return next();
            }
            else if (req.originalUrl == '/auth/forgotpassword/') {
                return next();
            }
        }
        else {
            var my_jwt = token.split(/=(.+)/)[1];
        }
    }

    catch (ex1) {
        // will print error when trying to access endpoint with no jwt verified
        req.logged = false;
        // console.log(ex1);
    }
 
    try {
        const decoded = jwt.verify(my_jwt, process.env.PRIVATE_KEY);
        req.user = decoded;
        console.log(decoded);
        next();
    }
    catch (ex2) {
        // console.log(ex2);
        req.logged = false;
        res.redirect('/login/');
    }
}
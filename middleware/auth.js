const jwt = require('jsonwebtoken');
const config = require('config');
 
module.exports = function (req, res, next) {
    const token = req.header('Cookie').split(/=(.+)/)[1];
    console.log(token);
    if (!token) {
        return res.redirect('/login/');
    }
 
    try {
        const decoded = jwt.verify(token, config.get('privateKey'));
        req.user = decoded;
        next();
    }
    catch (ex) {
        console.log(ex);
        return res.redirect('/login/');
    }
}
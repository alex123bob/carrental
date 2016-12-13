'use strict';

let auth = function (req, res, next){
    let session = req.session;
    if (session.name && session.pwd) {
        next();
    }
    else {
        res.redirect(301, '/login');
    }
}

module.exports = auth;
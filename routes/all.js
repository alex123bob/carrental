'use strict';

let all = (req, res, next) => {
    let session = req.session;
    if (session.name && session.pwd) {
        next();
    }
    else {
        if (req.path == '/login') {
            res.render('login', {
                title: '登录'
            });
        }
        else if (req.path == '/join') {
            next();
        }
        else {
            res.redirect(301, '/login');
        }
    }
};

module.exports = all;
'use strict';

const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool'),
    dateFormat = require('dateformat'),
    common = require('../libs/common'),
    user = require('../libs/user');

router.get('/', function (req, res){
    let
        params = req.params,
        session = req.session,
        sql = "select a.*, d.name as dname, d.id as did, u.name as uname, u.realname as renterRealname, u.level from \
                 application a left join depa d on a.depa = d.id left join user u on a.renter = u.name where a.isDeleted = 'false' ",
        orderBy = " order by a.createTime DESC ",
        userObj = {
            depa: session.depaId,
            level: session.level
        };
    if (user.isAdmin(userObj) || user.isDirector(userObj)){
    }
    else {
        sql += " and a.renter = '" + session.name + "' ";
    }
    sql += orderBy;

    conn.getConnection(function (err, connection) {
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err.stack);
                return;
            }
            rows.forEach(function (row){
                let formatStr = 'yyyy-mm-dd HH:MM:ss';
                row.createTime = dateFormat(row.createTime, formatStr);
                row.startTime = (row.startTime.constructor === Date ? dateFormat(row.startTime, formatStr) : '');
                row.endTime = (row.endTime.constructor === Date ? dateFormat(row.endTime, formatStr) : '');
                row.scopeRealname = (row.scope === 0 ? '市内' : '市外');
                row.statusRealname = common.statusRenderer(row.status);
                row.needCheck = () => {
                    let flag;
                    if (user.isAdmin(userObj)) {
                        flag = row.status === 0;
                    }
                    else if (user.isDirector(userObj)) {
                        flag = row.status === 1;
                    }
                    else {
                        flag = false;
                    }
                    return flag;
                }
            });
            res.render('history', {
                title: '租车纪录',
                recs: rows ,
                session: session
            });
            connection.release();
        });
    });
});

module.exports = router;
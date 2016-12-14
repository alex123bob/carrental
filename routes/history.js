'use strict';

const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool'),
    dateFormat = require('dateformat');

router.get('/', function (req, res){
    let
        params = req.params,
        session = req.session,
        sql = "select a.*, d.name as dname, d.id as did, u.name as uname, u.realname as renterRealname, u.level from \
                 application a left join depa d on a.depa = d.id left join user u on a.renter = u.name where a.renter = '" 
                 + session.name + "' order by a.createTime DESC ";

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
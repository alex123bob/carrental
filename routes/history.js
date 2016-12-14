'use strict';

const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool'),
    dateFormat = require('dateformat');

router.get('/', function (req, res){
    let
        params = req.params,
        sql = "select * from application ",
        session = req.session;

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
                row.endTime = (row.startTime.constructor === Date ? dateFormat(row.endTime, formatStr) : '');
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
'use strict';

const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool'),
    dateFormat = require('dateformat');

router.get('/', function (req, res){
    let
        params = req.params,
        sql = "select * from application ";

    conn.getConnection(function (err, connection) {
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err.stack);
                return;
            }
            rows.forEach(function (row){
                let formatStr = 'yyyy-mm-dd';
                row.createTime = dateFormat(row.createTime, formatStr);
                row.startTime = dateFormat(row.startTime, formatStr);
                row.endTime = dateFormat(row.endTime, formatStr);
            });
            res.render('history', {
                title: '租车纪录',
                recs: rows 
            });
            connection.release();
        });
    });
});

module.exports = router;
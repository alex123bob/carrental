'use strict';

const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool');

router.get('/:userName', function (req, res){
    let
        params = req.params,
        sql = "select * from application where renter = '" + params.userName + "'";

    conn.getConnection(function (err, connection) {
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err.stack);
                return;
            }
            res.render('history', {
                title: '租车纪录',
                recs: rows 
            });
            connection.release();
        });
    });
});

module.exports = router;
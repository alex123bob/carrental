'use strict';

const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool'),
    common = require('../libs/common'),
    dateformat = require('dateformat'),
    Q = require('Q');

router.get('/timetable/:carId', (req, res, next) => {
    let
        params = req.params,
        deferred = Q.defer(),
        sql = "select a.*, c.name as plate, c.seats, c.remark carRemark, u.realname from application a left join car c on a.carId = c.id and a.isDeleted = 'false' and c.isDeleted = 'false' left join user u on a.renter = u.name where a.status = 2 and a.carId = " + params.carId + " order by a.startTime ASC ";
    conn.getConnection((err, connection) => {
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err.stack);
                return;
            }
            rows.map((row, index, self) => {
                row["startTime"] = dateformat(row["startTime"], 'yyyy-mm-dd HH:MM:ss');
                row["endTime"] = dateformat(row["endTime"], 'yyyy-mm-dd HH:MM:ss');
                return row;
            });
            res.status(200).json({
                status: 'successful',
                recs: rows
            });
            connection.release();
        })
    });

});

module.exports = router;
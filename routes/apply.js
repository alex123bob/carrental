'use strict';

const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool'),
    dateformat = require('dateformat');

router.get('/', function (req, res){
    let session = req.session,
        sql = "select * from depa where isDeleted  = 'false'";
    conn.getConnection((err, connection) => {
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err.stack);
                return;
            }
            res.render('apply', {
                title: '公车申请',
                workingContent: [
                    { key: 1, val: '1、侦查、办案、警卫、巡逻等执法执勤工作；'},
                    { key: 2, val: '2、执法执纪检查和调研；'},
                    { key: 3, val: '3、警务督察、警务工作明察暗访；'},
                    { key: 4, val: '4、处置涉警信访、舆情；'},
                    { key: 5, val: '5、大型活动安保、突发事件处置等工作；'},
                    { key: 6, val: '6、重要公务活动或紧急公务；'},
                    { key: 7, val: '7、运送机要文件和涉密载体，以及因伤病紧急送医；'},
                    { key: 8, val: '8、经单位主要领导批准的其他特殊情况；'}
                ],
                session: session,
                depas: rows
            });
            connection.release();
        });
    });
});

router.post('/', function (req, res){
    let sql = " insert into application",
        params = req.body,
        fields = [],
        values = [];
    
    for (var pro in params) {
        fields.push(pro);
        values.push(params[pro]);
    }
    fields = fields.map(function (name){
        return '`' + name + '`';
    });
    values = values.map(function (val){
        return "'" + val + "'";
    });
    fields = fields.join(', ');
    values = values.join(', ');
    sql += "(" + fields + ") values (" + values + ")";

    conn.getConnection((err, connection) => {
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err.stack);
                return;
            }
            else {
                res.status(200).json({
                    status: 'successful',
                    errMsg: ''
                });
            }
            connection.release();
        });
    });
});

module.exports = router;
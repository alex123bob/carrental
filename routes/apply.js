'use strict';

const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool'),
    common = require('../libs/common'),
    dateformat = require('dateformat'),
    workingContent = [
        { key: 1, val: '1、侦查、办案、警卫、巡逻等执法执勤工作；' },
        { key: 2, val: '2、执法执纪检查和调研；' },
        { key: 3, val: '3、警务督察、警务工作明察暗访；' },
        { key: 4, val: '4、处置涉警信访、舆情；' },
        { key: 5, val: '5、大型活动安保、突发事件处置等工作；' },
        { key: 6, val: '6、重要公务活动或紧急公务；' },
        { key: 7, val: '7、运送机要文件和涉密载体，以及因伤病紧急送医；' },
        { key: 8, val: '8、经单位主要领导批准的其他特殊情况；' }
    ],
    Q = require('Q');

router.get('/', (req, res) => {
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
                mode: 'apply', // apply, view, check
                workingContent: workingContent,
                session: session,
                depas: rows
            });
            connection.release();
        });
    });
});

router.get('/view/:applicationId', (req, res, next) => {
    let 
        session = req.session,
        params = req.params,
        deferred = Q.defer(),
        sql = "select a.*, d.name as dname from application a \
                 left join depa d on a.depa = d.id where a.isDeleted = 'false' \
                 and a.id = '" + params.applicationId + "'";
    conn.getConnection((err, connection) => {
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err.stack);
            }
            var application = rows[0];
            application.startTime = dateformat(application.startTime, 'yyyy-mm-dd HH:MM:ss');
            application.endTime = dateformat(application.endTime, 'yyyy-mm-dd HH:MM:ss');
            deferred.resolve(application);
        });
    });

    deferred.promise.then((application) => {
        let sql = "select a.*, u.realname as checkerRealname from application_records a left join user u on a.checker = u.name where a.applicationId = '?' and a.isDeleted = 'false' ";
        sql = sql.replace(/\?/, application.id);
        conn.getConnection((err, connection) => {
            conn.query(sql, (err, rows, fields) => {
                if (err) {
                    console.log(err.stack);
                }
                rows = rows.map(function (obj, index, self){
                    obj.originalStatusRealname = common.statusRenderer(obj.originalStatus);
                    obj.newStatusRealname = common.statusRenderer(obj.newStatus);
                    obj.createTime = dateformat(obj.createTime, 'yyyy-mm-dd HH:MM:ss');
                    return obj;
                });
                res.render('apply', {
                    title: '申请详情',
                    mode: 'view', // apply, view, check
                    workingContent: workingContent,
                    session: session,
                    application: application,
                    application_recs: rows
                })
            });
        })
    })
    .catch(next);
});

router.post('/', (req, res) => {
    let sql = " insert into application",
        params = req.body,
        fields = [],
        values = [];

    for (var pro in params) {
        fields.push(pro);
        values.push(params[pro]);
    }
    fields = fields.map((name) => {
        return '`' + name + '`';
    });
    values = values.map((val) => {
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
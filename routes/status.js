'use strict';

const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool'),
    user = require('../libs/user'),
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

/* GET home page. */
router.get('/', (req, res, next) => {
  let session = req.session;
  res.render('status', { 
    title: '状态',
    session: session
  });
});

router.get('/:applicationId', (req, res, next) => {
  let
      session = req.session,
      params = req.params,
      sql = "select a.*, d.name as dname from application a \
              left join depa d on a.depa = d.id where a.isDeleted = 'false' \
              and a.id = '" + params.applicationId + "'";
  conn.getConnection((err, connection) => {
      conn.query(sql, (err, rows, fields) => {
          if (err) {
              console.log(err.stack);
              return;
          }
          let application = rows[0];
          application.startTime = dateformat(application.startTime, 'yyyy-mm-dd HH:MM:ss');
          application.endTime = dateformat(application.endTime, 'yyyy-mm-dd HH:MM:ss');
          res.render('apply', {
              title: '申请审核',
              mode: 'check', // apply, view, check
              workingContent: workingContent,
              session: session,
              application: rows[0]
          });
          connection.release();
      });
  });
});

router.post('/check', (req, res, next) => {
    let
        session = req.session,
        params = req.body,
        deferred = Q.defer(),
        sql = "select status from application where id = '" + params.applicationId + "'";

    conn.getConnection((err, connection) => {
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err.stack);
                return;
            }
            deferred.resolve([err, rows, fields, params]);
            connection.release();
        });
    });

    deferred.promise.then((arr) => {
        let 
            status = arr[1][0]['status'],
            params = arr[3],
            originalStatus = status,
            newStatus,
            drt = params.drt,
            checker,
            carId = params.carId,
            remark = params.remark,
            applicationId = params.applicationId,
            sql,
            replacer,
            index = 0;
        if (drt == '-1') {
            newStatus = '-1';
        }
        else {
            newStatus = eval(originalStatus + drt);
        }
        checker = session.name;
        replacer = [applicationId, checker, originalStatus, newStatus, drt, remark];
        sql = "insert into application_records(applicationId, checker, originalStatus, newStatus, drt, remark) values (?, '?', '?', '?', '?', '?'); ";
        sql = sql.replace(/\?/gi, (match, offset, str) => {
            return replacer[index++];
        });

        conn.getConnection((err, connection) => {
            conn.query(sql, (err, rows, fields) => {
                if (err) {
                    console.log(err.stack);
                    return;
                }
                if (carId) {
                    sql = "update application set status = " + newStatus + ", carId = '" + carId + "' where id = " + applicationId + "; ";
                }
                else {
                    sql = "update application set status = " + newStatus + " where id = " + applicationId + "; ";
                }
                conn.query(sql, (err, rows, fields) => {
                    if (err) {
                        console.log(err.stack);
                        return;
                    }
                    res.status(200).json({
                        status: 'successful',
                        errMsg: ''
                    });
                    connection.release();
                });
            });
        });

    });
    
});

module.exports = router;

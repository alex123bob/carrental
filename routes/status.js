'use strict';

const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool'),
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
    ];

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
          }
          var application = rows[0];
          application.startTime = dateformat(application.startTime, 'yyyy-mm-dd HH:MM:ss');
          application.endTime = dateformat(application.endTime, 'yyyy-mm-dd HH:MM:ss');
          res.render('apply', {
              title: '申请详情',
              mode: 'check', // apply, view, check
              workingContent: workingContent,
              session: session,
              application: rows[0]
          });
          connection.release();
      });
  });
});

module.exports = router;

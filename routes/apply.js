'use strict';

const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool');

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
                title: '汽车租赁',
                workingContent: [
                    '1、侦查、办案、警卫、巡逻等执法执勤工作；',
                    '2、执法执纪检查和调研；',
                    '3、警务督察、警务工作明察暗访；',
                    '4、处置涉警信访、舆情；',
                    '5、大型活动安保、突发事件处置等工作；',
                    '6、重要公务活动或紧急公务；',
                    '7、运送机要文件和涉密载体，以及因伤病紧急送医；',
                    '8、经单位主要领导批准的其他特殊情况；'
                ],
                session: session,
                depas: rows
            });
        });
    });
});

module.exports = router;
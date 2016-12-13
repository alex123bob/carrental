const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool');

router.post('/', function(req, res, next) {
  let
      body = req.body,
      session = req.session,
      sql = "select u.name as uname, u.level as level, u.pwd as pwd, u.realname as realname,\
             u.contact as contact, d.id as did, d.name as dname \
             from user u left join depa d on u.depa = d.id and u.isDeleted = 'false' where u.name = '" + body.name + "' \
             and u.pwd = '" + body.pwd + "'";

  conn.getConnection(function (err, connection) {
      conn.query(sql, (err, rows, fields) => {
          if (err) {
              console.log(err.stack);
              return;
          }
          connection.release();
          if (rows.length > 0) {
            session.name = rows[0].uname;
            session.pwd = rows[0].pwd;
            session.realname = rows[0].realname;
            session.depa = rows[0].dname;
            session.depaId = rows[0].did;
            session.contact = rows[0].contact;
            res.status(200).json({
              status: 'successful'
            });
          }
          else {
            res.status(200).json({
              status: 'failed',
              errMsg: '用户名或密码错误'
            });
          }
      });
  });
});

module.exports = router;

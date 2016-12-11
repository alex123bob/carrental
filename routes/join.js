const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool');

router.post('/', function(req, res, next) {
  let
      body = req.body,
      session = req.session,
      sql = "select * from user where name = '" + body.name + "' and pwd = '" + body.pwd + "'";

  conn.getConnection(function (err, connection) {
      conn.query(sql, (err, rows, fields) => {
          if (err) {
              console.log(err.stack);
              return;
          }
          connection.release();
          if (rows.length > 0) {
            session.name = body.name;
            session.pwd = body.pwd;
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

const
  express = require('express'),
  router = express.Router(),
  conn = require('../libs/pool'),
  common = require('../libs/common'),
  user = require('../libs/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  let
    session = req.session,
    sql = "select * from car where isDeleted = 'false'";

  conn.getConnection((error, connection) => {
    conn.query(sql, (err, rows, fields) => {
      let cars = rows;
      res.render('index', {
        title: '主页',
        session: session,
        cars: cars
      });
    });
  });
});

module.exports = router;

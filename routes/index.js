const
  express = require('express'),
  router = express.Router(),
  conn = require('../libs/pool'),
  common = require('../libs/common'),
  user = require('../libs/user'),
  dateformat = require('dateformat'),
  Q = require('Q');

/* GET home page. */
router.get('/', function (req, res, next) {
  let
    session = req.session,
    sql = "select c.*, d.name as dname from car c left join depa d on c.depaId = d.id where c.isDeleted = 'false'",
    deferred = Q.defer();

  conn.getConnection((error, connection) => {
    conn.query(sql, (err, rows, fields) => {
      let
        cars = rows;
      deferred.resolve(cars);
      connection.release();
    });
  });

  deferred.promise.then((cars) => {
    let
      deferredObj = Q.defer(),
      count = 0;
    cars.forEach((car, index, arr) => {
      let 
        sql = "select a.*, u.realname as renterRealname from application a left join user u on a.renter = u.name where a.isDeleted = 'false' and a.carId = " + car.id + " and a.status = 2";
      car.returnBtn = user.isAdmin({depa: session.depaId, level: session.level}) ? true : false;
      conn.getConnection((error, connection) => {
        conn.query(sql, (err, rows, fields) => {
          if (rows.length > 0) {
            car.statusRealname = '已使用';
            rows.forEach((row, index, self) => {
              row['createTime'] = dateformat(row['createTime'], 'yyyy-mm-dd HH:MM:ss');
              row['startTime'] = dateformat(row['startTime'], 'yyyy-mm-dd HH:MM:ss');
              row['endTime'] = dateformat(row['endTime'], 'yyyy-mm-dd HH:MM:ss');
            });
            car.application = rows;
          }
          else {
            car.returnBtn = false;
            car.statusRealname = '未使用';
          }
          // the following conditional check, we can't use index as indicator,
          // coz db connection and sql execution is asynchronous,
          // the result is unexpected.
          // we need a counter to exactly record every sql execution,
          // then trigger corresponding Promise section.
          if (++count == arr.length) {
            deferredObj.resolve(arr);
          }
          connection.release();
        });
      });
    });
    deferredObj.promise.then((cars) => {
      res.render('index', {
        title: '主页',
        session: session,
        cars: cars
      });
    })
      .catch(next);
  })
    .catch(next);

});

module.exports = router;

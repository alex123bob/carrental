const
  express = require('express'),
  router = express.Router(),
  conn = require('../libs/pool'),
  common = require('../libs/common'),
  user = require('../libs/user'),
  dateformat = require('dateformat'),
  Q = require('Q');

/* GET home page. */
router.get('/:plate?', function (req, res, next) {
  let
    session = req.session,
    plate = req.params.plate,
    sql = "select c.*, d.name as dname from car c left join depa d on c.depaId = d.id where c.isDeleted = 'false'",
    deferred = Q.defer();

  if (plate) {
    if (/^plate-.*/.test(plate)) {
      plate = plate.replace(/plate-/gi, '');
      sql += " and c.name like '%" + plate + "%' ";
    }
    else {
      next();
    }
  }

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
    if (cars.length > 0) {
      cars.forEach((car, index, arr) => {
        let
          sql = "select a.*, u.realname as renterRealname from application a left join user u on a.renter = u.name where a.isDeleted = 'false' and a.carId = " + car.id + " and a.status = 2";
        car.returnBtn = user.isAdmin({ depa: session.depaId, level: session.level }) ? true : false;
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
        let unusedCars = [];
        for (let i = 0; i < cars.length; i++) {
          if (!cars[i].application) {
            unusedCars = unusedCars.concat(cars.splice(i, 1));
            i--;
          }
        }
        cars = cars.concat(unusedCars);
        res.render('index', {
          title: '主页',
          session: session,
          cars: cars
        });
      })
        .catch(next);
    }
    else {
      res.render('index', {
        title: '主页',
        session: session,
        cars: []
      });
    }
  })
    .catch(next);

});

router.post('/returnCar', (req, res, next) => {
  let
    applicationId = req.body.applicationId,
    sql = "update `application` set status = 3 where id = " + applicationId;

  conn.getConnection((err, connection) => {
    conn.query(sql, (err, rows, fields) => {
      if (err) {
        console.log(err.stack);
        return;
      }
      connection.release();
      res.status(200).json({
        status: 'successful',
        errMsg: ''
      });
    });
  });
});

module.exports = router;

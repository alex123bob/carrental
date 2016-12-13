var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var session = req.session;
  res.render('index', { 
    title: '主页',
    session: session
  });
});

module.exports = router;

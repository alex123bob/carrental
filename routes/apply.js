'use strict';

const
    express = require('express'),
    router = express.Router(),
    conn = require('../libs/pool');

router.get('/', function (req, res){
    res.render('apply', { title: '汽车租赁' });
});

module.exports = router;
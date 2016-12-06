'use strict';

const
    express = require('express'),
    app = express(),
    logger = require('morgan');

app.use(logger('dev'));

app.get('/list/:id', function (req, res){
    res.status(200).json({carlist: 'this is the list of all available cars\n'});
});

app.listen(3000, function (){
    console.log('server is monitoring on port 3000');
});
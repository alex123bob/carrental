'use strict';

const
    mysql = require('mysql'),
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'carrental',
        connectionLimit: 10
    });

pool.on('connection', function (connection){
    console.log('connected as id ' + connection.threadId);
});

module.exports = pool;
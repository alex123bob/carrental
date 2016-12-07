'use strict';

const
    express = require('express'),
    router = express.Router();

router.get('/:userName', function (req, res){
    let
        params = req.params,
        sql = "select * from application where renter = '" + params.userName + "'";
    conn.query(sql, (err, results) => {
        if (err) {
            console.log(err.stack);
            return;
        }
        res.status(200).json(results);
    });
});

module.exports = router;
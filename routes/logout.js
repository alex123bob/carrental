'use strict';

const
    express = require('express'),
    router = express.Router();

router.post('/', function (req, res, next){
    req.session.destroy(function (){
        console.log('session has been destroyed');
        res.status(200).json({
            status: 'successful'
        });
    });
});

module.exports = router;
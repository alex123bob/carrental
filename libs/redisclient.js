'use strict';

const
    redis = require('redis'),
    redisClient = redis.createClient();

redisClient.on('connect', () => {
    redis.print('redis connected');
});

module.exports = redisClient;
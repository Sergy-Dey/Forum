"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = void 0;
const redis = require("redis");
const config_1 = require("../../../../config");
const logger_1 = require("../../../../lib/logger");
const port = config_1.authConfig.redisServerPort;
const host = config_1.authConfig.redisServerURL;
const redisConnection = config_1.isProduction
    ? redis.createClient(config_1.authConfig.redisConnectionString, {
        password: config_1.authConfig.redisPassword
    })
    : redis.createClient(Number(port), host, {
        password: config_1.authConfig.redisPassword
    }); // creates a new client
exports.redisConnection = redisConnection;
redisConnection.on('connect', () => {
    logger_1.logger.info(`Redis: Connected to redis server at ${host}:${port}`);
});
//# sourceMappingURL=redisConnection.js.map
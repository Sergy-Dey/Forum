"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const authConfig = {
    secret: process.env.DDD_FORUM_APP_SECRET,
    tokenExpiryTime: 3600,
    // redisServerPort: process.env.DDD_FORUM_REDIS_PORT || 6379,
    redisServerPort: process.env.DDD_FORUM_REDIS_PORT,
    redisServerURL: process.env.DDD_FORUM_REDIS_URL,
    redisConnectionString: process.env.REDIS_URL,
    redisPassword: process.env.DDD_FORUM_REDIS_PASSWORD || '1qwe3forum',
};
exports.authConfig = authConfig;
//# sourceMappingURL=auth.js.map
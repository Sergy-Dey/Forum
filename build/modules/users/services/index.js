"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const redisConnection_1 = require("./redis/redisConnection");
const redisAuthService_1 = require("./redis/redisAuthService");
const authService = new redisAuthService_1.RedisAuthService(redisConnection_1.redisConnection);
exports.authService = authService;
//# sourceMappingURL=index.js.map
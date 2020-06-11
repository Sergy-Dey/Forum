"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = exports.isProduction = exports.mongodbConnectionOptions = void 0;
const auth_1 = require("./auth");
Object.defineProperty(exports, "authConfig", { enumerable: true, get: function () { return auth_1.authConfig; } });
exports.mongodbConnectionOptions = {
    ssl: false,
    poolSize: 10,
    // eslint-disable-next-line @typescript-eslint/camelcase
    native_parser: true,
    // eslint-disable-next-line @typescript-eslint/camelcase
    // auto_reconnect: true,
    useNewUrlParser: true,
    connectWithNoPrimary: true,
    socketTimeoutMS: 5 * 60 * 1e3,
};
const isProduction = process.env.DDD_FORUM_IS_PRODUCTION === "true";
exports.isProduction = isProduction;
//# sourceMappingURL=index.js.map
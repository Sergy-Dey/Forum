"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodbConnectionOptions = void 0;
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
//# sourceMappingURL=index.js.map
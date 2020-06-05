"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./lib/logger");
const env_vars_1 = require("./lib/env-vars");
const app_1 = require("./shared/infra/http/app");
const init_routes_1 = require("./shared/infra/http/init-routes");
const config_1 = require("./config");
const env = new env_vars_1.default({
    required: [
        'MONGO_DEFAULT_URI'
    ],
    optional: {
        READPREFERENCE: 'secondaryPreferred',
        TOPIC: 'Forum-DDD',
        PORT: '6969',
    },
}, (err) => logger_1.logger.error(err.message));
let server;
(async function () {
    server = new app_1.Server({
        topic: env.get('TOPIC'),
        http: {
            port: Number(env.get('PORT'))
        },
        db: {
            mongodb: {
                uri: env.get('MONGO_DEFAULT_URI'),
                // @ts-ignore
                options: env.get('READPREFERENCE')
                    ? {
                        ...config_1.mongodbConnectionOptions,
                        readPreference: process.env.READPREFERENCE,
                    }
                    : config_1.mongodbConnectionOptions,
            }
        }
    });
    await server.start();
    init_routes_1.initExpressRoutes(server);
    process.on('SIGINT', () => server.stop('SIGINT'));
    process.on('SIGTERM', () => server.stop('SIGTERM'));
    process.on('uncaughtException', (err) => server.stop(err));
    process.on('unhandledRejection', (err) => server.stop(err));
})().catch((err) => {
    if (server) {
        server.stop(err);
    }
    else {
        console.error(err);
        process.exit(1);
    }
});
//# sourceMappingURL=index.js.map
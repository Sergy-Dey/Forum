"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const mongoose = require("mongoose");
const logger_1 = require("../../../lib/logger");
class Server {
    constructor(options) {
        this.alreadyStopped = false;
        this.alreadyStarted = false;
        this.topic = options.topic;
        this.httpPort = options.http.port || 6969;
        if (options.db.mongodb) {
            this.mongodbOptions = options.db.mongodb;
            this.mongodbUri =
                options.db.mongodb.uri || `mongodb://localhost:27017/${this.topic}`;
            this.mongooseOptions = options.db.mongodb.options || {};
        }
    }
    async stop(reason) {
        if (!this.alreadyStopped) {
            this.alreadyStopped = true;
            const reasonText = reason instanceof Error ? reason.stack : reason;
            logger_1.logger.warn(`Stopping application. Reason: ${reasonText}`);
            if (this.httpServer) {
                logger_1.logger.info('HTTP: Closing http server...');
                this.httpServer.close((err) => err && logger_1.logger.error(err));
            }
            if (this.mongodb) {
                logger_1.logger.info('MONGODB: Closing connection...');
                this.mongodb.disconnect((err) => logger_1.logger.error(err));
            }
        }
    }
    async start() {
        await this.connectToDb();
        await this.createHttpServer();
        this.alreadyStarted = true;
        logger_1.logger.info('Application successfully started!');
    }
    async createHttpServer() {
        logger_1.logger.info('HTTP: Trying to create HTTP server...');
        this.express = express();
        this.httpServer = this.express.listen(this.httpPort);
        return new Promise((resolve) => this.httpServer.on('listening', () => {
            logger_1.logger.info(`HTTP: Server has been started successfully on port "${this.httpPort}"`);
            resolve();
        }));
    }
    async connectToDb() {
        if (this.mongodbUri) {
            logger_1.logger.info(`MONGODB: Connecting...`);
            mongoose.set('useNewUrlParser', true);
            mongoose.set('useFindAndModify', false);
            mongoose.set('useCreateIndex', true);
            mongoose.set('useUnifiedTopology', true);
            try {
                this.mongodb = await mongoose.connect(this.mongodbUri, this.mongooseOptions);
                logger_1.logger.info('MONGODB: Successfully connected!');
                this.mongodb.connection.on('connected', () => logger_1.logger.info('MONGODB: Connection was established!'));
                this.mongodb.connection.on('error', (err) => logger_1.logger.error('error', `MONGODB: ${err.message}`));
                this.mongodb.connection.on('disconnected', async () => logger_1.logger.warn('MONGODB: Connection was closed!'));
            }
            catch (err) {
                throw err.message;
            }
        }
    }
}
exports.Server = Server;
//# sourceMappingURL=app.js.map
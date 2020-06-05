import * as express from 'express';
import * as http from 'http';
import * as mongoose from 'mongoose';
import { logger } from '../../../lib/logger';

export interface ServerOptions {
  requestTimeout?: number;
  topic: string;
  http: {
    /**
     * Порт для http сервера
     */
    port: number;
  };
  db: {
    mongodb?: {
      /**
       * Путь к серверу mongodb
       */
      uri?: string;
      /**
       * Опции соединения mongodb
       */
      options?: mongoose.ConnectionOptions;
    };
  };
}

export class Server {
  public express: express.Application;
  private readonly topic: string;
  private readonly httpPort: number;
  private httpServer: http.Server;
  private alreadyStopped = false;
  private alreadyStarted: boolean = false;
  private readonly mongodbUri: string;
  private mongodb: mongoose.Mongoose;
  private mongodbOptions;
  private readonly mongooseOptions: mongoose.ConnectionOptions;

  public constructor(options: ServerOptions) {
    this.topic = options.topic;
    this.httpPort = options.http.port || 6969;
    if (options.db.mongodb) {
      this.mongodbOptions = options.db.mongodb;
      this.mongodbUri =
        options.db.mongodb.uri || `mongodb://localhost:27017/${this.topic}`;
      this.mongooseOptions = options.db.mongodb.options || {};
    }

  }

  public async stop(reason: any | Error) {
    if (!this.alreadyStopped) {
      this.alreadyStopped = true;
      const reasonText = reason instanceof Error ? reason.stack : reason;
      logger.warn(`Stopping application. Reason: ${reasonText}`);

      if (this.httpServer) {
        logger.info('HTTP: Closing http server...');
        this.httpServer.close((err) => err && logger.error(err));
      }
      if (this.mongodb) {
        logger.info('MONGODB: Closing connection...');
        this.mongodb.disconnect((err) => logger.error(err));
      }
    }
  }

  public async start(){
    await this.connectToDb();

    await this.createHttpServer();
    this.alreadyStarted = true;
    logger.info('Application successfully started!');
  }

  private async createHttpServer(){
    logger.info('HTTP: Trying to create HTTP server...');

    this.express = express();

    this.httpServer = this.express.listen(this.httpPort);

    return new Promise((resolve) =>
      this.httpServer.on('listening', () => {
        logger.info(
          `HTTP: Server has been started successfully on port "${this.httpPort}"`,
        );
        resolve();
      }),
    );

  }

  private async connectToDb() {
    if (this.mongodbUri) {
      logger.info(`MONGODB: Connecting...`);
      mongoose.set('useNewUrlParser', true);
      mongoose.set('useFindAndModify', false);
      mongoose.set('useCreateIndex', true);
      mongoose.set('useUnifiedTopology', true );
      try {
        this.mongodb = await mongoose.connect(
          this.mongodbUri,
          this.mongooseOptions,
        );
        logger.info('MONGODB: Successfully connected!');
        this.mongodb.connection.on('connected', () =>
          logger.info('MONGODB: Connection was established!'),
        );
        this.mongodb.connection.on('error', (err) =>
          logger.error('error', `MONGODB: ${err.message}`),
        );
        this.mongodb.connection.on('disconnected', async () =>
          logger.warn('MONGODB: Connection was closed!')
        );
      } catch (err) {
        throw err.message;
      }
    }

  }

}

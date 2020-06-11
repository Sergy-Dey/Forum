import { logger } from './lib/logger';
import EnvVars from './lib/env-vars';
import {Server} from "./shared/infra/http/app";
import { initExpressRoutes } from './shared/infra/http/init-routes';
import { mongodbConnectionOptions } from './config';

const env = new EnvVars(
  {
    required: [
      'MONGO_DEFAULT_URI',
      'TOPIC',
      'DDD_FORUM_APP_SECRET',
      'DDD_FORUM_REDIS_PORT',
      'DDD_FORUM_REDIS_URL',
      'DDD_FORUM_REDIS_PASSWORD'
    ],
    optional: {
      READPREFERENCE: 'secondaryPreferred',
      PORT: process.env.PORT || '6969',
    },
  },
  (err) => logger.error(err.message),
);

let server;
(async function(){
  server = new Server({
    topic: env.get('TOPIC'),
    http:{
      port: Number(env.get('PORT'))
    },
    db:{
      mongodb:{
        uri: env.get('MONGO_DEFAULT_URI'),
        // @ts-ignore
        options: env.get('READPREFERENCE')
          ? {
            ...mongodbConnectionOptions,
            readPreference: process.env.READPREFERENCE,
          }
          : mongodbConnectionOptions,

      }
    }
  });

  await server.start();

  initExpressRoutes(server);

  process.on('SIGINT', () => server.stop('SIGINT'));
  process.on('SIGTERM', () => server.stop('SIGTERM'));
  process.on('uncaughtException', (err) => server.stop(err));
  process.on('unhandledRejection', (err) => server.stop(err));
})().catch((err) => {
  if (server) {
    server.stop(err);
  } else {
    console.error(err);
    process.exit(1);
  }
});

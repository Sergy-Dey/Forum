
import * as redis  from 'redis';
import { RedisClient } from 'redis'
import { authConfig, isProduction } from '../../../../config';
import {logger} from '../../../../lib/logger';

const port = authConfig.redisServerPort;
const host = authConfig.redisServerURL;
const redisConnection: RedisClient = isProduction
  ? redis.createClient(authConfig.redisConnectionString, {
    password: authConfig.redisPassword
  })
  : redis.createClient(Number(port), host, {
    password: authConfig.redisPassword
  }); // creates a new client

redisConnection.on('connect', () => {
  logger.info(`Redis: Connected to redis server at ${host}:${port}`)
});

export { redisConnection }

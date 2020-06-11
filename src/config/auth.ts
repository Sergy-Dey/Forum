
const authConfig = {
  secret: process.env.DDD_FORUM_APP_SECRET,
  tokenExpiryTime: 3600, // seconds => 5 minutes
  // redisServerPort: process.env.DDD_FORUM_REDIS_PORT || 6379,
  redisServerPort: process.env.DDD_FORUM_REDIS_PORT,
  redisServerURL: process.env.DDD_FORUM_REDIS_URL,
  redisConnectionString: process.env.REDIS_URL,
  redisPassword: process.env.DDD_FORUM_REDIS_PASSWORD || '1qwe3forum',
};

export { authConfig }

export const mongodbConnectionOptions = {
  ssl: false,
  poolSize: 10,
  // eslint-disable-next-line @typescript-eslint/camelcase
  native_parser: true,
  // eslint-disable-next-line @typescript-eslint/camelcase
  // auto_reconnect: true,
  useNewUrlParser: true,
  connectWithNoPrimary: true,
  socketTimeoutMS: 5 * 60 * 1e3,
  // reconnectTries: Number.MAX_VALUE,
  // timestamps: true,
};

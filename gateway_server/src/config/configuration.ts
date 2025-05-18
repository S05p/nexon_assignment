export default () => ({
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    userServiceUrl: process.env.USER_SERVICE_URL,
    eventServiceUrl: process.env.EVENT_SERVICE_URL,
  });


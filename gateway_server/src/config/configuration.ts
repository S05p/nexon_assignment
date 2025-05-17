export default () => ({
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    userServicePort: process.env.USER_SERVICE_PORT,
    eventServicePort: process.env.EVENT_SERVICE_PORT,
  });


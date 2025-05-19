export default () => ({
    jwtSecret: process.env.JWT_SECRET,
    userServiceUrl: process.env.USER_SERVICE_URL,
    eventServiceUrl: process.env.EVENT_SERVICE_URL,
  });


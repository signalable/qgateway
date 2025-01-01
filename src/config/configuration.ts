export default () => ({
  // 앱 설정
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    env: process.env.NODE_ENV || 'development',
  },

  // Auth 서비스 설정
  authService: {
    url: process.env.AUTH_SERVICE_URL || 'http://localhost:8080',
    timeout: parseInt(process.env.AUTH_SERVICE_TIMEOUT, 10) || 5000,
  },

  // User 서비스 설정
  userService: {
    url: process.env.USER_SERVICE_URL || 'http://localhost:8081',
    timeout: parseInt(process.env.USER_SERVICE_TIMEOUT, 10) || 5000,
  },

  // Rate Limiting 설정
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL, 10) || 60,
    limit: parseInt(process.env.THROTTLE_LIMIT, 10) || 10,
  },
});

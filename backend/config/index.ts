export default {
    jwtSecret: 'your_jwt_secret_key',
    refreshTokenSecret: 'your_refresh_token_secret_key',
    jwtExpiration: '8s', // 8s seconds / 15m minutes for the access token
    refreshTokenExpiration: '7d', // 7 days for the refresh token
    PORT:process.env.PORT || 5000,
    UserDatabaseURL:process.env.DatabaseURL || "mongodb://127.0.0.1:27017/user",
    DatabaseURL:{
      userDB:process.env.UserDatabaseURL || "mongodb://127.0.0.1:27017/user",
    },
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'strict' // Prevent CSRF
    }
  };

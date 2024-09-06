export default {
    jwtSecret: 'your_jwt_secret_key',
    refreshTokenSecret: 'your_refresh_token_secret_key',
    jwtExpiration: '1m', // 15 minutes for the access token
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

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmM3M2I3NWUxNWRjZTg4ZDcwMDllZjgiLCJpYXQiOjE3MjQ0MjA5NjcsImV4cCI6MTcyNDQyMTAyN30.IK4bX4lxCZ630kg5bYT9BDk5RXuGVw45ZEvw_0EfTsI
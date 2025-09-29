export const appConfig = {
  cors: {
    origin: process.env.CLIENT_ORIGIN_URL || 'http://localhost:3000',
    credentials: true,
  },
  socket: {
    host: process.env.SOCKET_HOST || 'localhost',
    port: parseInt(process.env.SOCKET_PORT || '3001'),
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/dodge',
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    jwtSecret: process.env.SUPABASE_JWT_SECRET,
  },
};

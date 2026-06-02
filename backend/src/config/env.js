/**
 * Configuración de variables de entorno
 * Valida y centraliza todas las variables del sistema
 */

export const getEnv = () => {
  return {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/operativo-urbano',
    jwtSecret: process.env.JWT_SECRET || 'dev-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    serverUrl: process.env.SERVER_URL || 'http://localhost:3000',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:8080',
    socketIOCors: process.env.SOCKET_IO_CORS || 'http://localhost:8080',
  };
};

export default getEnv;

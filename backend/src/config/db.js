/**
 * Configuración de conexión a MongoDB
 * Maneja la conexión con Mongoose y gestiona errores de conexión
 */

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✓ MongoDB conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ Error conectando MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

/**
 * Servidor Principal
 * Inicializa Express, MongoDB y Socket.IO
 */

import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app.js';
import connectDB from './config/db.js';
import { getEnv } from './config/env.js';
import initializeSocketIO from './sockets/gameSocket.js';
import Mission from './models/Mission.js';
import Upgrade from './models/Upgrade.js';

// Cargar variables de entorno
dotenv.config();

const env = getEnv();

// Crear servidor HTTP
const server = http.createServer(app);

// Configurar Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: env.socketIOCors,
    credentials: true,
  },
});

// Inicializar Socket.IO
initializeSocketIO(io);

// Función para iniciar datos de ejemplo
const seedDatabase = async () => {
  try {
    // Verificar si ya existen misiones
    const missionsCount = await Mission.countDocuments();
    if (missionsCount === 0) {
      console.log('📊 Seeding base de datos con misiones de ejemplo...');

      const missions = [
        {
          title: 'Edificio Tomado',
          description: 'Una unidad táctica necesita rescatar civiles en un edificio tomado por sospechosos',
          city: 'Buenos Aires',
          district: 'Zona Sur',
          difficulty: 'Normal',
          objectives: [
            'Reducir sospechosos',
            'Arrestar al menos 2',
            'Rescatar rehén',
            'Evitar bajas civiles',
          ],
          rewards: {
            money: 2500,
            xp: 250,
          },
          minPlayers: 1,
          maxPlayers: 1,
        },
        {
          title: 'Rescate de Rehén',
          description: 'Operación rápida de rescate',
          city: 'Buenos Aires',
          district: 'Centro',
          difficulty: 'Difícil',
          objectives: [
            'Rescatar rehén',
            'Neutralizar amenaza',
            'Salida segura',
          ],
          rewards: {
            money: 3000,
            xp: 300,
          },
          minPlayers: 1,
          maxPlayers: 2,
        },
      ];

      await Mission.insertMany(missions);
      console.log('✓ Misiones creadas');
    }

    const upgradesCount = await Upgrade.countDocuments();
    if (upgradesCount === 0) {
      console.log('📊 Seeding base de datos con mejoras de ejemplo...');

      const upgrades = [
        {
          key: 'armor_vest',
          name: 'Chaleco Antibalas',
          description: 'Protección corporal mejorada',
          category: 'armor',
          cost: 500,
          level: 1,
          maxLevel: 3,
          effect: { armor: 15 },
        },
        {
          key: 'flashbang',
          name: 'Granada Aturdidora',
          description: 'Equipo táctico de aturdimiento',
          category: 'equipment',
          cost: 300,
          level: 1,
          maxLevel: 5,
          effect: { stun_time: 3 },
        },
        {
          key: 'speed_boost',
          name: 'Boost de Velocidad',
          description: 'Aumenta velocidad de movimiento',
          category: 'skills',
          cost: 400,
          level: 1,
          maxLevel: 4,
          effect: { speed: 1.2 },
        },
        {
          key: 'tactical_comms',
          name: 'Comunicaciones Tácticas',
          description: 'Mejora la efectividad de órdenes',
          category: 'tactical',
          cost: 600,
          level: 1,
          maxLevel: 3,
          effect: { command_effectiveness: 1.3 },
        },
      ];

      await Upgrade.insertMany(upgrades);
      console.log('✓ Mejoras creadas');
    }
  } catch (error) {
    console.error('Error en seeding:', error);
  }
};

// Iniciar servidor
const startServer = async () => {
  try {
    // Conectar a MongoDB
    await connectDB();

    // Seed base de datos
    await seedDatabase();

    // Iniciar servidor
    server.listen(env.port, () => {
      console.log(`\n🚀 Servidor iniciado en puerto ${env.port}`);
      console.log(`📍 Ambiente: ${env.nodeEnv}`);
      console.log(`🌐 URL: ${env.serverUrl}`);
      console.log(`💾 Base de datos: ${env.mongoURI}\n`);
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
};

// Manejo de errores no capturados
process.on('unhandledRejection', (error) => {
  console.error('❌ Promesa rechazada no manejada:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Excepción no capturada:', error);
  process.exit(1);
});

startServer();

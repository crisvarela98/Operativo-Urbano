/**
 * Aplicación Express
 * Configuración de rutas, middleware y utilidades
 */

import express from 'express';
import cors from 'cors';
import { getEnv } from './config/env.js';

// Importar rutas
import authRoutes from './routes/auth.js';
import playerRoutes from './routes/player.js';
import missionRoutes from './routes/missions.js';
import upgradeRoutes from './routes/upgrades.js';

const env = getEnv();

const app = express();

// Middleware
app.use(cors({
  origin: env.corsOrigin,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/auth', authRoutes);
app.use('/player', playerRoutes);
app.use('/missions', missionRoutes);
app.use('/upgrades', upgradeRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    environment: env.nodeEnv,
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.path,
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: env.nodeEnv === 'development' ? err.message : undefined,
  });
});

export default app;

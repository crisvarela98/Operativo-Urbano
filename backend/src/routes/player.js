/**
 * Rutas de Jugador
 * GET /player/profile - Obtener perfil
 * POST /player/money - Agregar dinero
 * GET /player/stats - Obtener estadísticas
 */

import express from 'express';
import authenticateToken from '../middleware/auth.js';
import { getProfile, addMoney, getStats } from '../controllers/playerController.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/profile', getProfile);
router.post('/money', addMoney);
router.get('/stats', getStats);

export default router;

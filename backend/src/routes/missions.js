/**
 * Rutas de Misiones
 * GET /missions - Obtener todas las misiones
 * GET /missions/:id - Obtener misión por ID
 * POST /missions/complete - Completar misión
 */

import express from 'express';
import authenticateToken from '../middleware/auth.js';
import { getMissions, getMissionById, completeMission } from '../controllers/missionController.js';

const router = express.Router();

router.get('/', getMissions);
router.get('/:id', getMissionById);

router.use(authenticateToken);
router.post('/complete', completeMission);

export default router;

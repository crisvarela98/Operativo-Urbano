/**
 * Rutas de Mejoras
 * GET /upgrades - Obtener todas las mejoras
 * POST /upgrades/buy - Comprar upgrade
 */

import express from 'express';
import authenticateToken from '../middleware/auth.js';
import { getUpgrades, buyUpgrade } from '../controllers/upgradeController.js';

const router = express.Router();

router.get('/', getUpgrades);

router.use(authenticateToken);
router.post('/buy', buyUpgrade);

export default router;

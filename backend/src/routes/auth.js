/**
 * Rutas de Autenticación
 * POST /auth/register - Registrar nuevo usuario
 * POST /auth/login - Login usuario
 */

import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;

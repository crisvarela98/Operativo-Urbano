/**
 * Middleware de Autenticación
 * Verifica JWT y protege rutas
 */

import jwt from 'jsonwebtoken';
import { getEnv } from '../config/env.js';

const env = getEnv();

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado',
      });
    }

    jwt.verify(token, env.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Token inválido',
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en autenticación',
    });
  }
};

export default authenticateToken;

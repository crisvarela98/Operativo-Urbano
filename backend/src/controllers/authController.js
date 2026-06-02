/**
 * Controlador de Autenticación
 * Maneja registro, login y validación de usuarios
 */

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import PlayerProfile from '../models/PlayerProfile.js';
import { getEnv } from '../config/env.js';

const env = getEnv();

// Generar JWT
const generateToken = (id) => {
  return jwt.sign({ id }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
};

// Registro
export const register = async (req, res) => {
  try {
    const { email, password, nickname } = req.body;

    // Validar datos
    if (!email || !password || !nickname) {
      return res.status(400).json({
        success: false,
        message: 'Email, contraseña y nickname son requeridos',
      });
    }

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe',
      });
    }

    // Crear usuario
    const user = await User.create({
      email,
      passwordHash: password,
      nickname,
    });

    // Crear perfil del jugador
    await PlayerProfile.create({
      userId: user._id,
    });

    // Generar token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: user._id,
        email: user.email,
        nickname: user.nickname,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el registro',
      error: error.message,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar datos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos',
      });
    }

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    // Verificar contraseña
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    // Generar token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        email: user.email,
        nickname: user.nickname,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el login',
      error: error.message,
    });
  }
};

export default { register, login };

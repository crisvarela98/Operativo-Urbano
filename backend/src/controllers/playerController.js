/**
 * Controlador de Jugador
 * Maneja perfil, progreso y estadísticas del jugador
 */

import PlayerProfile from '../models/PlayerProfile.js';
import User from '../models/User.js';

// Obtener perfil del jugador
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await PlayerProfile.findOne({ userId })
      .populate('unlockedMissions')
      .populate('completedMissions')
      .populate('upgrades.upgradeId');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado',
      });
    }

    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      profile: {
        ...profile.toObject(),
        email: user.email,
        nickname: user.nickname,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo perfil',
      error: error.message,
    });
  }
};

// Actualizar dinero
export const addMoney = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;

    if (amount === undefined) {
      return res.status(400).json({
        success: false,
        message: 'El monto es requerido',
      });
    }

    const profile = await PlayerProfile.findOneAndUpdate(
      { userId },
      { $inc: { money: amount } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Dinero actualizado',
      money: profile.money,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error actualizando dinero',
      error: error.message,
    });
  }
};

// Obtener estadísticas
export const getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await PlayerProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      stats: profile.stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo estadísticas',
      error: error.message,
    });
  }
};

export default { getProfile, addMoney, getStats };

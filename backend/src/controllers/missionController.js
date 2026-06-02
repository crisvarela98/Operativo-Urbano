/**
 * Controlador de Misiones
 * Maneja obtención de misiones y registro de resultados
 */

import Mission from '../models/Mission.js';
import MissionResult from '../models/MissionResult.js';
import PlayerProfile from '../models/PlayerProfile.js';

// Obtener todas las misiones disponibles
export const getMissions = async (req, res) => {
  try {
    const missions = await Mission.find();

    res.status(200).json({
      success: true,
      missions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo misiones',
      error: error.message,
    });
  }
};

// Obtener misión por ID
export const getMissionById = async (req, res) => {
  try {
    const { id } = req.params;

    const mission = await Mission.findById(id);

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Misión no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      mission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo misión',
      error: error.message,
    });
  }
};

// Completar misión y registrar resultado
export const completeMission = async (req, res) => {
  try {
    const userId = req.user.id;
    const { missionId, arrested, rescued, casualties, penalties } = req.body;

    if (!missionId) {
      return res.status(400).json({
        success: false,
        message: 'ID de misión es requerido',
      });
    }

    // Obtener misión
    const mission = await Mission.findById(missionId);
    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Misión no encontrada',
      });
    }

    // Calcular rango
    const totalObjectives = arrested + rescued;
    let rank = 'F';
    if (casualties === 0 && totalObjectives >= 4) rank = 'S';
    else if (casualties === 0 && totalObjectives >= 3) rank = 'A';
    else if (casualties <= 1 && totalObjectives >= 2) rank = 'B';
    else if (totalObjectives >= 1) rank = 'C';

    // Calcular dinero ganado
    const baseReward = mission.rewards.money;
    let moneyEarned = baseReward;
    if (rank === 'S') moneyEarned = baseReward * 1.5;
    else if (rank === 'A') moneyEarned = baseReward * 1.25;
    else if (rank === 'B') moneyEarned = baseReward * 1.1;
    moneyEarned -= penalties;

    // Crear resultado
    const result = await MissionResult.create({
      userId,
      missionId,
      arrested,
      rescued,
      casualties,
      penalties,
      moneyEarned: Math.max(0, Math.floor(moneyEarned)),
      xpEarned: mission.rewards.xp,
      rank,
      completed: true,
    });

    // Actualizar perfil
    const profile = await PlayerProfile.findOneAndUpdate(
      { userId },
      {
        $inc: {
          money: Math.max(0, Math.floor(moneyEarned)),
          xp: mission.rewards.xp,
          'stats.totalArrest': arrested,
          'stats.totalRescued': rescued,
          'stats.totalMissions': 1,
        },
        $addToSet: { completedMissions: missionId },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: 'Misión completada',
      result: {
        ...result.toObject(),
        profile: {
          money: profile.money,
          xp: profile.xp,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error completando misión',
      error: error.message,
    });
  }
};

export default { getMissions, getMissionById, completeMission };

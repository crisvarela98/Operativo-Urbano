/**
 * Controlador de Mejoras
 * Maneja obtención de mejoras y compra de upgrades
 */

import Upgrade from '../models/Upgrade.js';
import PlayerProfile from '../models/PlayerProfile.js';

// Obtener todas las mejoras disponibles
export const getUpgrades = async (req, res) => {
  try {
    const upgrades = await Upgrade.find();

    res.status(200).json({
      success: true,
      upgrades,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo mejoras',
      error: error.message,
    });
  }
};

// Comprar upgrade
export const buyUpgrade = async (req, res) => {
  try {
    const userId = req.user.id;
    const { upgradeId } = req.body;

    if (!upgradeId) {
      return res.status(400).json({
        success: false,
        message: 'ID de upgrade es requerido',
      });
    }

    // Obtener upgrade
    const upgrade = await Upgrade.findById(upgradeId);
    if (!upgrade) {
      return res.status(404).json({
        success: false,
        message: 'Upgrade no encontrado',
      });
    }

    // Obtener perfil
    const profile = await PlayerProfile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado',
      });
    }

    // Verificar dinero
    if (profile.money < upgrade.cost) {
      return res.status(400).json({
        success: false,
        message: 'Dinero insuficiente',
        required: upgrade.cost,
        available: profile.money,
      });
    }

    // Buscar si ya tiene el upgrade
    let userUpgrade = profile.upgrades.find(
      (u) => u.upgradeId.toString() === upgradeId
    );

    if (!userUpgrade) {
      // Crear nuevo upgrade
      profile.upgrades.push({
        upgradeId,
        level: 1,
      });
      userUpgrade = profile.upgrades[profile.upgrades.length - 1];
    } else if (userUpgrade.level < upgrade.maxLevel) {
      // Aumentar nivel
      userUpgrade.level += 1;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Upgrade ya está en nivel máximo',
      });
    }

    // Restar dinero
    profile.money -= upgrade.cost;
    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Upgrade comprado exitosamente',
      upgrade: {
        name: upgrade.name,
        level: userUpgrade.level,
        maxLevel: upgrade.maxLevel,
      },
      profile: {
        money: profile.money,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error comprando upgrade',
      error: error.message,
    });
  }
};

export default { getUpgrades, buyUpgrade };

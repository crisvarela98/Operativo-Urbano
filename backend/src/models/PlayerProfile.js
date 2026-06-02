/**
 * Modelo PlayerProfile
 * Almacena progreso, dinero, mejoras y estadísticas del jugador
 */

import mongoose from 'mongoose';

const playerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    money: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    xp: {
      type: Number,
      default: 0,
    },
    rank: {
      type: String,
      default: 'Recluta',
      enum: ['Recluta', 'Agente', 'Oficial', 'Comandante', 'General'],
    },
    unlockedMissions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Mission',
      default: [],
    },
    completedMissions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Mission',
      default: [],
    },
    upgrades: [
      {
        upgradeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Upgrade',
        },
        level: {
          type: Number,
          default: 1,
        },
      },
    ],
    stats: {
      totalArrest: {
        type: Number,
        default: 0,
      },
      totalRescued: {
        type: Number,
        default: 0,
      },
      totalMissions: {
        type: Number,
        default: 0,
      },
      successRate: {
        type: Number,
        default: 0,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'player_profiles' }
);

const PlayerProfile = mongoose.model('PlayerProfile', playerProfileSchema);

export default PlayerProfile;

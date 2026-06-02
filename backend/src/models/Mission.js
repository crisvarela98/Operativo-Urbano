/**
 * Modelo Mission
 * Define las misiones disponibles en el juego
 */

import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      default: 'Buenos Aires',
    },
    district: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Fácil', 'Normal', 'Difícil', 'Extremo'],
      default: 'Normal',
    },
    rewards: {
      money: {
        type: Number,
        default: 1000,
      },
      xp: {
        type: Number,
        default: 100,
      },
    },
    objectives: [
      {
        type: String,
      },
    ],
    mapLayout: {
      width: {
        type: Number,
        default: 1600,
      },
      height: {
        type: Number,
        default: 900,
      },
      rooms: [
        {
          id: String,
          x: Number,
          y: Number,
          width: Number,
          height: Number,
          doors: [Number],
        },
      ],
      spawns: {
        player: {
          x: Number,
          y: Number,
        },
        suspects: [
          {
            x: Number,
            y: Number,
          },
        ],
        hostages: [
          {
            x: Number,
            y: Number,
          },
        ],
      },
    },
    minPlayers: {
      type: Number,
      default: 1,
    },
    maxPlayers: {
      type: Number,
      default: 4,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'missions' }
);

const Mission = mongoose.model('Mission', missionSchema);

export default Mission;

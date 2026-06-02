/**
 * Modelo Upgrade
 * Define las mejoras disponibles en el juego
 */

import mongoose from 'mongoose';

const upgradeSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['armor', 'equipment', 'skills', 'tactical'],
      default: 'equipment',
    },
    cost: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      default: 1,
    },
    maxLevel: {
      type: Number,
      default: 5,
    },
    effect: {
      type: Object,
      default: {},
    },
    requirements: {
      minLevel: {
        type: Number,
        default: 1,
      },
      prerequisite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upgrade',
        default: null,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'upgrades' }
);

const Upgrade = mongoose.model('Upgrade', upgradeSchema);

export default Upgrade;

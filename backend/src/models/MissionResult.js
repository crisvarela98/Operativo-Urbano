/**
 * Modelo MissionResult
 * Registra resultados de cada misión jugada
 */

import mongoose from 'mongoose';

const missionResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    missionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mission',
      required: true,
    },
    arrested: {
      type: Number,
      default: 0,
    },
    rescued: {
      type: Number,
      default: 0,
    },
    casualties: {
      type: Number,
      default: 0,
    },
    penalties: {
      type: Number,
      default: 0,
    },
    moneyEarned: {
      type: Number,
      default: 0,
    },
    xpEarned: {
      type: Number,
      default: 0,
    },
    rank: {
      type: String,
      enum: ['S', 'A', 'B', 'C', 'F'],
      default: 'C',
    },
    duration: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'mission_results' }
);

const MissionResult = mongoose.model('MissionResult', missionResultSchema);

export default MissionResult;

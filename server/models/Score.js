const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  totalTime: { type: Number, required: true },
  roundTimes: { type: [Number], required: true },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
});

module.exports = mongoose.model('Score', ScoreSchema);
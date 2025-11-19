const router = require('express').Router();
const Score = require('../models/Score');

// SAVE SCORE
router.post('/', async (req, res) => {
  try {
    const newScore = new Score(req.body);
    const savedScore = await newScore.save();
    res.status(201).json(savedScore);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET LEADERBOARD (Top 10)
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find().sort({ totalTime: 1 }).limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
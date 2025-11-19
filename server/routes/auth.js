const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if user exists
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username taken" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: "User registered", username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: "Invalid password" });

    // Success
    res.json({ message: "Login successful", username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
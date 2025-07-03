const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/model');
const router = express.Router()


router.post('/registers', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({message: "Login Successfully"});
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
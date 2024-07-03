const jwt = require('jsonwebtoken');
const User = require('../models/user-login-model');

// Controller function for handling login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare entered password with the stored password (plain text comparison)
    if (password !== user.password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = await user.generateToken();

    // If credentials are correct, respond with success message and token
    res.json({ msg: 'Login successful', token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  login,
};

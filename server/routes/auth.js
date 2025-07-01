// routes/auth.js

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Traditional login (if you have this)
router.post('/login', async (req, res) => {
  // Your normal login logic (email/password)
});

// === Google Auth Routes ===

// Start Google auth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback with JWT token generation
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login', session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Redirect to frontend with token in URL
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

module.exports = router;

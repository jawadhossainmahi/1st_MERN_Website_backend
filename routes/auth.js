const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
// Create a user using: POST "/api/auth/createuser" . Doesn't need auth
router.post('/createuser', [
    // validation messgage start
    // this thing send validation error msg 
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must contain atleast 5 characters").isLength({ min: 3 }),
    // validation messgage end
],
  async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }
        let user = await User.findOne({email:req.body.email});
        if (user) {
            return res.status(400).json({error:"Sorry a user with this email already exists"})
        }
      user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json(req.body)
    })

module.exports = router
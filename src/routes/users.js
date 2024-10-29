const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get User Information
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Edit User Information (Full Name)
router.put('/me', auth, async (req, res) => {
    const { fullName } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, { fullName }, { new: true }).select('-password');
        res.status(200).json({ success: true, message: 'User information updated successfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;

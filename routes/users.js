const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Lấy danh sách người dùng
router.get('/', authMiddleware, async (req, res) => {
    const users = await User.find().populate('roles');
    res.json(users);
});

// Quản lý người dùng (chỉ admin)
router.delete('/:id', authMiddleware, async (req, res) => {
    if (!req.user.roles.includes('admin')) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;


// routes/permissions.js
const express = require('express');
const Permission = require('../models/Permission');
const router = express.Router();

// Tạo Permission mới
router.post('/', async (req, res) => {
    try {
        const permission = new Permission(req.body);
        await permission.save();
        res.status(201).json(permission);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Lấy danh sách permissions
router.get('/', async (req, res) => {
    const permissions = await Permission.find();
    res.json(permissions);
});

module.exports = router;

// routes/roles.js
const express = require('express');
const Role = require('../models/Role');
const router = express.Router();

// Tạo Role mới
router.post('/', async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Lấy danh sách roles
router.get('/', async (req, res) => {
    const roles = await Role.find().populate('permissions');
    res.json(roles);
});

module.exports = router;

const express = require('express');
const { authorize } = require('../middleware/authMiddleware');
const Role = require('../models/Role');
const Permission = require('../models/Permission');

const router = express.Router();

// Lấy danh sách roles
router.get('/roles', authorize(['view_roles']), async (req, res) => {
    try {
        const roles = await Role.find().populate('permissions');
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Thêm role (chỉ admin)
router.post('/roles', authorize(['create_roles']), async (req, res) => {
    const { name, permissions } = req.body;

    try {
        const newRole = new Role({ name, permissions });
        await newRole.save();
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Cập nhật role (chỉ admin)
router.put('/roles/:id', authorize(['update_roles']), async (req, res) => {
    const { id } = req.params;
    const { name, permissions } = req.body;

    try {
        const updatedRole = await Role.findByIdAndUpdate(id, { name, permissions }, { new: true });
        res.json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Xóa role (chỉ admin)
router.delete('/roles/:id', authorize(['delete_roles']), async (req, res) => {
    const { id } = req.params;

    try {
        await Role.findByIdAndDelete(id);
        res.json({ message: 'Role deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Tạo permission
router.post('/permissions', authorize(['create_permissions']), async (req, res) => {
    const { name } = req.body;

    try {
        const newPermission = new Permission({ name });
        await newPermission.save();
        res.status(201).json(newPermission);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Lấy danh sách permissions
router.get('/permissions', authorize(['view_permissions']), async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

// const express = require('express');
// const { authorize } = require('../middleware/authMiddleware');
// const User = require('../models/User');
// const Role = require('../models/Role');

// const router = express.Router();

// // Lấy danh sách người dùng (chỉ admin)
// router.get('/', authorize(['view_users']), async (req, res) => {
//     try {
//         const users = await User.find().populate('roles');
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Thêm người dùng (chỉ admin)
// router.post('/', authorize(['create_users']), async (req, res) => {
//     const { username, password, roles } = req.body;

//     try {
//         const newUser = new User({ username, password, roles });
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Cập nhật người dùng (chỉ admin)
// router.put('/:id', authorize(['update_users']), async (req, res) => {
//     const { id } = req.params;
//     const { username, roles } = req.body;

//     try {
//         const updatedUser = await User.findByIdAndUpdate(id, { username, roles }, { new: true });
//         res.json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Xóa người dùng (chỉ admin)
// router.delete('/:id', authorize(['delete_users']), async (req, res) => {
//     const { id } = req.params;

//     try {
//         await User.findByIdAndDelete(id);
//         res.json({ message: 'User deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;
// routes/userRoutes.js
// const express = require('express');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const router = express.Router();

// // Route thêm người dùng mới
// router.post('/', async (req, res) => {
//     const { username, password } = req.body;

//     // Kiểm tra xem username và password có được cung cấp không
//     if (!username || !password) {
//         return res.status(400).json({ message: "Username and password are required." });
//     }

//     try {
//         // Mã hóa password trước khi lưu vào DB
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ username, password: hashedPassword });

//         // Lưu người dùng vào DB
//         await newUser.save();
//         res.status(201).json({ message: "User created successfully", user: newUser });
//     } catch (error) {
//         res.status(500).json({ message: "Error creating user", error });
//     }
// });

// module.exports = router;
// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Route thêm người dùng mới
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra xem username và password có được cung cấp không
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        // Mã hóa password trước khi lưu vào DB
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });

        // Lưu người dùng vào DB
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

module.exports = router;

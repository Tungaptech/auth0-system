// routes/articles.js
const express = require('express');
const { authMiddleware, checkPermission } = require('../middleware/authMiddleware');
const router = express.Router();

// Tạo một bài viết (cần permission create_article)
router.post('/', authMiddleware, checkPermission('create_article'), (req, res) => {
    // Logic tạo bài viết ở đây
    res.status(201).json({ message: 'Article created' });
});

// Lấy danh sách bài viết (cần permission read_article)
router.get('/', authMiddleware, checkPermission('read_article'), (req, res) => {
    // Logic lấy bài viết ở đây
    res.json({ message: 'List of articles' });
});

// Cập nhật bài viết (cần permission update_article)
router.put('/:id', authMiddleware, checkPermission('update_article'), (req, res) => {
    // Logic cập nhật bài viết ở đây
    res.json({ message: 'Article updated' });
});

// Xóa bài viết (cần permission delete_article)
router.delete('/:id', authMiddleware, checkPermission('delete_article'), (req, res) => {
    // Logic xóa bài viết ở đây
    res.json({ message: 'Article deleted' });
});

module.exports = router;

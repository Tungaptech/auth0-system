// routes/apiRoutes.js
const express = require('express');
const { authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Route để lấy danh sách bài viết (cần permission 'read_articles')
router.get('/articles', authorize(['read_articles']), (req, res) => {
    res.json([
        { id: 1, title: 'Article 1', content: 'Content of Article 1' },
        { id: 2, title: 'Article 2', content: 'Content of Article 2' },
    ]);
});

// Route để tạo bài viết (cần permission 'create_articles')
router.post('/articles', authorize(['create_articles']), (req, res) => {
    const { title, content } = req.body;
    res.status(201).json({ message: 'Article created', article: { title, content } });
});

// Route để cập nhật bài viết (cần permission 'update_articles')
router.put('/articles/:id', authorize(['update_articles']), (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    res.json({ message: 'Article updated', article: { id, title, content } });
});

// Route để xóa bài viết (cần permission 'delete_articles')
router.delete('/articles/:id', authorize(['delete_articles']), (req, res) => {
    const { id } = req.params;
    res.json({ message: 'Article deleted', id });
});

module.exports = router;

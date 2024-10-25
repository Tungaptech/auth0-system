// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) return res.status(403).json({ message: 'No token provided' });

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) return res.status(401).json({ message: 'Unauthorized' });
//         req.user = decoded;
//         next();
//     });
// };

// module.exports = authMiddleware;
const jwt = require('jsonwebtoken');

const authorize = (permissions) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.token; // Lấy token từ cookie
            if (!token) return res.status(401).json({ message: 'Access denied' });

            // Xác thực token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Tiếp tục kiểm tra quyền
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Invalid token.' });
        }
    };
};

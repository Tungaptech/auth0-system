// middleware/checkPermission.js

const checkPermission = (permission) => {
    return (req, res, next) => {
        // Kiểm tra xem người dùng có quyền này không
        const userPermissions = req.user.permissions; // Giả sử bạn đã lưu permissions trong req.user
        if (userPermissions.includes(permission)) {
            return next();
        } else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    };
};

module.exports = checkPermission;

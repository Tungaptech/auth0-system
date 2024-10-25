// middleware/authMiddleware.js

const authMiddleware = (req, res, next) => {
    // Logic kiểm tra xác thực (JWT)
    next();
};

const checkPermission = (permission) => {
    return (req, res, next) => {
        const userPermissions = req.user.permissions || []; // Giả sử bạn đã lưu permissions trong req.user
        if (userPermissions.includes(permission)) {
            return next();
        } else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    };
};

const authorize = (permissions) => {
    return (req, res, next) => {
        const userPermissions = req.user.permissions || []; // Giả sử bạn đã lưu permissions trong req.user
        const hasPermission = permissions.every(permission => userPermissions.includes(permission));

        if (hasPermission) {
            return next();
        } else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    };
};

module.exports = {
    authMiddleware,
    authorize, // Đảm bảo xuất authorize
    checkPermission
};



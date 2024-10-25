// const express = require('express');
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const authRoutes = require('./routes/auth');
// require('dotenv').config();

// const app = express();
// app.use(express.json());
// app.use(cookieParser());

// // Kết nối đến MongoDB
// mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Sử dụng routes
// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Khởi tạo Express app
const app = express();
app.use(express.json());
app.use(cookieParser());

// Kết nối đến MongoDB
mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Import các routes
const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/roles');
const permissionRoutes = require('./routes/permissions');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articles');
const apiRoutes = require('./routes/apiRoutes');

// Sử dụng các routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/articles', articleRoutes);

// Bắt đầu server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

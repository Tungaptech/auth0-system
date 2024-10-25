const mongoose = require('mongoose');
const User = require('./models/User');
const Role = require('./models/Role');
const Permission = require('./models/Permission');
require('dotenv').config();

mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');

        // Xóa dữ liệu cũ
        await User.deleteMany();
        await Role.deleteMany();
        await Permission.deleteMany();

        // Tạo permissions
        const permissions = [
            { name: 'create_article', description: 'Permission to create articles' },
            { name: 'read_article', description: 'Permission to read articles' },
            { name: 'update_article', description: 'Permission to update articles' },
            { name: 'delete_article', description: 'Permission to delete articles' },
            { name: 'manage_users', description: 'Permission to manage users' },
        ];
        const permissionDocs = await Permission.insertMany(permissions);

        // Tạo roles
        const roles = [
            { name: 'admin', permissions: [permissionDocs[0]._id, permissionDocs[1]._id, permissionDocs[2]._id, permissionDocs[3]._id, permissionDocs[4]._id] },
            { name: 'editor', permissions: [permissionDocs[1]._id, permissionDocs[2]._id, permissionDocs[3]._id] },
            { name: 'viewer', permissions: [permissionDocs[1]._id] },
        ];
        const roleDocs = await Role.insertMany(roles);

        // Tạo users
        const users = [
            { username: 'adminUser', password: 'adminPass', roles: [roleDocs[0]._id] }, // Admin
            { username: 'editorUser', password: 'editorPass', roles: [roleDocs[1]._id] }, // Editor
            { username: 'viewerUser', password: 'viewerPass', roles: [roleDocs[2]._id] }, // Viewer
            { username: 'user1', password: 'userPass1', roles: [roleDocs[2]._id] },
            { username: 'user2', password: 'userPass2', roles: [roleDocs[2]._id] },
        ];
        await User.insertMany(users);

        console.log('Seed data created');
        mongoose.connection.close();
    })
    .catch(err => console.log(err));

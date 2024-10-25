// const mongoose = require('mongoose');

// const roleSchema = new mongoose.Schema({
//     name: { type: String, required: true, unique: true },
//     permissions: [String],
// });

// module.exports = mongoose.model('Role', roleSchema);
// models/Role.js
// const mongoose = require('mongoose');

// const roleSchema = new mongoose.Schema({
//     name: { type: String, required: true, unique: true },
//     permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] // Tham chiếu đến permissions
// });

// module.exports = mongoose.model('Role', roleSchema);
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
});

module.exports = mongoose.model('Role', roleSchema);

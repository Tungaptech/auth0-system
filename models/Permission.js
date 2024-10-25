// // models/Permission.js
// const mongoose = require('mongoose');

// const permissionSchema = new mongoose.Schema({
//     name: { type: String, required: true, unique: true },
//     description: String
// });

// module.exports = mongoose.model('Permission', permissionSchema);
const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Permission', permissionSchema);

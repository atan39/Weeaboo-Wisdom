const User = require('../models/User');
const Anime = require('../models/Anime');

User.hasMany(Anime, {
    foreignKey: 'user_id',
});

Anime.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Anime };
const User = require('../models/User');
const Anime = require('../models/Anime');

//Anime belongs to User. Don't forget foreignKey


//User has many Anime

module.exports = { User, Anime };
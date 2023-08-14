const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Anime extends Model {}

Anime.init(
/*
fields
id
genre
image url
sypnosis
user id foriegn key
*/


);

module.exports = Anime;

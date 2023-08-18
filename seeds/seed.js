const sequelize = require('../config/connection');
//we may need to adjust based on who we model the project
const { User, Anime } = require('../models');

const userData = require('./userData.json');
const animeData = require('./animeData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Anime.bulkCreate(animeData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

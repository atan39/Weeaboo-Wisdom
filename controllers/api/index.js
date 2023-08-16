const router = require('express').Router();
const userRoutes = require('./user-routes');
const animeRoutes = require('./anime-routes');

router.use('/users', userRoutes);
router.use('/animes', animeRoutes);

module.exports = router;

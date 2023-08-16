const router = require('express').Router();
const userRoutes = require('./userRoutes');
const animeRoutes = require('./animeRoutes');

router.use('/users', userRoutes);
router.use('/animes', animeRoutes);

module.exports = router;

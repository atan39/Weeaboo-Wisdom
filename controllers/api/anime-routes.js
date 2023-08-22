const router = require('express').Router();
const { Anime, User } = require('../../models');
const withAuth = require('../../utils/auth');

//works but for some reason it doesn't work in Heroku
//posts user anime table
router.post('/', async (req, res) => {
  try {
    const newAnime = await Anime.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newAnime);
  } catch (err) {
    res.status(400).json(err);
  }
});

//used to render search page
router.get('/search', (req, res) => {
    res.render('search', {
   // animes,
    loggedIn: req.session.loggedIn,
  });
})

  module.exports = router;
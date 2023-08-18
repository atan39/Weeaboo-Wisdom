const router = require('express').Router();
const { Anime } = require('../../models');

router.get('/search', async (req, res) => {
  res.render('search', {
   // animes,
    loggedIn: req.session.loggedIn,
  });

})

/*
router.get('/', async (req, res) => {
    try {
      const dbAnimeData = await Anime.findAll({
      });
  
      const animes = dbAnimeData.map((anime) =>
      anime.get({ plain: true })
      );
      // Send over the 'loggedIn' session variable to the 'search' template
      //need to change the location of this page
      res.render('search', {
        animes,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
*/

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

  router.delete('/:id', async (req, res) => {
    try {
      const animeData = await Anime.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!animeData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(animeData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
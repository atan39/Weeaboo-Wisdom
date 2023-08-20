const router = require('express').Router();
const { Anime, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Anime.findAll({
    })
    .then((animeData) => {
      res.status(200).json(animeData);
    })
    .catch( (err) => {
      res.status(500).json(err);
  })
});

/*
router.post('/search', withAuth, async (req, res) => {
  console.log("checking if this HITS");
  
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
*/

//testing
router.post('/', async (req, res) => {
  console.log("checking if this this is doing something");
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


router.get('/search', (req, res) => {
  console.log("HIT");
    res.render('search', {
   // animes,
    loggedIn: req.session.loggedIn,
  });
})

router.post('/saveAnime', (req, res) => {
console.log(`req body ${req.body}`);
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
/*
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
  */
  module.exports = router;
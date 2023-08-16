//rework this file for the anime db table
//note to self, this is used to send the anime db to HTML page using the .render function
//page for this would be userlist


const router = require('express').Router();
const { Anime } = require('../models');

// GET all anime for homepage
//need to route this to anime list page

router.get('/', async (req, res) => {
  try {
    const dbAnimeData = await Anime.findAll({
    });

    const animes = dbAnimeData.map((anime) =>
    anime.get({ plain: true })
    );
    // Send over the 'loggedIn' session variable to the 'homepage' template
    //need to change the location of this page
  
    res.render('userlist', {
      animes,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one anime
router.get('/anime/:id', async (req, res) => {
  try {
    const dbAnimeData = await Anime.findByPk(req.params.id, {
      /*
      include: [
        {
          model: Painting,
          attributes: [
            'id',
            'title',
            'artist',
            'exhibition_date',
            'filename',
            'description',
          ],
        },
      ],
      */
    });

    const animes = dbAnimeData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'anime' template
    res.render('userlist', { animes, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;

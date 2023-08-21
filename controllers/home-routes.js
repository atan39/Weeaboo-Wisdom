
const router = require('express').Router();
const { Anime, User } = require('../models');
const withAuth = require('../utils/auth');



//render homepage and logged in status
router.get('/', async (req, res) => {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
    });
  });


//gets user data with Anime
//withAuth doesn't work

router.get('/myAnilist', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
   const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Anime }],
    });

    

     const user = userData.get({ plain: true });

    res.render('myAnilist', {
      ...user,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('homepage');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

//stuff I tried but doen't work
/* doesn't work
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const animeData = await Anime.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const animes = animeData.map((anime) => anime.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      animes, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
*/

/*
router.get('api/animes/search', (req, res) => {
  console.log("HIT");
    res.render('api/animes/search', {
   // animes,
    loggedIn: req.session.loggedIn,
  });
})
*/

/*
router.get('/search', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Anime }],
    });

    const user = userData.get({ plain: true });

    res.render('search', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
*/


module.exports = router;

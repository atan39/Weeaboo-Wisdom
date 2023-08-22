
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

module.exports = router;

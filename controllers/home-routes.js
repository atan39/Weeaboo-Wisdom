
const router = require('express').Router();
const { Anime, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
    });
  });

// // GET one anime
// router.get('/anime/:id', async (req, res) => {
//   try {
//     const dbAnimeData = await Anime.findByPk(req.params.id, {
//       /*
//       include: [
//         {
//           model: Painting,
//           attributes: [
//             'id',
//             'title',
//             'artist',
//             'exhibition_date',
//             'filename',
//             'description',
//           ],
//         },
//       ],
//       */
//     });

//     const animes = dbAnimeData.get({ plain: true });
//     // Send over the 'loggedIn' session variable to the 'anime' template
//     res.render('userlist', { animes, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/myAnilist', async (req, res) => {
 // withAuth
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



router.get('/search', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Anime }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('myAnilist');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;

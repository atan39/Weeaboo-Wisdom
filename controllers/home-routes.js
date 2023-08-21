
const router = require('express').Router();
const { Anime, User } = require('../models');
const withAuth = require('../utils/auth');
/*
router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
*/



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

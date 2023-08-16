const router = require('express').Router();

const apiRoutes = require('./api');

//not usable till I decide how to use these
//might be rename to use for results-routes.js or something
const homeRoutes = require('./result-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;

const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
// const dashboardRoutes = require('./dashboardRoutes');
const apiRoutes = require('./api');

// Use the apiRoutes for paths starting with /api
router.use('/api', apiRoutes);

// Use other routes for different paths
// router.use('/', homeRoutes);
// router.use('/dashboard', dashboardRoutes);

module.exports = router;
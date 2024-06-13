const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");

// Use the apiRoutes for paths starting with /api
router.use("/api", apiRoutes);

// Use other routes for different paths
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;

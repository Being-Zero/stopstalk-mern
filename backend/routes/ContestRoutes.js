const express = require("express");
const ContestController = require("../controllers/ContestsController");
const router = express.Router();

router.get('/upcomingcontests', ContestController.upcommingcontests)



module.exports = router
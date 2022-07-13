const express = require("express");
const LeaderboardController = require("../controllers/LeaderboardController");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.get("/friends", AuthController.protect, LeaderboardController.leaderboard);
router.get("/global", LeaderboardController.leaderboard);
module.exports = router;
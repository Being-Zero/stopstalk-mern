let userSubController = require('../controllers/UserSubmissionsController')
let AuthController  = require("../controllers/AuthController")
const express = require("express");
const router = express.Router();

router.get('/hackerrank/retrive-subs',AuthController.protect,userSubController.hackerrankCrawler)

router.get('/get-user-submissions',AuthController.protect,userSubController.get_user_submissions)

module.exports = router;


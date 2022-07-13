const express = require("express");
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
const problemSearch = require('../controllers/Search')
const codechefCrawler = require('../controllers/CodechefCrawler')
const router = express.Router();
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);
// Search Problem Route
router.post('/problems' , problemSearch.ProblemSet)
router.patch(
  "/updateMyPassword",
  AuthController.protect,
  AuthController.updatePassword
);

router.post("/verify-google-login", AuthController.googleSignin);

router.route("/getMe").get(AuthController.protect, UserController.getMe);
router.route("/gethandles").get(AuthController.protect, UserController.getUserHandles);
router.route("/updateme").patch(AuthController.protect, UserController.updateData);

router.post("/forgotPassword", AuthController.forgotPassword);

router.patch("/resetPassword/:token", AuthController.resetPassword);
module.exports = router;

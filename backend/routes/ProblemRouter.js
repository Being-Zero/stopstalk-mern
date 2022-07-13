const express = require("express");
const AuthController = require("../controllers/AuthController");
const ProblemController = require("../controllers/ProblemController");
const router = express.Router();


router.post("/", ProblemController.getAllProblems);
router.get("/byid/:id", ProblemController.getById)
router.get("/get-global-trending", ProblemController.GlobalTrending);
router.post("/filter", ProblemController.filter);


module.exports = router;

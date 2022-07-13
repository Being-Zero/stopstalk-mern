const express = require("express")
const GraphController = require("../controllers/GraphController")
const AuthController = require("../controllers/AuthController")
const router = express.Router()

router.get("/get-pie-chart-data", AuthController.protect, GraphController.getPieChartData);
router.get("/solved-count", AuthController.protect, GraphController.getSolvedCount);
router.get("/solved-unsolved-data", AuthController.protect, GraphController.getSolvedUnsolvedData)
router.get("/get-stats", AuthController.protect, GraphController.getStats)

module.exports = router;
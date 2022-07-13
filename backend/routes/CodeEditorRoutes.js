const express = require("express");
const router = express.Router();
const codeEditorController = require("../controllers/CodeEditorAPIS");

router.get("/codeEditor/:id", codeEditorController.getProblem);

module.exports = router;

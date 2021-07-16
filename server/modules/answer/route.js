
const express = require("express");
const router = express.Router();
const controller = require('./controller');

router.get("/",controller.answer);
router.post("/as",controller.answer);

module.exports = router;
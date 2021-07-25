
const express = require("express");
const router = express.Router();
const controller = require('./controller');

router.post("/",controller.answer);
router.get("/",controller.getResult);


module.exports = router;
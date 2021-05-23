const express = require('express');
const router = express.Router();
const controller = require("../admin/controller");


/*Create Categories */
router.post("/addAdmin",controller.create);

router.post("/login",controller.login);
module.exports = router;
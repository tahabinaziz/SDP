const express = require("express");
const router = express.Router();
const controller = require('./controller');

/*PreCheck Question */
router.get("/preCheck/:id",controller.preCheck);

/*Create Question */
router.post("/",controller.create);

/*Get Question */
router.get("/",controller.getQuestion);

/*Get Question */
router.put("/:id",controller.update);

module.exports = router;


const express = require("express");
const router = express.Router();
const controller = require('./controller');

/*Create Course */
router.post("/",controller.create);

/*Get Course */
router.get("/",controller.get);

/*Update Course */
router.get("/",controller.update);

/*Delete Course */
router.get("/",controller.delete);

module.exports = router;
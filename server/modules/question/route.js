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
router.get("/table",controller.getQuestionTable);




/*Get Question */
router.patch("/:id",controller.update);

router.delete("/:id",controller.delete);

module.exports = router;


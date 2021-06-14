const express = require("express");
const router = express.Router();
const controller = require('./controller');

/**********************************************QUIZ-WEB************************************************* */

/*Create Quiz */
router.post("/",controller.create);

/*Get Quiz */
router.get("/",controller.get);

/*Get Quiz By Id */
router.get("/:id",controller.getById);

/*Update Quiz */
router.patch("/:id",controller.update);

/*Delete Quiz */
router.delete("/:id",controller.delete);

/**********************************************QUIZ-MOBILE************************************************* */

/*Get Quiz By meetingId & password */
router.post("/quizDetail/",controller.quizDetail);

module.exports = router;
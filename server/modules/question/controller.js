const Question = require("./model");
const Answer = require("../answer/model");
const sendResponse = require("../../utiles/common").sendResponse;

/////////////////////////////////////////////////////Question/////////////////////////////////////////////

/**Pre Check Api */
exports.preCheck = async (req, res) => {
  try {
    const id = req.params.id;
    let checkMeetingId = await Question.findOne({
      _id: id,
    }).exec();
    if (checkMeetingId == null) {
      return sendResponse(res, true, "Ok", 200, {
        message: "You May Go Question Creation",
      });
    } else {
      return sendResponse(res, true, "Question Available", 400, {
        message: "Question Already Available for Quiz",
      });
    }
  } catch (err) {
    return sendResponse(res, false, "Internal Server Error" + err, 500, {
      message: "Something Went Wrong",
    });
  }
};

/*Answer Result*/

/*Create Question*/
exports.create = async (req, res) => {
  try {
    let meetingId= req.body.meetingId;
    const addQuestion = new Question({
      meetingId:meetingId,
      questionData: req.body.questionData.map((questionData) => 
      {
        var qNumber = Math.floor(1000 + Math.random() * 9000);

        const addAnswer  = new Answer({
          qNumber: qNumber,
          meetingId: meetingId,
          question :questionData.question,
          answer:questionData.answer
        });  
         addAnswer.save();

        return {
          qNumber :qNumber,
          question: questionData.question,
          questionType:questionData.questionType,
          option: questionData.option,
          answer: questionData.answer
        };
      }),
    });
    const insertQuestion = await addQuestion.save();
    return sendResponse(res, true, "Ok", 200, { insertQuestion });
  } catch (err) {
    return sendResponse(res, false, "Something Went Wrong " + err, 500, {});
  }
};

/*Get Question*/
exports.getQuestion = async (req, res) => {
  try {
    const { meetingId } = req.query;
    let questions = await Question.find({ meetingId: meetingId }).exec();
    if (questions == null) {
      return sendResponse(res, true, "Not Found Question", 404, {});
    } else {
      return sendResponse(res, true, "Ok", 200, { questions });
    }
  } catch (err) {
    return sendResponse(res, false, "Something Went Wrong " + err, 500, {});
  }
};

/*Update Question */
exports.update = async (req, res) => {
  try {
    let id = req.params.id;
    await Question.updateOne(
      { _id: id },
      {
        $set: {
          questionData: req.body.questionData.map((questionData) => {
            return {
              question: questionData.question,
              questionType:questionData.questionType,
              option: questionData.option,
              answer: questionData.answer,
            };
          }),
        },
      }
    );
    return sendResponse(res, true, "Ok", 200, {
      message: "Update Successfully",
    });
  } catch (err) {
    return sendResponse(res, false, "Something Went Wrong " + err, 500, {});
  }
};

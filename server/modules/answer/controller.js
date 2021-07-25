const Answer = require("./model");
const QTable = require("../question/qtmodel");
const Result =require("../result/model");
const Quiz =require("../quiz/model");
const sendResponse = require("../../utiles/common").sendResponse;

/*Get Data from Question For Comparision */
exports.answer = async (req,res)=>{
    try{
      const { meetingId } = req.query;
      let question = await QTable.find({meetingId:meetingId});
      let quiz = await Quiz.findOne({meetingId:meetingId});
      let {email}=req.body;
      let result2 = await Answer.find({ meetingId: meetingId });
      let result = req.body.result1.filter(o1 => result2.some(o2 => o1.answer === o2.answer));

      const totalQuestions = question.length;
      const correctAnswer = result.length;
      const percentage = Math.round((correctAnswer/totalQuestions)*100); 
      let check = await Result.find({meetingId:meetingId,email:email});
      if(check.length > 0){
        return sendResponse(res, true, "Ok", 400, {message:"Result Already Post" });
      }
       const QuizResult = new Result({
         email:email,
         title:quiz.title,
         meetingId:meetingId,
         totalQuestion:totalQuestions,
         correctAnswer:correctAnswer,
         percentage:percentage
       })
       let insertResult = await QuizResult.save();
      return sendResponse(res, true, "Ok", 200, {email:email,totalQuestion: totalQuestions, correctAnswer:correctAnswer,percentage:percentage+'%' });
     
    }
    catch(err){
      return sendResponse(res, false, "Something Went Wrong " + err, 500, {});
    }
  }
  
  exports.getResult = async (req, res) => {
    try {
      const { meetingId } = req.query;
      let results = await Result.find({ meetingId: meetingId }).exec();
      if (results == null) {
        return sendResponse(res, true, "Not Found Question", 404, {});
      } else {
        return sendResponse(res, true, "Ok", 200, { results });
      }
    } catch (err) {
      return sendResponse(res, false, "Something Went Wrong " + err, 500, {});
    }
  };

